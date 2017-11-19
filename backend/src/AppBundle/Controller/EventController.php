<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\EventRepository;
use AppBundle\Entity\Category;
use AppBundle\Entity\Event;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class EventController
 */
class EventController extends AbstractCRUDControllerController
{
    const TYPE = 'event';

    /**
     * @return EventRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Event::class);
    }

    /**
     * @param Event $object
     * @return boolean
     */
    protected function isOwner($object)
    {
        $isOwner = true;

        $user = $this->getUser();
        $owner = $object->getOwner();

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
        $objects = array_map(
            function ($object) {
                /** @var Event $object */
                return $object->dump();
            },
            $this->getRepository()->findAll()//findByParentId($this->getUser()->getId())
        );

        $response->setData($objects);
    }

    /**
     * @param Event        $object
     * @param string       $sublist
     * @param JsonResponse $response
     */
    protected function getSublist($object, $sublist, $response)
    {
        if ($sublist == 'categories') {
            $objects = array_map(
                function ($object) {
                    /** @var Category $object */
                    return $object->dump();
                },
                $object->getCategories()->toArray()
            );

            $response->setData($objects);
        } else {
            $response->setStatusCode(400);
        }
    }

    /**
     * @param Event $object
     * @param array  $data
     */
    protected function setRelations($object, $data)
    {
        $object->setOwner($this->getUser());
    }
}
