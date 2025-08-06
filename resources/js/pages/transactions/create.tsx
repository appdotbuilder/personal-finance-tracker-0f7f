import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useForm } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    icon: string;
    type: string;
    color: string;
}

interface Account {
    id: number;
    name: string;
    type: string;
    balance: number;
}

interface Props {
    categories: Category[];
    accounts: Account[];
    [key: string]: unknown;
}

export default function CreateTransaction({ categories, accounts }: Props) {
    const [selectedType, setSelectedType] = useState<'income' | 'expense' | 'transfer'>('expense');
    
    const { data, setData, post, processing, errors } = useForm({
        type: 'expense',
        category_id: '',
        account_id: '',
        to_account_id: '',
        amount: '',
        description: '',
        transaction_date: new Date().toISOString().split('T')[0],
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const filteredCategories = categories.filter(category => 
        category.type === selectedType || category.type === 'both'
    );

    const handleTypeChange = (type: 'income' | 'expense' | 'transfer') => {
        setSelectedType(type);
        setData('type', type);
        setData('category_id', '');
        setData('to_account_id', '');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions');
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            ➕ Add Transaction
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Record a new income, expense, or transfer
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/transactions">
                            ← Back to Transactions
                        </Link>
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Transaction Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Transaction Type
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    type="button"
                                    onClick={() => handleTypeChange('income')}
                                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                                        selectedType === 'income'
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">📈</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Income</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Money coming in</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleTypeChange('expense')}
                                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                                        selectedType === 'expense'
                                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-red-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">📉</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Expense</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Money going out</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleTypeChange('transfer')}
                                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                                        selectedType === 'transfer'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">🔄</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Transfer</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">Between accounts</div>
                                </button>
                            </div>
                            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Amount */}
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Amount *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className="pl-8"
                                        placeholder="0.00"
                                        required
                                    />
                                </div>
                                {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
                            </div>

                            {/* Date */}
                            <div>
                                <label htmlFor="transaction_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Date *
                                </label>
                                <Input
                                    id="transaction_date"
                                    type="date"
                                    value={data.transaction_date}
                                    onChange={(e) => setData('transaction_date', e.target.value)}
                                    required
                                />
                                {errors.transaction_date && <p className="mt-1 text-sm text-red-600">{errors.transaction_date}</p>}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Category *
                            </label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                required
                            >
                                <option value="">Select a category</option>
                                {filteredCategories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.icon} {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* From Account */}
                            <div>
                                <label htmlFor="account_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    {selectedType === 'transfer' ? 'From Account' : 'Account'} *
                                </label>
                                <select
                                    id="account_id"
                                    value={data.account_id}
                                    onChange={(e) => setData('account_id', e.target.value)}
                                    className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                    required
                                >
                                    <option value="">Select an account</option>
                                    {accounts.map(account => (
                                        <option key={account.id} value={account.id}>
                                            {account.name} ({formatCurrency(account.balance)})
                                        </option>
                                    ))}
                                </select>
                                {errors.account_id && <p className="mt-1 text-sm text-red-600">{errors.account_id}</p>}
                            </div>

                            {/* To Account (for transfers) */}
                            {selectedType === 'transfer' && (
                                <div>
                                    <label htmlFor="to_account_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        To Account *
                                    </label>
                                    <select
                                        id="to_account_id"
                                        value={data.to_account_id}
                                        onChange={(e) => setData('to_account_id', e.target.value)}
                                        className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                                        required
                                    >
                                        <option value="">Select destination account</option>
                                        {accounts
                                            .filter(account => account.id.toString() !== data.account_id)
                                            .map(account => (
                                                <option key={account.id} value={account.id}>
                                                    {account.name} ({formatCurrency(account.balance)})
                                                </option>
                                            ))
                                        }
                                    </select>
                                    {errors.to_account_id && <p className="mt-1 text-sm text-red-600">{errors.to_account_id}</p>}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Description *
                            </label>
                            <Input
                                id="description"
                                type="text"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Enter transaction description"
                                required
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/transactions">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Adding...' : 'Add Transaction'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}