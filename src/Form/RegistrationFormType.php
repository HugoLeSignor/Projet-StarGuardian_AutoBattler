<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Regex;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('email', EmailType::class, [
                'label' => 'Email',
                'constraints' => [
                    new NotBlank(['message' => 'Veuillez entrer un email.']),
                    new Email(['message' => 'Email invalide.']),
                ],
            ])
            ->add('username', TextType::class, [
                'label' => 'Nom d\'utilisateur',
                'constraints' => [
                    new NotBlank(['message' => 'Veuillez entrer un nom d\'utilisateur.']),
                    new Length([
                        'min' => 3,
                        'minMessage' => 'Minimum {{ limit }} caracteres.',
                        'max' => 50,
                    ]),
                    new Regex([
                        'pattern' => '/^[a-zA-Z0-9_]+$/',
                        'message' => 'Lettres, chiffres et underscores uniquement.',
                    ]),
                ],
            ])
            ->add('plainPassword', RepeatedType::class, [
                'type' => PasswordType::class,
                'mapped' => false,
                'first_options' => [
                    'label' => 'Mot de passe',
                    'constraints' => [
                        new NotBlank(['message' => 'Veuillez entrer un mot de passe.']),
                        new Length([
                            'min' => 6,
                            'minMessage' => 'Minimum {{ limit }} caracteres.',
                        ]),
                    ],
                ],
                'second_options' => [
                    'label' => 'Confirmer le mot de passe',
                ],
                'invalid_message' => 'Les mots de passe ne correspondent pas.',
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
