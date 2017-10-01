<?php

namespace AppBundle\Entity;

/**
 * Registration
 */
class Registration implements CRUDEntityInterface
{
    /**
     * @var integer
     */
    private $id;

    /**
     * @var array
     */
    private $data;

    /**
     * @var \DateTime
     */
    private $created;

    /**
     * @var Lecture
     */
    private $lecture;

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
     * Set data
     *
     * @param array $data
     *
     * @return Registration
     */
    public function setData($data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Get data
     *
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set created
     *
     * @param \DateTime $created
     *
     * @return Registration
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
     * Set lecture
     *
     * @param Lecture $lecture
     *
     * @return Registration
     */
    public function setLecture(Lecture $lecture = null)
    {
        $this->lecture = $lecture;

        return $this;
    }

    /**
     * Get lecture
     *
     * @return Lecture
     */
    public function getLecture()
    {
        return $this->lecture;
    }

    /**
     * @return array
     */
    public function serialize()
    {
        $data = [
            'id'      => $this->id,
            'data'    => $this->data,
            'created' => $this->created->format('Y-m-d H:i:s'),
        ];

        return $data;
    }
}
