<?php

namespace AppBundle\Service\Form;

use Symfony\Component\Form\Extension\Core\Type\FormType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormFactory;
use Symfony\Component\Form\FormInterface;

/**
 * Class Builder
 */
class Builder
{
    /**
     * @var FormFactory
     */
    private $formFactory;

    /**
     * Builder constructor.
     * @param FormFactory $formFactory
     */
    public function __construct(FormFactory $formFactory)
    {
        $this->formFactory = $formFactory;
    }

    /**
     * @param $config
     * @return FormInterface
     */
    public function buildForm($config)
    {
        $form = $this->formFactory->createBuilder(FormType::class);

        foreach ($config as $field) {
            $form->add(
                $field['name'],
                $this->getType($field['type']),
                [
                    'label' => $field['title'],
                ]
            );
        }

        return $form->getForm();
    }

    private function getType($type)
    {
        $map = [
            'text'   => TextType::class,
            'number' => NumberType::class,
        ];

        return $map[$type];
    }
}
