<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\LectureRepository;
use AppBundle\Entity\Lecture;
use AppBundle\Entity\Registration;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class LectureController
 */
class LectureController extends AbstractCRUDControllerController
{
    const TYPE = 'lecture';

    /**
     * @return LectureRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Lecture::class);
    }

    /**
     * @param Lecture $object
     * @return boolean
     */
    protected function isOwner($object)
    {
        $isOwner = true;

        $user = $this->getUser();
        $owner = $object->getCategory()->getEvent()->getOwner();

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
     * @param Lecture       $object
     * @param string       $sublist
     * @param JsonResponse $response
     */
    protected function getSublist($object, $sublist, $response)
    {
        if ($sublist == 'registrations') {
            $objects = array_map(
                function ($object) {
                    /** @var Registration $object */
                    return $object->dump();
                },
                $object->getRegistrations()->toArray()
            );

            $response->setData($objects);
        } else {
            $response->setStatusCode(400);
        }
    }
}
