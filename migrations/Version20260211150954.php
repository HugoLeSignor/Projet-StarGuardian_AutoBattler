<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260211150954 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE team_preset (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, character_ids JSON NOT NULL, created_at DATETIME NOT NULL, owner_id INT NOT NULL, INDEX IDX_5A44A3EB7E3C61F9 (owner_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE team_preset ADD CONSTRAINT FK_5A44A3EB7E3C61F9 FOREIGN KEY (owner_id) REFERENCES user (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE team_preset DROP FOREIGN KEY FK_5A44A3EB7E3C61F9');
        $this->addSql('DROP TABLE team_preset');
    }
}
