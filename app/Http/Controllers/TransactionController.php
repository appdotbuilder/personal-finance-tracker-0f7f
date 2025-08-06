<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTransactionRequest;
use App\Models\Account;
use App\Models\Category;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        $query = Transaction::with(['category', 'account', 'toAccount'])
            ->where('user_id', $user->id);
        
        // Apply filters
        if ($request->has('type') && $request->type) {
            $query->where('type', $request->type);
        }
        
        if ($request->has('category_id') && $request->category_id) {
            $query->where('category_id', $request->category_id);
        }
        
        if ($request->has('account_id') && $request->account_id) {
            $query->where('account_id', $request->account_id);
        }
        
        if ($request->has('date_from') && $request->date_from) {
            $query->where('transaction_date', '>=', $request->date_from);
        }
        
        if ($request->has('date_to') && $request->date_to) {
            $query->where('transaction_date', '<=', $request->date_to);
        }
        
        $transactions = $query->orderBy('transaction_date', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(20);
        
        $categories = Category::orderBy('name')->get();
        $accounts = Account::where('user_id', $user->id)->orderBy('name')->get();
        
        return Inertia::render('transactions/index', [
            'transactions' => $transactions,
            'categories' => $categories,
            'accounts' => $accounts,
            'filters' => $request->only(['type', 'category_id', 'account_id', 'date_from', 'date_to'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        $categories = Category::orderBy('type')->orderBy('name')->get();
        $accounts = Account::where('user_id', $user->id)->orderBy('name')->get();
        
        return Inertia::render('transactions/create', [
            'categories' => $categories,
            'accounts' => $accounts
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        $user = Auth::user();
        
        DB::transaction(function () use ($request, $user) {
            $data = $request->validated();
            $data['user_id'] = $user->id;
            
            $transaction = Transaction::create($data);
            
            // Update account balances
            $account = Account::findOrFail($data['account_id']);
            
            if ($data['type'] === 'income') {
                $account->increment('balance', $data['amount']);
            } elseif ($data['type'] === 'expense') {
                $account->decrement('balance', $data['amount']);
            } elseif ($data['type'] === 'transfer' && $data['to_account_id']) {
                $account->decrement('balance', $data['amount']);
                $toAccount = Account::findOrFail($data['to_account_id']);
                $toAccount->increment('balance', $data['amount']);
            }
        });

        return redirect()->route('transactions.index')
            ->with('success', 'Transaction created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        // Ensure user owns the transaction
        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }
        
        $transaction->load(['category', 'account', 'toAccount']);
        
        return Inertia::render('transactions/show', [
            'transaction' => $transaction
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        // Ensure user owns the transaction
        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }
        
        $user = Auth::user();
        $categories = Category::orderBy('type')->orderBy('name')->get();
        $accounts = Account::where('user_id', $user->id)->orderBy('name')->get();
        
        return Inertia::render('transactions/edit', [
            'transaction' => $transaction,
            'categories' => $categories,
            'accounts' => $accounts
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreTransactionRequest $request, Transaction $transaction)
    {
        // Ensure user owns the transaction
        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }
        
        DB::transaction(function () use ($request, $transaction) {
            // Revert previous balance changes
            $oldAccount = Account::findOrFail($transaction->account_id);
            
            if ($transaction->type === 'income') {
                $oldAccount->decrement('balance', $transaction->amount);
            } elseif ($transaction->type === 'expense') {
                $oldAccount->increment('balance', $transaction->amount);
            } elseif ($transaction->type === 'transfer' && $transaction->to_account_id) {
                $oldAccount->increment('balance', $transaction->amount);
                $oldToAccount = Account::findOrFail($transaction->to_account_id);
                $oldToAccount->decrement('balance', $transaction->amount);
            }
            
            // Update transaction
            $data = $request->validated();
            $transaction->update($data);
            
            // Apply new balance changes
            $newAccount = Account::findOrFail($data['account_id']);
            
            if ($data['type'] === 'income') {
                $newAccount->increment('balance', $data['amount']);
            } elseif ($data['type'] === 'expense') {
                $newAccount->decrement('balance', $data['amount']);
            } elseif ($data['type'] === 'transfer' && $data['to_account_id']) {
                $newAccount->decrement('balance', $data['amount']);
                $newToAccount = Account::findOrFail($data['to_account_id']);
                $newToAccount->increment('balance', $data['amount']);
            }
        });

        return redirect()->route('transactions.index')
            ->with('success', 'Transaction updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        // Ensure user owns the transaction
        if ($transaction->user_id !== Auth::id()) {
            abort(403);
        }
        
        DB::transaction(function () use ($transaction) {
            // Revert balance changes
            $account = Account::findOrFail($transaction->account_id);
            
            if ($transaction->type === 'income') {
                $account->decrement('balance', $transaction->amount);
            } elseif ($transaction->type === 'expense') {
                $account->increment('balance', $transaction->amount);
            } elseif ($transaction->type === 'transfer' && $transaction->to_account_id) {
                $account->increment('balance', $transaction->amount);
                $toAccount = Account::findOrFail($transaction->to_account_id);
                $toAccount->decrement('balance', $transaction->amount);
            }
            
            $transaction->delete();
        });

        return redirect()->route('transactions.index')
            ->with('success', 'Transaction deleted successfully.');
    }
}