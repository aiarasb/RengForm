<?php

namespace AppBundle\Doctrine\Repository;

/**
 * Class LectureRepository
 */
class LectureRepository extends CRUDRepository
{
    /**
     * @param mixed $parentId
     * @return mixed
     */
    public function findByParentId($parentId)
    {
        $lectures = $this->createQueryBuilder('l')
                         ->select('l')
                         ->innerJoin('l.category', 'c')
                         ->where('c.id = :categoryId')
                         ->setParameter('categoryId', $parentId)
                         ->getQuery()->getResult();

        return $lectures;
    }
}
