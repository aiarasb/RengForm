<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\CRUDRepository;
use AppBundle\Entity\CRUDEntityInterface;
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
            try {
                $className = $this->getRepository()->getClassName();
                /** @var CRUDEntityInterface $object */
                $object = new $className();
                $rawData = $request->getContent();
                if ($rawData !== '') {
                    $data = json_decode($rawData, true);
                    $object->unserializeEntity($data);
                    $object->setCreated(new \DateTime());
                    $this->setRelations($object, $data);

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
            } catch (\Exception $e) {
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
    public function readAction(Request $request, $id, $sublist)
    {
        $response = new JsonResponse();
        $response->setStatusCode(200);

        if (null === $id) {
            $this->getObjectsList($response);
        } else {
            $object = $this->getRepository()->find($id);

            if (null !== $object) {
                if ($this->isOwner($object)) {
                    if (null !== $sublist) {
                        $this->getSublist($object, $sublist, $response);
                    } else {
                        $response->setData($object->dump());
                    }
                } else {
                    $response->setStatusCode(401);
                }
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
        $response = new JsonResponse();

        if (null !== $id) {
            /** @var CRUDEntityInterface $object */
            $object = $this->getRepository()->find($id);
            $rawData = $request->getContent();

            if ($object === null) {
                $response->setStatusCode(404);
            } elseif (empty($rawData)) {
                $response->setStatusCode(400);
            } elseif ($this->isOwner($object)) {
                try {
                    $data = json_decode($rawData, true);
                    $object->unserializeEntity($data);
                    $this->setRelations($object, $data);

                    //TODO: validate

                    $this->getDoctrine()->getManager()->merge($object);
                    $this->getDoctrine()->getManager()->flush();
                    $response->setData($object->dump());
                } catch (\Exception $e) {
                    $response->setStatusCode(400);
                }
            } else {
                $response->setStatusCode(401);
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
            /** @var CRUDEntityInterface $object */
            $object = $this->getRepository()->find($id);

            if ($object === null) {
                $response->setStatusCode(404);
            } elseif ($this->isOwner($object)) {
                $this->getDoctrine()->getManager()->remove($object);
                $this->getDoctrine()->getManager()->flush();
            } else {
                $response->setStatusCode(401);
            }
        }

        return $response;
    }

    /**
     * @return CRUDRepository
     */
    abstract protected function getRepository();

    /**
     * @param object $object
     * @return boolean
     */
    abstract protected function isOwner($object);

    /**
     * @param JsonResponse $response
     */
    abstract protected function getObjectsList($response);

    /**
     * @param object       $object
     * @param string       $sublist
     * @param JsonResponse $response
     */
    abstract protected function getSublist($object, $sublist, $response);

    /**
     * @param object $object
     * @param array  $data
     */
    abstract protected function setRelations($object, $data);
}
