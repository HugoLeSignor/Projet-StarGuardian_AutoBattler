<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260203103425 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE battle ADD player1_id INT NOT NULL, ADD player2_id INT NOT NULL');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734C0990423 FOREIGN KEY (player1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734D22CABCD FOREIGN KEY (player2_id) REFERENCES user (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_13991734C0990423 ON battle (player1_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_13991734D22CABCD ON battle (player2_id)');
        $this->addSql('ALTER TABLE team ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_C4E0A61FA76ED395 ON team (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE user');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734C0990423');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734D22CABCD');
        $this->addSql('DROP INDEX UNIQ_13991734C0990423 ON battle');
        $this->addSql('DROP INDEX UNIQ_13991734D22CABCD ON battle');
        $this->addSql('ALTER TABLE battle DROP player1_id, DROP player2_id');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FA76ED395');
        $this->addSql('DROP INDEX IDX_C4E0A61FA76ED395 ON team');
        $this->addSql('ALTER TABLE team DROP user_id');
    }
}
