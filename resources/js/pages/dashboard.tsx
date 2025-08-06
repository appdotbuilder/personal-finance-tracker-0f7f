import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Transaction {
    id: number;
    type: 'income' | 'expense' | 'transfer';
    amount: number;
    description: string;
    transaction_date: string;
    category: {
        name: string;
        icon: string;
        color: string;
    };
    account: {
        name: string;
        type: string;
    };
    to_account?: {
        name: string;
        type: string;
    };
}

interface ExpenseCategory {
    category: string;
    amount: number;
    color: string;
    icon: string;
}

interface BillReminder {
    id: number;
    name: string;
    amount: number;
    due_date: string;
    category: {
        name: string;
        icon: string;
    };
}

interface MonthlyTrend {
    month: string;
    income: number;
    expenses: number;
    net: number;
}

interface Props {
    stats: {
        totalBalance: number;
        monthlyIncome: number;
        monthlyExpenses: number;
        netIncome: number;
    };
    recentTransactions: Transaction[];
    expensesByCategory: ExpenseCategory[];
    upcomingBills: BillReminder[];
    monthlyTrends: MonthlyTrend[];
    dateRange: {
        start_date: string;
        end_date: string;
    };
    [key: string]: unknown;
}

export default function Dashboard({ 
    stats, 
    recentTransactions, 
    expensesByCategory, 
    upcomingBills 
}: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTransactionIcon = (type: string) => {
        switch (type) {
            case 'income': return '📈';
            case 'expense': return '📉';
            case 'transfer': return '🔄';
            default: return '💰';
        }
    };

    const getTransactionColor = (type: string) => {
        switch (type) {
            case 'income': return 'text-green-600';
            case 'expense': return 'text-red-600';
            case 'transfer': return 'text-blue-600';
            default: return 'text-gray-600';
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            💰 Financial Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Overview of your financial health
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Button asChild>
                            <Link href="/transactions/create">
                                ➕ Add Transaction
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/transactions">
                                📊 View All
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">🏦</div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Total Balance
                                    </p>
                                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                        {formatCurrency(stats.totalBalance)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">📈</div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Monthly Income
                                    </p>
                                    <p className="text-2xl font-semibold text-green-600">
                                        {formatCurrency(stats.monthlyIncome)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">📉</div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Monthly Expenses
                                    </p>
                                    <p className="text-2xl font-semibold text-red-600">
                                        {formatCurrency(stats.monthlyExpenses)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="text-2xl mr-3">💰</div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        Net Income
                                    </p>
                                    <p className={`text-2xl font-semibold ${stats.netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(stats.netIncome)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Transactions */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    📋 Recent Transactions
                                </h3>
                                <Button variant="ghost" size="sm" asChild>
                                    <Link href="/transactions">View All</Link>
                                </Button>
                            </div>
                            <div className="space-y-3">
                                {recentTransactions.length === 0 ? (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No transactions yet. <Link href="/transactions/create" className="text-blue-600 hover:underline">Add your first transaction</Link>
                                    </p>
                                ) : (
                                    recentTransactions.map((transaction) => (
                                        <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg">
                                                    {transaction.category.icon || getTransactionIcon(transaction.type)}
                                                </span>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {transaction.description}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {transaction.category.name} • {transaction.account.name}
                                                        {transaction.to_account && ` → ${transaction.to_account.name}`}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`font-medium ${getTransactionColor(transaction.type)}`}>
                                                    {transaction.type === 'expense' ? '-' : '+'}
                                                    {formatCurrency(transaction.amount)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {formatDate(transaction.transaction_date)}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Expenses by Category */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                🏷️ Expenses by Category
                            </h3>
                            <div className="space-y-3">
                                {expensesByCategory.length === 0 ? (
                                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                        No expenses this month
                                    </p>
                                ) : (
                                    expensesByCategory.slice(0, 5).map((expense, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <span className="text-lg">{expense.icon}</span>
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {expense.category}
                                                </span>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium text-red-600">
                                                    {formatCurrency(expense.amount)}
                                                </p>
                                                <div 
                                                    className="h-2 w-16 rounded-full mt-1"
                                                    style={{ backgroundColor: expense.color, opacity: 0.3 }}
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upcoming Bills */}
                {upcomingBills.length > 0 && (
                    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                ⏰ Upcoming Bills
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {upcomingBills.map((bill) => (
                                    <div key={bill.id} className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <span className="text-lg">{bill.category.icon}</span>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {bill.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        Due: {formatDate(bill.due_date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="font-semibold text-yellow-700 dark:text-yellow-300">
                                                {formatCurrency(bill.amount)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            🚀 Quick Actions
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <Button variant="outline" className="h-auto py-4" asChild>
                                <Link href="/transactions/create" className="flex flex-col items-center">
                                    <span className="text-2xl mb-2">💸</span>
                                    <span>Add Expense</span>
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" asChild>
                                <Link href="/transactions/create" className="flex flex-col items-center">
                                    <span className="text-2xl mb-2">💰</span>
                                    <span>Add Income</span>
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" asChild>
                                <Link href="/categories" className="flex flex-col items-center">
                                    <span className="text-2xl mb-2">🏷️</span>
                                    <span>Categories</span>
                                </Link>
                            </Button>
                            <Button variant="outline" className="h-auto py-4" asChild>
                                <Link href="/transactions" className="flex flex-col items-center">
                                    <span className="text-2xl mb-2">📊</span>
                                    <span>Reports</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}