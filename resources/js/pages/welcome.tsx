import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
            <div className="relative overflow-hidden">
                {/* Header */}
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <div className="flex items-center">
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    💰 FinanceTracker
                                </span>
                            </div>
                        </div>
                        <div className="flex lg:flex-1 lg:justify-end space-x-4">
                            {canLogin && (
                                <Link
                                    href="/login"
                                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-300 hover:text-blue-600"
                                >
                                    Log in
                                </Link>
                            )}
                            {canRegister && (
                                <Button asChild>
                                    <Link href="/register">
                                        Get Started
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                            Take Control of Your 
                            <span className="text-blue-600"> Finances</span>
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                            Track income and expenses, manage budgets, set bill reminders, 
                            and visualize your financial data with powerful reporting tools.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            {canRegister && (
                                <Button size="lg" asChild>
                                    <Link href="/register">
                                        🚀 Start Free Today
                                    </Link>
                                </Button>
                            )}
                            {canLogin && (
                                <Button variant="outline" size="lg" asChild>
                                    <Link href="/login">
                                        Sign In
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                                Everything you need to manage your money
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                                Comprehensive financial management tools in one beautiful application
                            </p>
                        </div>
                        
                        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600 text-white text-2xl">
                                        📊
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Transaction Tracking
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">
                                            Record income, expenses, and transfers with detailed categorization. 
                                            Track every penny across multiple accounts and payment methods.
                                        </p>
                                    </dd>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-green-600 text-white text-2xl">
                                        📈
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Reports & Analytics
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">
                                            Visualize spending patterns with charts and graphs. 
                                            Generate monthly and yearly reports in PDF or Excel format.
                                        </p>
                                    </dd>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-purple-600 text-white text-2xl">
                                        🎯
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Budget Planning
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">
                                            Set category budgets and track progress. Get bill reminders 
                                            so you never miss a payment again.
                                        </p>
                                    </dd>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-orange-600 text-white text-2xl">
                                        🏦
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Multi-Account Support
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">
                                            Manage cash, checking, savings, credit cards, and more. 
                                            Transfer money between accounts with ease.
                                        </p>
                                    </dd>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-red-600 text-white text-2xl">
                                        🏷️
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Category Management
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">
                                            Organize transactions with customizable categories. 
                                            Create, edit, and delete categories with custom icons and colors.
                                        </p>
                                    </dd>
                                </div>

                                <div className="flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-teal-600 text-white text-2xl">
                                        ⏰
                                    </div>
                                    <dt className="text-xl font-semibold leading-7 text-gray-900 dark:text-white">
                                        Bill Reminders
                                    </dt>
                                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                                        <p className="flex-auto">
                                            Set up recurring bill reminders with customizable frequencies. 
                                            Never miss a payment with our notification system.
                                        </p>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-blue-600 dark:bg-blue-700">
                    <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                Ready to take control of your finances?
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
                                Join thousands of users who have transformed their financial lives with our comprehensive tracking tools.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                {canRegister && (
                                    <Button size="lg" variant="secondary" asChild>
                                        <Link href="/register">
                                            🎉 Get Started Free
                                        </Link>
                                    </Button>
                                )}
                                {canLogin && (
                                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                                        <Link href="/login">
                                            Sign In
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}