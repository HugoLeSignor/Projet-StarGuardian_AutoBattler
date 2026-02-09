<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Ajout du champ is_searching_match dans la table user
 */
final class Version20260209141500 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Ajout du champ is_searching_match pour savoir si un utilisateur est en recherche de match';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user ADD is_searching_match TINYINT(1) DEFAULT 0 NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user DROP is_searching_match');
    }
}
