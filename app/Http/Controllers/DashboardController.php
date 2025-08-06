<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\BillReminder;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Get date range for filtering (default to current month)
        $startDate = $request->input('start_date', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $endDate = $request->input('end_date', Carbon::now()->endOfMonth()->format('Y-m-d'));
        
        // Get total balance across all accounts
        $totalBalance = Account::where('user_id', $user->id)->sum('balance');
        
        // Get monthly income and expenses
        $monthlyIncome = Transaction::where('user_id', $user->id)
            ->where('type', 'income')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->sum('amount');
            
        $monthlyExpenses = Transaction::where('user_id', $user->id)
            ->where('type', 'expense')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->sum('amount');
        
        // Get recent transactions
        $recentTransactions = Transaction::with(['category', 'account', 'toAccount'])
            ->where('user_id', $user->id)
            ->orderBy('transaction_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();
        
        // Get expenses by category for current month
        $expensesByCategory = Transaction::with('category')
            ->where('user_id', $user->id)
            ->where('type', 'expense')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->select('category_id', DB::raw('SUM(amount) as total'))
            ->groupBy('category_id')
            ->get()
            ->map(function ($item) {
                return [
                    'category' => $item->category->name,
                    'amount' => (float) $item->getAttribute('total'),
                    'color' => $item->category->color,
                    'icon' => $item->category->icon,
                ];
            });
        
        // Get upcoming bill reminders
        $upcomingBills = BillReminder::with('category')
            ->where('user_id', $user->id)
            ->where('is_paid', false)
            ->where('due_date', '>=', Carbon::now())
            ->where('due_date', '<=', Carbon::now()->addDays(30))
            ->orderBy('due_date')
            ->limit(5)
            ->get();
        
        // Get monthly trend data (last 6 months)
        $monthlyTrends = collect();
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $startOfMonth = $date->copy()->startOfMonth();
            $endOfMonth = $date->copy()->endOfMonth();
            
            $income = Transaction::where('user_id', $user->id)
                ->where('type', 'income')
                ->whereBetween('transaction_date', [$startOfMonth, $endOfMonth])
                ->sum('amount');
                
            $expenses = Transaction::where('user_id', $user->id)
                ->where('type', 'expense')
                ->whereBetween('transaction_date', [$startOfMonth, $endOfMonth])
                ->sum('amount');
            
            $monthlyTrends->push([
                'month' => $date->format('M Y'),
                'income' => $income,
                'expenses' => $expenses,
                'net' => $income - $expenses,
            ]);
        }
        
        return Inertia::render('dashboard', [
            'stats' => [
                'totalBalance' => $totalBalance,
                'monthlyIncome' => $monthlyIncome,
                'monthlyExpenses' => $monthlyExpenses,
                'netIncome' => $monthlyIncome - $monthlyExpenses,
            ],
            'recentTransactions' => $recentTransactions,
            'expensesByCategory' => $expensesByCategory,
            'upcomingBills' => $upcomingBills,
            'monthlyTrends' => $monthlyTrends,
            'dateRange' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
        ]);
    }
}