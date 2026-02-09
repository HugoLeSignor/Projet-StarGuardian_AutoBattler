<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260209085148 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734C0990423 FOREIGN KEY (player1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734D22CABCD FOREIGN KEY (player2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734296CD8AE FOREIGN KEY (team_id) REFERENCES team (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734F59E604A FOREIGN KEY (team2_id) REFERENCES team (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB034B26D2BB9 FOREIGN KEY (team_characters_id) REFERENCES team_characters (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB034D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FB26D2BB9 FOREIGN KEY (team_characters_id) REFERENCES team_characters (id)');
        // Suppression de l'ajout redondant de la colonne roles et de l'index email
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734C0990423');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734D22CABCD');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734296CD8AE');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734F59E604A');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB034B26D2BB9');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB034D60322AC');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FA76ED395');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FB26D2BB9');
        // Suppression du drop redondant de la colonne roles et de l'index email
    }
}
