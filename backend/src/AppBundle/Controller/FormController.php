<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\FormRepository;
use AppBundle\Entity\Form;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class FormController
 */
class FormController extends AbstractCRUDControllerController
{
    const TYPE = 'form';

    /**
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function renderAction($id)
    {
        /** @var Form $formEnt */
        $formEnt = $this->getRepository()->find($id);

        if (null === $formEnt) {
            return new Response('', 404);
        }

        /** @var FormInterface $form */
        $form = $this->get('AppBundle\Service\Form\Builder')->buildForm($formEnt->getConfig());

        return $this->render(
            '@App/form.html.twig',
            [
                'form' => $form->createView(),
            ]
        );
    }

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

    /**
     * @param Form  $object
     * @param array $data
     */
    protected function setRelations($object, $data)
    {
        $object->setOwner($this->getUser());
    }
}
