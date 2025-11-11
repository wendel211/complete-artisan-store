<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // 🟤 Cerâmica
            [
                'name' => 'Vaso de Cerâmica Rústico',
                'description' => 'Feito à mão com argila natural, ideal para decoração de interiores.',
                'price' => 120.00,
                'stock' => 8,
                'image_url' => 'https://images.unsplash.com/photo-1606761568499-6d2451b23c56?q=80&w=800',
                'category' => 'Cerâmica',
            ],
            [
                'name' => 'Conjunto de Pratos Artesanais',
                'description' => 'Pratos de cerâmica pintados à mão, perfeitos para uso decorativo.',
                'price' => 180.50,
                'stock' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1600690226524-f8f3e3b7c4e0?q=80&w=800',
                'category' => 'Cerâmica',
            ],

            // 🧵 Tecidos
            [
                'name' => 'Bolsa de Tecido Floral',
                'description' => 'Bolsa sustentável feita com retalhos de tecido colorido.',
                'price' => 85.90,
                'stock' => 12,
                'image_url' => 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800',
                'category' => 'Tecidos',
            ],
            [
                'name' => 'Almofada Patchwork',
                'description' => 'Almofada artesanal feita com técnica de patchwork colorido.',
                'price' => 60.00,
                'stock' => 20,
                'image_url' => 'https://images.unsplash.com/photo-1590431252059-2e79e400c2ed?q=80&w=800',
                'category' => 'Tecidos',
            ],

            // 🕯️ Velas
            [
                'name' => 'Vela Aromática de Lavanda',
                'description' => 'Feita com cera natural e essência suave de lavanda.',
                'price' => 45.00,
                'stock' => 15,
                'image_url' => 'https://images.unsplash.com/photo-1600185365524-49765a8c9180?q=80&w=800',
                'category' => 'Velas',
            ],
            [
                'name' => 'Kit 3 Velas Decorativas',
                'description' => 'Conjunto de velas artesanais com design rústico e natural.',
                'price' => 90.00,
                'stock' => 10,
                'image_url' => 'https://images.unsplash.com/photo-1606484722325-54e67f4a2d02?q=80&w=800',
                'category' => 'Velas',
            ],

            // 💍 Bijuterias
            [
                'name' => 'Colar de Miçangas Coloridas',
                'description' => 'Bijuteria artesanal feita com miçangas e cordão de algodão.',
                'price' => 35.00,
                'stock' => 25,
                'image_url' => 'https://images.unsplash.com/photo-1615906657016-5a9078f6a0e8?q=80&w=800',
                'category' => 'Bijuterias',
            ],
            [
                'name' => 'Pulseira com Pingente de Flor',
                'description' => 'Pulseira feita à mão com contas naturais e pingente artesanal.',
                'price' => 40.00,
                'stock' => 18,
                'image_url' => 'https://images.unsplash.com/photo-1616594039964-72d5a7a9d88a?q=80&w=800',
                'category' => 'Bijuterias',
            ],

            // 🏠 Decoração
            [
                'name' => 'Quadro Decorativo em Madeira',
                'description' => 'Quadro artesanal com pintura de paisagem em relevo.',
                'price' => 150.00,
                'stock' => 6,
                'image_url' => 'https://images.unsplash.com/photo-1618221293674-4e7e6c8a864f?q=80&w=800',
                'category' => 'Decoração',
            ],
            [
                'name' => 'Escultura em Argila Natural',
                'description' => 'Peça decorativa esculpida manualmente por artesão local.',
                'price' => 110.00,
                'stock' => 4,
                'image_url' => 'https://images.unsplash.com/photo-1616627564746-71d7ee1298d1?q=80&w=800',
                'category' => 'Decoração',
            ],

            // 🎨 Pintura
            [
                'name' => 'Tela Pintada à Mão - Flores Tropicais',
                'description' => 'Pintura original com técnica acrílica sobre tela.',
                'price' => 250.00,
                'stock' => 3,
                'image_url' => 'https://images.unsplash.com/photo-1607083206863-6d2e99f1b9d8?q=80&w=800',
                'category' => 'Pintura',
            ],
            [
                'name' => 'Quadro Abstrato Colorido',
                'description' => 'Obra vibrante ideal para ambientes modernos.',
                'price' => 300.00,
                'stock' => 2,
                'image_url' => 'https://images.unsplash.com/photo-1581090700227-1e37b190418e?q=80&w=800',
                'category' => 'Pintura',
            ],

            // 🌳 Madeira
            [
                'name' => 'Caixa Organizadora de Madeira',
                'description' => 'Caixa feita com madeira reaproveitada, acabamento natural.',
                'price' => 75.00,
                'stock' => 10,
                'image_url' => 'https://images.unsplash.com/photo-1616627564953-079f7b4e6b2f?q=80&w=800',
                'category' => 'Madeira',
            ],
            [
                'name' => 'Porta-retratos Artesanal',
                'description' => 'Porta-retratos feito à mão com detalhes de bambu.',
                'price' => 55.00,
                'stock' => 7,
                'image_url' => 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c2?q=80&w=800',
                'category' => 'Madeira',
            ],

            // 🪡 Bordados
            [
                'name' => 'Pano de Prato Bordado',
                'description' => 'Pano de algodão com bordado floral artesanal.',
                'price' => 35.90,
                'stock' => 15,
                'image_url' => 'https://images.unsplash.com/photo-1612197527729-c98b45df7ff9?q=80&w=800',
                'category' => 'Bordados',
            ],
            [
                'name' => 'Toalha de Mesa Bordada',
                'description' => 'Peça clássica com bordados manuais detalhados.',
                'price' => 140.00,
                'stock' => 5,
                'image_url' => 'https://images.unsplash.com/photo-1605296867424-35fc25c92102?q=80&w=800',
                'category' => 'Bordados',
            ],
        ];

        foreach ($products as $p) {
            $category = Category::where('name', $p['category'])->first();

            if ($category) {
                Product::create([
                    'name' => $p['name'],
                    'description' => $p['description'],
                    'price' => $p['price'],
                    'stock' => $p['stock'],
                    'image_url' => $p['image_url'],
                    'category_id' => $category->id,
                ]);
            }
        }
    }
}
