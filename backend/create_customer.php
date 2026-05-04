<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Update customer with phone and address
$user = User::where('username', 'customer')->first();
if ($user) {
    $user->update([
        'phone' => '0123456789',
        'address' => '123 Curry Street, Food City'
    ]);
    echo "Customer updated:\n";
    echo "Phone: 0123456789\n";
    echo "Address: 123 Curry Street, Food City\n";
} else {
    echo "Customer not found!\n";
}
