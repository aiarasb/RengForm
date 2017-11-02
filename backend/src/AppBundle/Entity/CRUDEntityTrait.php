<?php

namespace AppBundle\Entity;

/**
 * Trait CRUDEntityTrait
 */
trait CRUDEntityTrait
{
    /**
     * @inheritdoc
     */
    public function unserializeEntity($data)
    {
        foreach ($data as $field => $value) {
            $setter = 'set' . ucfirst($field);
            $this->{$setter}($value);
        }
    }

    /**
     * @return array
     */
    abstract public function dump();
}
