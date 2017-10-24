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
        $response = new JsonResponse();
        $response->setStatusCode(201);

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
                $response->setData($object->dump());
            } else {
                $response->setStatusCode(400);
                $response->setData([
                    'message' => 'Empty request.',
                ]);
            }
        } else {
            $message = sprintf("You can not create %s with client provided ID.", ucfirst(static::TYPE));
            $object = $this->getRepository()->find($id);

            if (null === $object) {
                $response->setStatusCode(404);
                $message .= " " . sprintf('%s not found.', ucfirst(static::TYPE));
            } else {
                $response->setStatusCode(409);
                $message .= " " . sprintf('%s with ID %d already exists.', ucfirst(static::TYPE), $id);
            }

            $response->setData([
                'message' => $message,
                'data'    => ['id' => $id],
            ]);
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
            $rawUsers = array_map(
                function ($object) {
                    /** @var CRUDEntity $object */
                    return $object->dump();
                },
                $this->getRepository()->findAll()
            );

            $response->setData($rawUsers);
        } else {
            $user = $this->getRepository()->find($id);

            if (null !== $user) {
                $response->setData($user->dump());
            } else {
                $response->setStatusCode(404);
                $response->setData([
                    'message' => sprintf('%s not found.', ucfirst(static::TYPE)),
                    'data'    => ['id' => $id],
                ]);
            }
        }

        return $response;
    }

    /**
     * @inheritdoc
     */
    public function updateAction(Request $request, $id)
    {
        return new JsonResponse(['status' => 'updated']);
    }

    /**
     * @inheritdoc
     */
    public function deleteAction(Request $request, $id)
    {
        $response = new JsonResponse();
        $response->setStatusCode(200);

        if (null === $id) {
            $response->setStatusCode(405);
            $response->setData([
                'message' => "You can't delete all collection.",
            ]);
        } else {
            $object = $this->getRepository()->find($id);

            if ($object === null) {
                $response->setStatusCode(404);
                $response->setData([
                    'message' => sprintf('%s not found.', ucfirst(static::TYPE)),
                    'data'    => ['id' => $id],
                ]);
            } else {
                $this->getDoctrine()->getManager()->remove($object);
                $this->getDoctrine()->getManager()->flush();

                $response->setData([
                    'message' => sprintf('%s with ID %d removed.', ucfirst(static::TYPE), $id)
                ]);
            }
        }

        return $response;
    }

    /**
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    abstract protected function getRepository();
}
