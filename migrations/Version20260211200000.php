<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260211200000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create ability table for unique character abilities';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE ability (id INT AUTO_INCREMENT NOT NULL, character_id INT NOT NULL, name VARCHAR(100) NOT NULL, description VARCHAR(500) NOT NULL, type VARCHAR(50) NOT NULL, parameters JSON NOT NULL, cooldown INT NOT NULL, UNIQUE INDEX UNIQ_46B015951136BE75 (character_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE ability ADD CONSTRAINT FK_46B015951136BE75 FOREIGN KEY (character_id) REFERENCES `Character` (id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE ability DROP FOREIGN KEY FK_46B015951136BE75');
        $this->addSql('DROP TABLE ability');
    }
}
