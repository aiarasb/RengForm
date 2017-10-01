<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\UserRepository;
use AppBundle\Entity\User;

/**
 * Class UserController
 */
class UserController extends AbstractCRUDControllerController
{
    const TYPE = 'user';

    /**
     * @return UserRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(User::class);
    }
}
