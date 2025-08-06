import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, router } from '@inertiajs/react';

interface Transaction {
    id: number;
    type: 'income' | 'expense' | 'transfer';
    amount: number;
    description: string;
    transaction_date: string;
    category: {
        id: number;
        name: string;
        icon: string;
        color: string;
    };
    account: {
        id: number;
        name: string;
        type: string;
    };
    to_account?: {
        id: number;
        name: string;
        type: string;
    };
}

interface Category {
    id: number;
    name: string;
    icon: string;
    type: string;
}

interface Account {
    id: number;
    name: string;
    type: string;
}

interface Props {
    transactions: {
        data: Transaction[];
        links: unknown[];
        meta: {
            total: number;
        };
    };
    categories: Category[];
    accounts: Account[];
    filters: {
        type?: string;
        category_id?: number;
        account_id?: number;
        date_from?: string;
        date_to?: string;
    };
    [key: string]: unknown;
}

export default function TransactionIndex({ transactions, categories, accounts, filters }: Props) {
    const [localFilters, setLocalFilters] = useState(filters);

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

    const getTransactionColor = (type: string) => {
        switch (type) {
            case 'income': return 'text-green-600';
            case 'expense': return 'text-red-600';
            case 'transfer': return 'text-blue-600';
            default: return 'text-gray-600';
        }
    };

    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'income': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'expense': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'transfer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const applyFilters = () => {
        router.get('/transactions', localFilters, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setLocalFilters({});
        router.get('/transactions', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            router.delete(`/transactions/${id}`, {
                preserveScroll: true,
            });
        }
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            📊 Transactions
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Manage your income, expenses, and transfers
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/transactions/create">
                            ➕ Add Transaction
                        </Link>
                    </Button>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                        🔍 Filters
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Type
                            </label>
                            <select
                                value={localFilters.type || ''}
                                onChange={(e) => setLocalFilters({...localFilters, type: e.target.value || undefined})}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            >
                                <option value="">All Types</option>
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                                <option value="transfer">Transfer</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Category
                            </label>
                            <select
                                value={localFilters.category_id || ''}
                                onChange={(e) => setLocalFilters({...localFilters, category_id: e.target.value ? parseInt(e.target.value) : undefined})}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            >
                                <option value="">All Categories</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.icon} {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Account
                            </label>
                            <select
                                value={localFilters.account_id || ''}
                                onChange={(e) => setLocalFilters({...localFilters, account_id: e.target.value ? parseInt(e.target.value) : undefined})}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                            >
                                <option value="">All Accounts</option>
                                {accounts.map(account => (
                                    <option key={account.id} value={account.id}>
                                        {account.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                From Date
                            </label>
                            <Input
                                type="date"
                                value={localFilters.date_from || ''}
                                onChange={(e) => setLocalFilters({...localFilters, date_from: e.target.value || undefined})}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                To Date
                            </label>
                            <Input
                                type="date"
                                value={localFilters.date_to || ''}
                                onChange={(e) => setLocalFilters({...localFilters, date_to: e.target.value || undefined})}
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 mt-4">
                        <Button onClick={applyFilters}>Apply Filters</Button>
                        <Button variant="outline" onClick={clearFilters}>Clear Filters</Button>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
                    <div className="p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            📋 Transaction List ({transactions.meta.total} total)
                        </h3>
                        
                        {transactions.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">💰</div>
                                <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                                    No transactions found
                                </p>
                                <Button asChild>
                                    <Link href="/transactions/create">
                                        Add Your First Transaction
                                    </Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Transaction
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Account
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Type
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {transactions.data.map((transaction) => (
                                            <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <span className="text-2xl mr-3">{transaction.category.icon}</span>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {transaction.description}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {transaction.category.name}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                                    {transaction.account.name}
                                                    {transaction.to_account && (
                                                        <span className="text-gray-500"> → {transaction.to_account.name}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(transaction.type)}`}>
                                                        {transaction.type}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                                    <span className={`font-medium ${getTransactionColor(transaction.type)}`}>
                                                        {transaction.type === 'expense' ? '-' : '+'}
                                                        {formatCurrency(transaction.amount)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {formatDate(transaction.transaction_date)}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link href={`/transactions/${transaction.id}`}>
                                                                View
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link href={`/transactions/${transaction.id}/edit`}>
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => handleDelete(transaction.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Pagination would go here */}
                        {transactions.links && (
                            <div className="mt-6 flex justify-center">
                                {/* Add pagination links */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}