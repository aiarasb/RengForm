<?php

namespace AppBundle\Service\Api;

use Symfony\Component\HttpFoundation\JsonResponse;

/**
 * Class JsonApiResponseContent
 */
class JsonApiResponseContent
{
    /** @var array */
    private $errors = [];

    /** @var array */
    private $data = [];

    /** @var int */
    private $errorStatusCode = 400;

    /** @var int */
    private $successStatusCode = 200;

    /**
     * JsonApiResponseContent constructor.
     * @param int $successStatusCode
     */
    public function __construct($successStatusCode = 200)
    {
        $this->successStatusCode = $successStatusCode;
    }

    /**
     * @return array
     */
    public function getErrors()
    {
        return $this->errors;
    }

    /**
     * @param array $errors
     */
    public function setErrors($errors)
    {
        $this->errors = $errors;
    }

    /**
     * @param string      $title
     * @param string|null $detail
     * @param int         $statusCode
     */
    public function addError($title, $detail = null, $statusCode = 400)
    {
        $this->errorStatusCode = $statusCode;

        $error = [
            'title' => $title
        ];

        if (null !== $detail) {
            $error['detail'] = $detail;
        }

        $this->errors[] = $error;
    }

    /**
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * @param array $data
     */
    public function setData($data)
    {
        $this->data = $data;
    }

    /**
     * @return JsonResponse
     */
    public function getJsonResponse()
    {
        $response = new JsonResponse();

        if (count($this->errors) > 0) {
            $response->setStatusCode($this->errorStatusCode);
            $response->setData(
                [
                    'errors' => $this->errors
                ]
            );
        } else {
            $response->setStatusCode($this->successStatusCode);
            $response->setData(
                [
                    'data' => $this->data
                ]
            );
        }

        return $response;
    }
}
