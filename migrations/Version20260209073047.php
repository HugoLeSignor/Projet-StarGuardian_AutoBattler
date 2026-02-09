<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260209073047 extends AbstractMigration
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
        $this->addSql('ALTER TABLE `character` ADD dmg_min INT NOT NULL, ADD dmg_max INT NOT NULL, ADD speed INT NOT NULL, ADD dodge INT NOT NULL, ADD crit INT NOT NULL, ADD hp INT NOT NULL, DROP healt, DROP attack, DROP defense');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB034B26D2BB9 FOREIGN KEY (team_characters_id) REFERENCES team_characters (id)');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB034D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FB26D2BB9 FOREIGN KEY (team_characters_id) REFERENCES team_characters (id)');
        $this->addSql('ALTER TABLE user ADD roles JSON NOT NULL, CHANGE email email VARCHAR(180) NOT NULL');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON user (email)');
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
        $this->addSql('ALTER TABLE `character` ADD healt INT NOT NULL, ADD attack INT NOT NULL, ADD defense INT NOT NULL, DROP dmg_min, DROP dmg_max, DROP speed, DROP dodge, DROP crit, DROP hp');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FA76ED395');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FB26D2BB9');
        $this->addSql('DROP INDEX UNIQ_8D93D649E7927C74 ON user');
        $this->addSql('ALTER TABLE user DROP roles, CHANGE email email VARCHAR(255) NOT NULL');
    }
}
