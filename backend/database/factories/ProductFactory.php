<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->text(40);
        return [
            'category_id' => Category::factory(),
            'img' => fake()->imageUrl(),
            'name' => $name,
            'slug' => \Illuminate\Support\Str::slug($name),
            'desc' => fake()->text(40),
            'price' => fake()->randomFloat(2, 10, 1000),
        ];
    }
}
