<?php

namespace AppBundle\Controller;

use AppBundle\Entity\CRUDEntity;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

/**
 * Class AbstractCRUDController
 */
abstract class AbstractCRUDControllerController extends Controller implements CRUDControllerInterface
{
    const ID_FIELD_NAME = 'id';
    const TYPE = 'undefined';

    /**
     * @inheritdoc
     */
    public function createAction(Request $request, $id)
    {
        $response = new JsonResponse(null, 201);

        if (null === $id) {
            $className = $this->getRepository()->getClassName();
            /** @var CRUDEntity $object */
            $object = new $className();
            $data = $request->getContent();
            if ($data !== '') {
                $object->unserialize($data);
                $object->setCreated(new \DateTime());

                //TODO: validate

                $this->getDoctrine()->getManager()->persist($object);
                $this->getDoctrine()->getManager()->flush();
                $response->headers->set(
                    'Location',
                    $this->generateUrl(static::TYPE . '_read', ['id' => $object->getId()])
                );
            } else {
                $response->setStatusCode(400);
            }
        } else {
            $object = $this->getRepository()->find($id);

            if (null === $object) {
                $response->setStatusCode(404);
            } else {
                $response->setStatusCode(409);
            }
        }

        return $response;
    }

    /**
     * @inheritdoc
     */
    public function readAction(Request $request, $id)
    {
        $response = new JsonResponse();
        $response->setStatusCode(200);

        if (null === $id) {
            $objects = array_map(
                function ($object) {
                    /** @var CRUDEntity $object */
                    return $object->dump();
                },
                $this->getRepository()->findAll()
            );

            $response->setData($objects);
        } else {
            $user = $this->getRepository()->find($id);

            if (null !== $user) {
                $response->setData($user->dump());
            } else {
                $response->setStatusCode(404);
            }
        }

        return $response;
    }

    /**
     * @inheritdoc
     */
    public function updateAction(Request $request, $id)
    {
        $response =  new JsonResponse();

        if (null !== $id) {
            /** @var CRUDEntity $object */
            $object = $this->getRepository()->find($id);
            $data = $request->getContent();

            if ($object === null) {
                $response->setStatusCode(404);
            } elseif (empty($data)) {
                $response->setStatusCode(400);
            } else {
                $object->unserialize($data);

                //TODO: validate

                $this->getDoctrine()->getManager()->merge($object);
                $this->getDoctrine()->getManager()->flush();
            }
        } else {
            $response->setStatusCode(405);
        }

        return $response;
    }

    /**
     * @inheritdoc
     */
    public function deleteAction(Request $request, $id)
    {
        $response = new JsonResponse(null, 204);

        if (null === $id) {
            $response->setStatusCode(405);
        } else {
            /** @var CRUDEntity $object */
            $object = $this->getRepository()->find($id);

            if ($object === null) {
                $response->setStatusCode(404);
            } else {
                $this->getDoctrine()->getManager()->remove($object);
                $this->getDoctrine()->getManager()->flush();
            }
        }

        return $response;
    }

    /**
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    abstract protected function getRepository();
}
