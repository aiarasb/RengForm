<?php

namespace AppBundle\Doctrine\Repository;

/**
 * Class EventRepository
 */
class EventRepository extends CRUDRepository
{
    /**
     * @param mixed $parentId
     * @return mixed
     */
    public function findByParentId($parentId)
    {
        $events = $this->createQueryBuilder('e')
                       ->select('e')
                       ->innerJoin('e.owner', 'o')
                       ->where('o.id = :userId')
                       ->setParameter('userId', $parentId)
                       ->getQuery()->getResult();

        return $events;
    }
}
