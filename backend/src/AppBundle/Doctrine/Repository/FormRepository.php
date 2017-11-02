<?php

namespace AppBundle\Doctrine\Repository;

/**
 * Class FormRepository
 */
class FormRepository extends CRUDRepository
{
    /**
     * @param mixed $parentId
     * @return mixed
     */
    public function findByParentId($parentId)
    {
        $forms = $this->createQueryBuilder('f')
                      ->select('f')
                      ->innerJoin('f.owner', 'o')
                      ->where('o.id = :userId')
                      ->setParameter('userId', $parentId)
                      ->getQuery()->getResult();

        return $forms;
    }
}
