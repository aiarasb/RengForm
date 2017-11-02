<?php

namespace AppBundle\Doctrine\Repository;

/**
 * Class CRUDRepository
 */
abstract class CRUDRepository extends \Doctrine\ORM\EntityRepository
{
    /**
     * @param mixed $parentId
     * @return mixed
     */
    abstract public function findByParentId($parentId);
}
