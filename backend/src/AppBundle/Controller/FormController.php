<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\FormRepository;
use AppBundle\Entity\Form;

/**
 * Class FormController
 */
class FormController extends AbstractCRUDControllerController
{
    const TYPE = 'form';

    /**
     * @return FormRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Form::class);
    }
}
