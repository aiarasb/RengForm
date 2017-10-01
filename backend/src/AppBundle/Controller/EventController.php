<?php

namespace AppBundle\Controller;

use AppBundle\Doctrine\Repository\EventRepository;
use AppBundle\Entity\Event;

/**
 * Class EventController
 */
class EventController extends AbstractCRUDControllerController
{
    const TYPE = 'event';
    /**
     * @return EventRepository
     */
    protected function getRepository()
    {
        return $this->getDoctrine()->getRepository(Event::class);
    }
}
