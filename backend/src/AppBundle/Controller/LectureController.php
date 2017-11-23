<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\LectureRepository;
use AppBundle\Entity\Category;
use AppBundle\Entity\Form;
use AppBundle\Entity\Lecture;
use AppBundle\Entity\Registration;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class LectureController
 */
class LectureController extends AbstractCRUDControllerController
{
    const TYPE = 'lecture';

    /**
     * @param int $id
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function renderFormAction($id)
    {
        /** @var Lecture $lecture */
        $lecture = $this->getRepository()->find($id);

        if (null === $lecture) {
            return new Response('', 404);
        }

        $formEnt = $lecture->getForm();

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
     * @param Lecture      $object
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

    /**
     * @param Lecture $object
     * @param array   $data
     */
    protected function setRelations($object, $data)
    {
        if (isset($data['categoryId'])) {
            $category = $this->getDoctrine()->getRepository(Category::class)->find($data['categoryId']);
            $object->setCategory($category);
        }
        if (isset($data['formId'])) {
            $form = $this->getDoctrine()->getRepository(Form::class)->find($data['formId']);
            $object->setForm($form);
        }
    }
}
