<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
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
            'name' => fake()->word() . ' Account',
            'type' => fake()->randomElement(['cash', 'debit_card', 'credit_card', 'savings', 'checking']),
            'balance' => fake()->randomFloat(2, 0, 10000),
            'icon' => '🏦',
        ];
    }
}