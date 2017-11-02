<?php

namespace AppBundle\Doctrine\Repository;

/**
 * Class CategoryRepository
 */
class CategoryRepository extends CRUDRepository
{
    /**
     * @param mixed $parentId
     * @return mixed
     */
    public function findByParentId($parentId)
    {
        $categories = $this->createQueryBuilder('c')
                           ->select('c')
                           ->innerJoin('c.event', 'e')
                           ->where('e.id = :eventId')
                           ->setParameter('eventId', $parentId)
                           ->getQuery()->getResult();

        return $categories;
    }
}
