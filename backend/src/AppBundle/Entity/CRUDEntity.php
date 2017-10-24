<?php

namespace AppBundle\Entity;

/**
 * Class CRUDEntity
 */
abstract class CRUDEntity implements CRUDEntityInterface
{
    /**
     * @inheritdoc
     */
    public function serialize()
    {
        $dump = $this->dump();
        $data = json_encode($dump);

        return $data;
    }

    /**
     * @inheritdoc
     */
    public function unserialize($rawData)
    {
        $data = json_decode($rawData, true);

        foreach ($data as $field => $value) {
            $setter = 'set' . ucfirst($field);
            $this->{$setter}($value);
        }
    }
}
