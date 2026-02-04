<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260203110307 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE team_characters (id INT AUTO_INCREMENT NOT NULL, position INT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE battle DROP INDEX UNIQ_13991734C0990423, ADD INDEX IDX_13991734C0990423 (player1_id)');
        $this->addSql('ALTER TABLE battle DROP INDEX UNIQ_13991734D22CABCD, ADD INDEX IDX_13991734D22CABCD (player2_id)');
        $this->addSql('ALTER TABLE battle ADD team_id INT DEFAULT NULL, ADD team2_id INT DEFAULT NULL, CHANGE player1_id player1_id INT DEFAULT NULL, CHANGE player2_id player2_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734C0990423 FOREIGN KEY (player1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734D22CABCD FOREIGN KEY (player2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734296CD8AE FOREIGN KEY (team_id) REFERENCES team (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734F59E604A FOREIGN KEY (team2_id) REFERENCES team (id)');
        $this->addSql('CREATE INDEX IDX_13991734296CD8AE ON battle (team_id)');
        $this->addSql('CREATE INDEX IDX_13991734F59E604A ON battle (team2_id)');
        $this->addSql('ALTER TABLE `character` ADD team_characters_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE `character` ADD CONSTRAINT FK_937AB034B26D2BB9 FOREIGN KEY (team_characters_id) REFERENCES team_characters (id)');
        $this->addSql('CREATE INDEX IDX_937AB034B26D2BB9 ON `character` (team_characters_id)');
        $this->addSql('ALTER TABLE team ADD name VARCHAR(255) NOT NULL, ADD team_characters_id INT DEFAULT NULL, CHANGE user_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FB26D2BB9 FOREIGN KEY (team_characters_id) REFERENCES team_characters (id)');
        $this->addSql('CREATE INDEX IDX_C4E0A61FB26D2BB9 ON team (team_characters_id)');
        $this->addSql('ALTER TABLE user ADD username VARCHAR(255) NOT NULL, ADD email VARCHAR(255) NOT NULL, ADD password VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE team_characters');
        $this->addSql('ALTER TABLE battle DROP INDEX IDX_13991734C0990423, ADD UNIQUE INDEX UNIQ_13991734C0990423 (player1_id)');
        $this->addSql('ALTER TABLE battle DROP INDEX IDX_13991734D22CABCD, ADD UNIQUE INDEX UNIQ_13991734D22CABCD (player2_id)');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734C0990423');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734D22CABCD');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734296CD8AE');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734F59E604A');
        $this->addSql('DROP INDEX IDX_13991734296CD8AE ON battle');
        $this->addSql('DROP INDEX IDX_13991734F59E604A ON battle');
        $this->addSql('ALTER TABLE battle DROP team_id, DROP team2_id, CHANGE player1_id player1_id INT NOT NULL, CHANGE player2_id player2_id INT NOT NULL');
        $this->addSql('ALTER TABLE `character` DROP FOREIGN KEY FK_937AB034B26D2BB9');
        $this->addSql('DROP INDEX IDX_937AB034B26D2BB9 ON `character`');
        $this->addSql('ALTER TABLE `character` DROP team_characters_id');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FA76ED395');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FB26D2BB9');
        $this->addSql('DROP INDEX IDX_C4E0A61FB26D2BB9 ON team');
        $this->addSql('ALTER TABLE team DROP name, DROP team_characters_id, CHANGE user_id user_id INT NOT NULL');
        $this->addSql('ALTER TABLE user DROP username, DROP email, DROP password');
    }
}
