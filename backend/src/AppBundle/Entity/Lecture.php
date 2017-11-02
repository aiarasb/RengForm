<?php

namespace AppBundle\Entity;

/**
 * Lecture
 */
class Lecture implements CRUDEntityInterface
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
     * @var string
     */
    private $place;

    /**
     * @var \DateTime
     */
    private $startTime;

    /**
     * @var \DateTime
     */
    private $endTime;

    /**
     * @var integer
     */
    private $capacity;

    /**
     * @var integer
     */
    private $entries = 0;

    /**
     * @var \DateTime
     */
    private $created;

    /**
     * @var Category
     */
    private $category;

    /**
     * @var Form
     */
    private $form;

    /**
     * @var \Doctrine\Common\Collections\Collection
     */
    private $registrations;

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
     * @return Lecture
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
     * @return Lecture
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
     * Set place
     *
     * @param string $place
     *
     * @return Lecture
     */
    public function setPlace($place)
    {
        $this->place = $place;

        return $this;
    }

    /**
     * Get place
     *
     * @return string
     */
    public function getPlace()
    {
        return $this->place;
    }

    /**
     * Set startTime
     *
     * @param \DateTime $startTime
     *
     * @return Lecture
     */
    public function setStartTime($startTime)
    {
        $this->startTime = $startTime;

        return $this;
    }

    /**
     * Get startTime
     *
     * @return \DateTime
     */
    public function getStartTime()
    {
        return $this->startTime;
    }

    /**
     * Set endTime
     *
     * @param \DateTime $endTime
     *
     * @return Lecture
     */
    public function setEndTime($endTime)
    {
        $this->endTime = $endTime;

        return $this;
    }

    /**
     * Get endTime
     *
     * @return \DateTime
     */
    public function getEndTime()
    {
        return $this->endTime;
    }

    /**
     * Set capacity
     *
     * @param integer $capacity
     *
     * @return Lecture
     */
    public function setCapacity($capacity)
    {
        $this->capacity = $capacity;

        return $this;
    }

    /**
     * Get capacity
     *
     * @return integer
     */
    public function getCapacity()
    {
        return $this->capacity;
    }

    /**
     * Set entries
     *
     * @param integer $entries
     *
     * @return Lecture
     */
    public function setEntries($entries)
    {
        $this->entries = $entries;

        return $this;
    }

    /**
     * Get entries
     *
     * @return integer
     */
    public function getEntries()
    {
        return $this->entries;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Lecture
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
     * Set category
     *
     * @param Category $category
     *
     * @return Lecture
     */
    public function setCategory(Category $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return Category
     */
    public function getCategory()
    {
        return $this->category;
    }

    /**
     * Set form
     *
     * @param Form $form
     *
     * @return Lecture
     */
    public function setForm(Form $form = null)
    {
        $this->form = $form;

        return $this;
    }

    /**
     * Get form
     *
     * @return Form
     */
    public function getForm()
    {
        return $this->form;
    }

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->registrations = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add registration
     *
     * @param \AppBundle\Entity\Registration $registration
     *
     * @return Lecture
     */
    public function addRegistration(\AppBundle\Entity\Registration $registration)
    {
        $this->registrations[] = $registration;

        return $this;
    }

    /**
     * Remove registration
     *
     * @param \AppBundle\Entity\Registration $registration
     */
    public function removeRegistration(\AppBundle\Entity\Registration $registration)
    {
        $this->registrations->removeElement($registration);
    }

    /**
     * Get registrations
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getRegistrations()
    {
        return $this->registrations;
    }

    /**
     * @return array
     */
    public function dump()
    {
        $data = [
            'id'          => $this->id,
            'title'       => $this->title,
            'description' => $this->description,
            'place'       => $this->place,
            'startTime'   => $this->startTime->format('H:i:s'),
            'endTime'     => $this->endTime->format('H:i:s'),
            'capacity'    => $this->capacity,
            'entries'     => $this->entries,
            'created'     => $this->created->format('Y-m-d H:i:s'),
        ];

        return $data;
    }

    /**
     * @inheritdoc
     */
    public function unserializeEntity($data)
    {
        unset($data['categoryId']);
        unset($data['formId']);
        $this->baseUnserialize($data);

        $this->startTime = new \DateTime($this->startTime);
        $this->endTime = new \DateTime($this->endTime);
    }
}
