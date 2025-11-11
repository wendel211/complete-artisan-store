<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Cerâmica',
            'Tecidos',
            'Velas',
            'Bijuterias',
            'Decoração',
            'Pintura',
            'Madeira',
            'Bordados',
        ];

        foreach ($categories as $name) {
            Category::firstOrCreate(['name' => $name]);
        }
    }
}
