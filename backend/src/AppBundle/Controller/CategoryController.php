<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\CategoryRepository;
use AppBundle\Entity\Category;
use Symfony\Component\HttpFoundation\JsonResponse;

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

    public function getAllAction()
    {
        return new JsonResponse(['categories']);
    }
}
