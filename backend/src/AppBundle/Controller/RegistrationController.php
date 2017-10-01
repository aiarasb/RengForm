<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\RegistrationRepository;
use AppBundle\Entity\Registration;

/**
 * Class RegistrationController
 */
class RegistrationController extends AbstractCRUDControllerController
{
    const TYPE = 'registration';

    /**
     * @return RegistrationRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Registration::class);
    }
}
