import React from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Link, router } from '@inertiajs/react';

interface Category {
    id: number;
    name: string;
    icon: string;
    color: string;
    type: 'income' | 'expense' | 'both';
    transactions_count?: number;
}

interface Props {
    categories: Category[];
    [key: string]: unknown;
}

export default function CategoryIndex({ categories }: Props) {
    const getBadgeColor = (type: string) => {
        switch (type) {
            case 'income': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'expense': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            case 'both': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete the category "${name}"?`)) {
            router.delete(`/categories/${id}`, {
                preserveScroll: true,
            });
        }
    };

    const incomeCategories = categories.filter(cat => cat.type === 'income');
    const expenseCategories = categories.filter(cat => cat.type === 'expense');
    const bothCategories = categories.filter(cat => cat.type === 'both');

    const CategoryCard = ({ category }: { category: Category }) => (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                        style={{ backgroundColor: category.color + '20' }}
                    >
                        {category.icon}
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                            {category.name}
                        </h4>
                        <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBadgeColor(category.type)}`}>
                                {category.type}
                            </span>
                            {category.transactions_count !== undefined && (
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {category.transactions_count} transactions
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/categories/${category.id}`}>
                            View
                        </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={`/categories/${category.id}/edit`}>
                            Edit
                        </Link>
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDelete(category.id, category.name)}
                        className="text-red-600 hover:text-red-900"
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            🏷️ Categories
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Organize your transactions with custom categories
                        </p>
                    </div>
                    <Button asChild>
                        <Link href="/categories/create">
                            ➕ Add Category
                        </Link>
                    </Button>
                </div>

                {categories.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="text-6xl mb-4">🏷️</div>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            No categories found
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">
                            Create your first category to organize your transactions
                        </p>
                        <Button asChild>
                            <Link href="/categories/create">
                                Create Your First Category
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <>
                        {/* Income Categories */}
                        {incomeCategories.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <span className="text-green-600 mr-2">📈</span>
                                    Income Categories ({incomeCategories.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {incomeCategories.map(category => (
                                        <CategoryCard key={category.id} category={category} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Expense Categories */}
                        {expenseCategories.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <span className="text-red-600 mr-2">📉</span>
                                    Expense Categories ({expenseCategories.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {expenseCategories.map(category => (
                                        <CategoryCard key={category.id} category={category} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Both Categories */}
                        {bothCategories.length > 0 && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                                    <span className="text-blue-600 mr-2">🔄</span>
                                    Universal Categories ({bothCategories.length})
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {bothCategories.map(category => (
                                        <CategoryCard key={category.id} category={category} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Quick Stats */}
                {categories.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            📊 Category Overview
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {incomeCategories.length}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Income Categories
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">
                                    {expenseCategories.length}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Expense Categories
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {bothCategories.length}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Universal Categories
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}