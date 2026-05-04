<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use Illuminate\Support\Facades\DB;

$stats = DB::table('users as u')
    ->leftJoin('orders as o', 'u.id', '=', 'o.user_id')
    ->leftJoin('order_items as oi', 'o.id', '=', 'oi.order_id')
    ->leftJoin('products as p', 'oi.product_id', '=', 'p.id')
    ->select(
        'u.name',
        DB::raw('COUNT(DISTINCT o.id) as order_count'),
        DB::raw('SUM(oi.amount) as total_items'),
        DB::raw('SUM(oi.amount * p.price) as total_revenue')
    )
    ->groupBy('u.id', 'u.name')
    ->get();

echo "Database Revenue Stats:\n";
foreach ($stats as $s) {
    echo "User: {$s->name} | Orders: {$s->order_count} | Items: " . ($s->total_items ?? 0) . " | Revenue: $" . ($s->total_revenue ?? 0) . "\n";
}
