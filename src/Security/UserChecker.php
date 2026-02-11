<?php

namespace App\Security;

use App\Entity\User;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
use Symfony\Component\Security\Core\User\UserCheckerInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserChecker implements UserCheckerInterface
{
    public function __construct(private TranslatorInterface $translator) {}

    public function checkPreAuth(UserInterface $user): void
    {
        if (!$user instanceof User) {
            return;
        }

        if ($user->isBanned()) {
            $reason = $user->getBanReason() ?? $this->translator->trans('admin.reason_default');
            throw new CustomUserMessageAccountStatusException(
                $this->translator->trans('flash.account_banned', ['%reason%' => $reason])
            );
        }
    }

    public function checkPostAuth(UserInterface $user): void
    {
    }
}
