<?php

namespace AppBundle\Controller;

use AppBundle\Service\Api\ApiObjectFactory;
use AppBundle\Service\Api\JsonApiResponseContent;
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
     * @param Request $request
     * @return JsonResponse
     */
    public function createAction(Request $request)
    {
        return new JsonResponse(['status' => 'created']);
    }

    /**
     * @inheritdoc
     */
    public function readAction(Request $request, $id)
    {
        $response = new JsonApiResponseContent();
        $user = $this->getRepository()->find($id);

        if (null !== $user) {
            $data = $this->transformData(
                $user->serialize(),
                static::ID_FIELD_NAME,
                static::TYPE
            );

            $response->setData($data);
        } else {
            $response->addError(
                sprintf('%s not found', ucfirst(static::TYPE)),
                [
                    'id' => $id
                ]
            );
        }

        return $response->getJsonResponse();
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
        return new JsonResponse(['status' => 'deleted']);
    }

    /**
     * @param array  $data
     * @param string $idFieldName
     * @param string $type
     * @return array
     */
    protected function transformData($data, $idFieldName, $type)
    {
        $apiObjectFactory = new ApiObjectFactory($data, $idFieldName, $type);

        return $apiObjectFactory->getApiObject();
    }

    /**
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    abstract protected function getRepository();
}
