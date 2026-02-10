<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\File;
use Symfony\Component\Validator\Constraints\Length;

class ProfileFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('bio', TextareaType::class, [
                'label' => 'Description',
                'required' => false,
                'attr' => [
                    'class' => 'auth-form__input auth-form__textarea',
                    'placeholder' => 'Parlez de vous, guerrier...',
                    'rows' => 4,
                    'maxlength' => 500,
                ],
                'label_attr' => ['class' => 'auth-form__label'],
                'constraints' => [
                    new Length(['max' => 500, 'maxMessage' => 'La description ne peut pas depasser {{ limit }} caracteres.']),
                ],
            ])
            ->add('motto', TextType::class, [
                'label' => 'Devise',
                'required' => false,
                'attr' => [
                    'class' => 'auth-form__input',
                    'placeholder' => 'Votre cri de guerre...',
                    'maxlength' => 100,
                ],
                'label_attr' => ['class' => 'auth-form__label'],
                'constraints' => [
                    new Length(['max' => 100, 'maxMessage' => 'La devise ne peut pas depasser {{ limit }} caracteres.']),
                ],
            ])
            ->add('profileImageFile', FileType::class, [
                'label' => 'Avatar',
                'mapped' => false,
                'required' => false,
                'attr' => [
                    'class' => 'auth-form__input auth-form__file',
                    'accept' => 'image/jpeg,image/png,image/webp',
                ],
                'label_attr' => ['class' => 'auth-form__label'],
                'constraints' => [
                    new File([
                        'maxSize' => '2M',
                        'mimeTypes' => ['image/jpeg', 'image/png', 'image/webp'],
                        'mimeTypesMessage' => 'Formats acceptes : JPEG, PNG, WebP (max 2 Mo).',
                    ]),
                ],
            ]);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
