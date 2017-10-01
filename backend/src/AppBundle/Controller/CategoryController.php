<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\CategoryRepository;
use AppBundle\Entity\Category;

/**
 * Class CategoryController
 */
class CategoryController extends AbstractCRUDControllerController
{
    const TYPE = 'category';

    /**
     * @return CategoryRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Category::class);
    }
}
