<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            // Income categories
            ['name' => 'Salary', 'icon' => '💼', 'color' => '#10b981', 'type' => 'income'],
            ['name' => 'Freelance', 'icon' => '💻', 'color' => '#3b82f6', 'type' => 'income'],
            ['name' => 'Investments', 'icon' => '📈', 'color' => '#8b5cf6', 'type' => 'income'],
            ['name' => 'Other Income', 'icon' => '💰', 'color' => '#f59e0b', 'type' => 'income'],
            
            // Expense categories
            ['name' => 'Food & Dining', 'icon' => '🍽️', 'color' => '#ef4444', 'type' => 'expense'],
            ['name' => 'Transportation', 'icon' => '🚗', 'color' => '#6366f1', 'type' => 'expense'],
            ['name' => 'Shopping', 'icon' => '🛍️', 'color' => '#ec4899', 'type' => 'expense'],
            ['name' => 'Entertainment', 'icon' => '🎬', 'color' => '#8b5cf6', 'type' => 'expense'],
            ['name' => 'Bills & Utilities', 'icon' => '💡', 'color' => '#f59e0b', 'type' => 'expense'],
            ['name' => 'Healthcare', 'icon' => '🏥', 'color' => '#ef4444', 'type' => 'expense'],
            ['name' => 'Education', 'icon' => '📚', 'color' => '#3b82f6', 'type' => 'expense'],
            ['name' => 'Travel', 'icon' => '✈️', 'color' => '#06b6d4', 'type' => 'expense'],
            ['name' => 'Other Expenses', 'icon' => '💸', 'color' => '#64748b', 'type' => 'expense'],
            
            // Transfer category
            ['name' => 'Transfer', 'icon' => '🔄', 'color' => '#64748b', 'type' => 'both'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}