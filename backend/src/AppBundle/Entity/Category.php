<?php

namespace AppBundle\Entity;

/**
 * Category
 */
class Category implements CRUDEntityInterface
{
    use CRUDEntityTrait {
        unserializeEntity as protected baseUnserialize;
    }

    /**
     * @var integer
     */
    private $id;

    /**
     * @var string
     */
    private $title;

    /**
     * @var string
     */
    private $description;

    /**
     * @var \DateTime
     */
    private $created;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $lectures;

    /**
     * @var Event
     */
    private $event;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->lectures = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Category
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Category
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Category
     */
    public function setCreated($created)
    {
        $this->created = $created;

        return $this;
    }

    /**
     * Get created
     *
     * @return \DateTime
     */
    public function getCreated()
    {
        return $this->created;
    }

    /**
     * Add lecture
     *
     * @param Lecture $lecture
     *
     * @return Category
     */
    public function addLecture(Lecture $lecture)
    {
        $this->lectures[] = $lecture;

        return $this;
    }

    /**
     * Remove lecture
     *
     * @param Lecture $lecture
     */
    public function removeLecture(Lecture $lecture)
    {
        $this->lectures->removeElement($lecture);
    }

    /**
     * Get lectures
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLectures()
    {
        return $this->lectures;
    }

    /**
     * Set event
     *
     * @param Event $event
     *
     * @return Category
     */
    public function setEvent(Event $event = null)
    {
        $this->event = $event;

        return $this;
    }

    /**
     * Get event
     *
     * @return Event
     */
    public function getEvent()
    {
        return $this->event;
    }

    /**
     * @inh
     */
    public function dump()
    {
        $data = [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'created'     => $this->created->format('Y-m-d H:i:s'),
            'event'       => $this->event->dump(),
        ];

        return $data;
    }

    /**
     * @inheritdoc
     */
    public function unserializeEntity($data)
    {
        unset($data['eventId']);
        $this->baseUnserialize($data);
    }
}
