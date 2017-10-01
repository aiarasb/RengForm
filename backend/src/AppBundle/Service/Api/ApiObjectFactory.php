<?php

namespace AppBundle\Service\Api;

/**
 * Class ApiObjectFactory
 */
class ApiObjectFactory
{
    /** @var  array */
    private $data;

    /** @var  string */
    private $idFieldName;

    /** @var  string */
    private $type;

    /**
     * ApiObjectFactory constructor.
     * @param array  $data
     * @param string $idFieldName
     * @param string $type
     */
    public function __construct($data, $idFieldName, $type)
    {
        $this->data = $data;
        $this->idFieldName = $idFieldName;
        $this->type = $type;
    }

    /**
     * @param array $data
     */
    public function setData($data)
    {
        $this->data = $data;
    }

    /**
     * @param string $idFieldName
     */
    public function setIdFieldName($idFieldName)
    {
        $this->idFieldName = $idFieldName;
    }

    /**
     * @param string $type
     */
    public function setType($type)
    {
        $this->type = $type;
    }

    /**
     * @return array
     */
    public function getApiObject()
    {
        $apiObject = $this->data;

        foreach ($apiObject as $key => $object) {
            $newObject = [];
            $newObject['id'] = $object[$this->idFieldName];
            $newObject['type'] = $this->type;

            unset($object[$this->idFieldName]);

            $newObject['attributes'] = $object;
            $apiObject[$key] = $newObject;
        }

        return $apiObject;
    }
}
