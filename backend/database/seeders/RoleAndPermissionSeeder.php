<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $customerRole = Role::firstOrCreate(['name' => 'customer']);

        // Assign 'admin' role to existing users with role = 1
        User::where('role', 1)->get()->each(function ($user) use ($adminRole) {
            $user->assignRole($adminRole);
        });

        // Assign 'customer' role to existing users with role = 0
        User::where('role', 0)->get()->each(function ($user) use ($customerRole) {
            $user->assignRole($customerRole);
        });
    }
}
