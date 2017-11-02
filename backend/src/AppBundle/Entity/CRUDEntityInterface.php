<?php

namespace AppBundle\Entity;

/**
 * Interface CRUDEntityInterface
 */
interface CRUDEntityInterface
{
    /**
     * @return int
     */
    public function getId();

    /**
     * @param \Datetime $created
     *
     * @return CRUDEntityInterface
     */
    public function setCreated($created);

    /**
     * @return array
     */
    public function dump();

    /**
     * Unserializes an object
     * @param array $data
     * @return
     */
    public function unserializeEntity($data);
}
