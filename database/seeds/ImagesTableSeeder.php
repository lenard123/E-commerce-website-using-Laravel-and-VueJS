<?php

use Illuminate\Database\Seeder;
use App\Image;
use App\Conf;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach ($this->getImages() as $image) {
            Image::create($image);
        }
    }

    private function getImages()
    {
        return [
            [
                'id' => Conf::IMAGE_DEFAULT,
                'path' => 'images/default.jpg',
            ],

            [
                'id' => Conf::IMAGE_USER,
                'path' => 'images/user.jpg',
            ],

            [
                'id' => Conf::IMAGE_CATEGORY,
                'path' => 'images/category.jpg',
            ],

            [
                'id' => Conf::IMAGE_SUBCATEGORY,
                'path' => 'images/subcategory.jpg',
            ],

            [
                'id' => Conf::IMAGE_PRODUCT,
                'path' => 'images/product.jpg',
            ],
        ];
    }
}
