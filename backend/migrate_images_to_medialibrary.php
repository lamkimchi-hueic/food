<?php

use App\Models\Product;
use App\Models\Category;

require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "=== Migrating existing images to MediaLibrary ===\n\n";

// Migrate Product images
echo "--- Products ---\n";
$products = Product::whereNotNull('img')->where('img', '!=', '')->get();
foreach ($products as $product) {
    if ($product->getFirstMediaUrl('images')) {
        echo "  [SKIP] {$product->name} - already has media\n";
        continue;
    }

    $filePath = storage_path('app/public/' . $product->img);
    if (!file_exists($filePath)) {
        $filePath = public_path('storage/' . $product->img);
    }

    if (file_exists($filePath)) {
        try {
            $product->addMedia($filePath)
                ->preservingOriginal()
                ->toMediaCollection('images');
            echo "  [OK] {$product->name} -> {$product->img}\n";
        } catch (Exception $e) {
            echo "  [ERROR] {$product->name}: {$e->getMessage()}\n";
        }
    } else {
        echo "  [MISSING] {$product->name} -> file not found: {$product->img}\n";
    }
}

// Migrate Category images
echo "\n--- Categories ---\n";
$categories = Category::whereNotNull('img')->where('img', '!=', '')->get();
foreach ($categories as $category) {
    if ($category->getFirstMediaUrl('images')) {
        echo "  [SKIP] {$category->name} - already has media\n";
        continue;
    }

    $filePath = storage_path('app/public/' . $category->img);
    if (!file_exists($filePath)) {
        $filePath = public_path('storage/' . $category->img);
    }

    if (file_exists($filePath)) {
        try {
            $category->addMedia($filePath)
                ->preservingOriginal()
                ->toMediaCollection('images');
            echo "  [OK] {$category->name} -> {$category->img}\n";
        } catch (Exception $e) {
            echo "  [ERROR] {$category->name}: {$e->getMessage()}\n";
        }
    } else {
        echo "  [MISSING] {$category->name} -> file not found: {$category->img}\n";
    }
}

echo "\n=== Migration completed! ===\n";
