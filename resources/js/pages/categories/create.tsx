import React, { useState } from 'react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useForm } from '@inertiajs/react';

export default function CreateCategory() {
    const [selectedColor, setSelectedColor] = useState('#3b82f6');
    const [selectedIcon, setSelectedIcon] = useState('💰');
    
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        icon: '💰',
        color: '#3b82f6',
        type: 'expense',
    });

    const commonColors = [
        '#ef4444', // red
        '#f97316', // orange
        '#f59e0b', // amber
        '#eab308', // yellow
        '#84cc16', // lime
        '#22c55e', // green
        '#10b981', // emerald
        '#14b8a6', // teal
        '#06b6d4', // cyan
        '#0ea5e9', // sky
        '#3b82f6', // blue
        '#6366f1', // indigo
        '#8b5cf6', // violet
        '#a855f7', // purple
        '#d946ef', // fuchsia
        '#ec4899', // pink
        '#64748b', // slate
    ];

    const commonIcons = [
        '💰', '🏦', '💵', '💳', '🏠', '🍔', '🛒', '⛽', '💡', '🎬',
        '🏥', '📚', '✈️', '🚗', '👕', '📱', '🎵', '🏃', '🍽️', '☕',
        '🎯', '🎮', '📊', '🔧', '🎨', '📝', '🎁', '💻', '📷', '🌟'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/categories');
    };

    const handleColorChange = (color: string) => {
        setSelectedColor(color);
        setData('color', color);
    };

    const handleIconChange = (icon: string) => {
        setSelectedIcon(icon);
        setData('icon', icon);
    };

    return (
        <AppShell>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            ➕ Add Category
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Create a new category to organize your transactions
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/categories">
                            ← Back to Categories
                        </Link>
                    </Button>
                </div>

                <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Category Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Category Name *
                            </label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Enter category name"
                                required
                            />
                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        {/* Category Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Category Type *
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setData('type', 'income')}
                                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                                        data.type === 'income'
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-green-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">📈</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Income</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">For money coming in</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setData('type', 'expense')}
                                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                                        data.type === 'expense'
                                            ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-red-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">📉</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Expense</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">For money going out</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setData('type', 'both')}
                                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                                        data.type === 'both'
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                            : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="text-2xl mb-2">🔄</div>
                                    <div className="font-medium text-gray-900 dark:text-white">Both</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">For income & expense</div>
                                </button>
                            </div>
                            {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
                        </div>

                        {/* Icon Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Icon *
                            </label>
                            <div className="grid grid-cols-10 gap-2 mb-4">
                                {commonIcons.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => handleIconChange(icon)}
                                        className={`p-2 text-2xl border-2 rounded-lg transition-colors ${
                                            selectedIcon === icon
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                                : 'border-gray-200 dark:border-gray-600 hover:border-blue-300'
                                        }`}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Or enter custom icon:
                                </span>
                                <Input
                                    type="text"
                                    value={data.icon}
                                    onChange={(e) => {
                                        setData('icon', e.target.value);
                                        setSelectedIcon(e.target.value);
                                    }}
                                    className="w-20 text-center"
                                    placeholder="🏷️"
                                />
                            </div>
                            {errors.icon && <p className="mt-1 text-sm text-red-600">{errors.icon}</p>}
                        </div>

                        {/* Color Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Color *
                            </label>
                            <div className="grid grid-cols-17 gap-2 mb-4">
                                {commonColors.map((color) => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => handleColorChange(color)}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                                            selectedColor === color
                                                ? 'border-gray-900 dark:border-white scale-110'
                                                : 'border-gray-300 dark:border-gray-600'
                                        }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    Or choose custom color:
                                </span>
                                <input
                                    type="color"
                                    value={data.color}
                                    onChange={(e) => {
                                        setData('color', e.target.value);
                                        setSelectedColor(e.target.value);
                                    }}
                                    className="w-12 h-8 rounded border border-gray-300 dark:border-gray-600"
                                />
                            </div>
                            {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
                        </div>

                        {/* Preview */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                Preview
                            </label>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    <div 
                                        className="w-12 h-12 rounded-lg flex items-center justify-center text-xl"
                                        style={{ backgroundColor: selectedColor + '20' }}
                                    >
                                        {selectedIcon}
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900 dark:text-white">
                                            {data.name || 'Category Name'}
                                        </div>
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {data.type} category
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Buttons */}
                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/categories">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Category'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppShell>
    );
}