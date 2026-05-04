<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        Category::factory(5)->create()->each(function ($category) {
            Product::factory(rand(5, 10))->create([
                'category_id' => $category->id,
                'img' => '/images/food_' . rand(0, 4) . '.jpg'
            ]);
        });

        User::factory(10)->create()->each(function ($user) {
            Order::factory(rand(1, 3))->create([
                'user_id' => $user->id,
            ])->each(function ($order) {
                $products = Product::inRandomOrder()->limit(rand(2, 5))->get();
                foreach ($products as $product) {
                    OrderItem::factory()->create([
                        'order_id' => $order->id,
                        'product_id' => $product->id,
                    ]);
                }
            });
        });
    }
}
