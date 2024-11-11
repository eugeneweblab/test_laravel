<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
	public function run(): void
	{

		User::create([
			'name' => 'Admin User',
			'email' => 'admin@example.com',
			'password' => Hash::make('au234'),
			'role' => 'admin',
		]);


		User::create([
			'name' => 'Regular User 1',
			'email' => 'user1@example.com',
			'password' => Hash::make('regu1'),
			'role' => 'regular',
		]);

		User::create([
			'name' => 'Regular User 2',
			'email' => 'user2@example.com',
			'password' => Hash::make('regu2'),
			'role' => 'regular',
		]);


		User::create([
			'name' => 'Regular User 3',
			'email' => 'user3@example.com',
			'password' => Hash::make('regu3'),
			'role' => 'regular',
		]);

		User::create([
			'name' => 'Regular User 4',
			'email' => 'user4@example.com',
			'password' => Hash::make('regu4'),
			'role' => 'regular',
		]);


		User::create([
			'name' => 'Regular User 5',
			'email' => 'user5@example.com',
			'password' => Hash::make('regu5'),
			'role' => 'regular',
		]);

		User::create([
			'name' => 'Regular User 6',
			'email' => 'user6@example.com',
			'password' => Hash::make('regu6'),
			'role' => 'regular',
		]);


		User::create([
			'name' => 'Regular User 7',
			'email' => 'user7@example.com',
			'password' => Hash::make('regu7'),
			'role' => 'regular',
		]);

		User::create([
			'name' => 'Regular User 8',
			'email' => 'user8@example.com',
			'password' => Hash::make('regu8'),
			'role' => 'regular',
		]);


	}
}