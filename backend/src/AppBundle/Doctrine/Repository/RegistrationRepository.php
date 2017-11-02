<?php

namespace AppBundle\Doctrine\Repository;

/**
 * Class RegistrationRepository
 */
class RegistrationRepository extends CRUDRepository
{
    /**
     * @param mixed $parentId
     * @return mixed
     */
    public function findByParentId($parentId)
    {
        $registrations = $this->createQueryBuilder('r')
                              ->select('r')
                              ->innerJoin('r.lecture', 'l')
                              ->where('l.id = :lectureId')
                              ->setParameter('lectureId', $parentId)
                              ->getQuery()->getResult();

        return $registrations;
    }
}
