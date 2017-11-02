<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\FormRepository;
use AppBundle\Entity\Form;
use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class FormController
 */
class FormController extends AbstractCRUDControllerController
{
    const TYPE = 'form';

    /**
     * @return FormRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Form::class);
    }

    /**
     * @param Form $object
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
                /** @var Form $object */
                return $object->dump();
            },
            $this->getRepository()->findByParentId($this->getUser()->getId())
        );

        $response->setData($objects);
    }

    /**
     * @param Form         $object
     * @param string       $sublist
     * @param JsonResponse $response
     */
    protected function getSublist($object, $sublist, $response)
    {
        $response->setStatusCode(400);
    }
}
