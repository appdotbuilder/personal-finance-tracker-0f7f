<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BillReminder>
 */
class BillReminderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'name' => fake()->company() . ' Bill',
            'amount' => fake()->randomFloat(2, 50, 500),
            'due_date' => fake()->dateTimeBetween('now', '+1 year'),
            'frequency' => fake()->randomElement(['monthly', 'weekly', 'yearly', 'once']),
            'is_paid' => fake()->boolean(30),
        ];
    }
}