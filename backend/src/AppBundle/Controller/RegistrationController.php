<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\RegistrationRepository;
use AppBundle\Entity\Registration;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class RegistrationController
 */
class RegistrationController extends AbstractCRUDControllerController
{
    const TYPE = 'registration';

    /**
     * @return RegistrationRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Registration::class);
    }

    /**
     * @param Registration $object
     * @return boolean
     */
    protected function isOwner($object)
    {
        $isOwner = true;

        $user = $this->getUser();
        $owner = $object->getLecture()->getCategory()->getEvent()->getOwner();

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
     * @param object       $object
     * @param string       $sublist
     * @param JsonResponse $response
     */
    protected function getSublist($object, $sublist, $response)
    {
        $response->setStatusCode(400);
    }
}
