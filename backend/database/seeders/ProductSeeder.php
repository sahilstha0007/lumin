<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Essential Crew Tee', 'description' => 'A perfectly weighted cotton tee with a relaxed crew neckline. The foundation of every modern wardrobe.', 'price' => 45.00, 'sku' => 'SHR-CRW-01', 'category' => 'Shirts', 'gender' => 'men', 'size' => 'M', 'color' => 'White', 'stock' => 120],
            ['name' => 'Oversized Linen Shirt', 'description' => 'Breathable European linen in a generously cut silhouette. Effortless for warm-weather layering.', 'price' => 98.00, 'sku' => 'SHR-LIN-02', 'category' => 'Shirts', 'gender' => 'unisex', 'size' => 'L', 'color' => 'Sand', 'stock' => 65],
            ['name' => 'Oxford Button-Down', 'description' => 'Crisp cotton Oxford cloth with mother-of-pearl buttons. Equally at home in the office or at brunch.', 'price' => 110.00, 'sku' => 'SHR-OXF-03', 'category' => 'Shirts', 'gender' => 'men', 'size' => 'M', 'color' => 'Light Blue', 'stock' => 88],
            ['name' => 'Merino Polo', 'description' => 'Ultra-fine merino wool polo with a slim collar. Temperature-regulating comfort meets refined style.', 'price' => 125.00, 'sku' => 'SHR-POL-04', 'category' => 'Shirts', 'gender' => 'men', 'size' => 'S', 'color' => 'Navy', 'stock' => 42],

            ['name' => 'Slim Tapered Chinos', 'description' => 'Garment-dyed stretch cotton chinos with a modern tapered leg. Your go-to weekday-to-weekend pant.', 'price' => 89.00, 'sku' => 'PNT-CHN-01', 'category' => 'Pants', 'gender' => 'men', 'size' => 'M', 'color' => 'Olive', 'stock' => 95],
            ['name' => 'Relaxed Selvedge Denim', 'description' => 'Japanese selvedge denim in a relaxed straight cut. Raw indigo that ages beautifully with every wear.', 'price' => 165.00, 'sku' => 'PNT-DNM-02', 'category' => 'Pants', 'gender' => 'men', 'size' => 'L', 'color' => 'Indigo', 'stock' => 55],
            ['name' => 'Pleated Wide Trousers', 'description' => 'Double-pleated wide-leg trousers in Italian wool blend. Architectural draping meets everyday wearability.', 'price' => 195.00, 'sku' => 'PNT-WDE-03', 'category' => 'Pants', 'gender' => 'women', 'size' => 'M', 'color' => 'Charcoal', 'stock' => 30],
            ['name' => 'Drawstring Linen Pants', 'description' => 'Relaxed-fit linen pants with an elasticated drawstring waist. Made for coastal escapes and lazy Sundays.', 'price' => 78.00, 'sku' => 'PNT-LIN-04', 'category' => 'Pants', 'gender' => 'unisex', 'size' => 'L', 'color' => 'Ecru', 'stock' => 70],

            ['name' => 'Wool Overcoat', 'description' => 'Double-faced Italian wool overcoat with a clean, unlined construction. The definitive winter layer.', 'price' => 395.00, 'sku' => 'OUT-COT-01', 'category' => 'Outerwear', 'gender' => 'unisex', 'size' => 'L', 'color' => 'Camel', 'stock' => 18],
            ['name' => 'Quilted Bomber Jacket', 'description' => 'Lightweight quilted bomber with ribbed cuffs and a clean zip front. A transitional essential.', 'price' => 225.00, 'sku' => 'OUT-BMB-02', 'category' => 'Outerwear', 'gender' => 'men', 'size' => 'M', 'color' => 'Forest', 'stock' => 35],
            ['name' => 'Raw Denim Trucker', 'description' => 'Classic trucker jacket in rigid 14oz denim. Built to develop a unique patina over years of wear.', 'price' => 185.00, 'sku' => 'OUT-TRK-03', 'category' => 'Outerwear', 'gender' => 'unisex', 'size' => 'M', 'color' => 'Raw Blue', 'stock' => 40],

            ['name' => 'Minimalist Leather Sneakers', 'description' => 'Full-grain Italian leather sneakers with a hand-stitched sole. Clean lines, zero compromise.', 'price' => 245.00, 'sku' => 'SHO-SNK-01', 'category' => 'Shoes', 'gender' => 'unisex', 'size' => '42', 'color' => 'White', 'stock' => 50],
            ['name' => 'Suede Chelsea Boots', 'description' => 'Water-resistant suede Chelsea boots with a Goodyear-welted sole. Effortless pull-on style.', 'price' => 295.00, 'sku' => 'SHO-CHE-02', 'category' => 'Shoes', 'gender' => 'men', 'size' => '43', 'color' => 'Tobacco', 'stock' => 25],

            ['name' => 'Cashmere Beanie', 'description' => 'Pure Mongolian cashmere ribbed beanie. Lightweight warmth in a timeless silhouette.', 'price' => 75.00, 'sku' => 'ACC-BNE-01', 'category' => 'Accessories', 'gender' => 'unisex', 'size' => 'OS', 'color' => 'Heather Grey', 'stock' => 100],
            ['name' => 'Heritage Leather Belt', 'description' => 'Vegetable-tanned leather belt with a solid brass buckle. Handcrafted to last decades.', 'price' => 95.00, 'sku' => 'ACC-BLT-02', 'category' => 'Accessories', 'gender' => 'men', 'size' => 'OS', 'color' => 'Cognac', 'stock' => 80],
            ['name' => 'Weekender Duffle', 'description' => 'Canvas and leather weekender bag with a waterproof lining. Your perfect travel companion.', 'price' => 198.00, 'sku' => 'ACC-DFL-03', 'category' => 'Accessories', 'gender' => 'unisex', 'size' => 'OS', 'color' => 'Olive', 'stock' => 22],
            
            // Adding more women-specific items to balance things out
            ['name' => 'Silk Slip Dress', 'description' => '100% mulberry silk slip dress with a delicate cowl neck.', 'price' => 145.00, 'sku' => 'DRS-SLK-01', 'category' => 'Dresses', 'gender' => 'women', 'size' => 'S', 'color' => 'Champagne', 'stock' => 45],
            ['name' => 'High-Waist Wide Leg Trousers', 'description' => 'Elegant high-waisted trousers with a sophisticated wide leg.', 'price' => 120.00, 'sku' => 'PNT-WDE-04', 'category' => 'Pants', 'gender' => 'women', 'size' => 'M', 'color' => 'Cream', 'stock' => 38],
            ['name' => 'Cashmere Cardigan', 'description' => 'Soft cashmere cardigan with a cropped silhouette.', 'price' => 180.00, 'sku' => 'SKW-CSH-01', 'category' => 'Knitwear', 'gender' => 'women', 'size' => 'M', 'color' => 'Beige', 'stock' => 22],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
