<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\LectureRepository;
use AppBundle\Entity\Lecture;

/**
 * Class LectureController
 */
class LectureController extends AbstractCRUDControllerController
{
    const TYPE = 'lecture';

    /**
     * @return LectureRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Lecture::class);
    }
}
