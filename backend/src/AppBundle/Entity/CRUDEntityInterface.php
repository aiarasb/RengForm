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
     * @return string
     */
    public function serialize();

    /**
     * Unserializes an object
     * @param string $rawData
     * @return
     */
    public function unserialize($rawData);
}
