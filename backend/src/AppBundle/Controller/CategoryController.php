<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\CategoryRepository;
use AppBundle\Entity\Category;
use AppBundle\Entity\Event;
use AppBundle\Entity\Lecture;
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

    /**
     * @param Category $object
     * @return boolean
     */
    protected function isOwner($object)
    {
        $isOwner = true;

        $user = $this->getUser();
        $owner = $object->getEvent()->getOwner();

        if ($user->getId() != $owner->getId()) {
            $isOwner = false;
        }

        return $isOwner;
    }

    /**
     * @param JsonResponse $response
     */
    protected function getObjectsList($response)
    {
        $response->setStatusCode(400);
    }

    /**
     * @param Category     $object
     * @param string       $sublist
     * @param JsonResponse $response
     */
    protected function getSublist($object, $sublist, $response)
    {
        if ($sublist == 'lectures') {
            $objects = array_map(
                function ($object) {
                    /** @var Lecture $object */
                    return $object->dump();
                },
                $object->getLectures()->toArray()
            );

            $response->setData($objects);
        } else {
            $response->setStatusCode(400);
        }
    }

    /**
     * @param Category $object
     * @param array  $data
     */
    protected function setRelations($object, $data)
    {
        if (isset($data['eventId'])) {
            $event = $this->getDoctrine()->getRepository(Event::class)->find($data['eventId']);
            $object->setEvent($event);
        }
    }
}
