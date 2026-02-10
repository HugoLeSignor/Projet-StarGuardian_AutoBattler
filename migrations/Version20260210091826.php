<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260210091826 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE `Character` (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, dmg_min INT NOT NULL, dmg_max INT NOT NULL, speed INT NOT NULL, dodge INT NOT NULL, crit INT NOT NULL, hp INT NOT NULL, team_characters_id INT DEFAULT NULL, role_id INT DEFAULT NULL, INDEX IDX_118B3297B26D2BB9 (team_characters_id), INDEX IDX_118B3297D60322AC (role_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE arena (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE battle (id INT AUTO_INCREMENT NOT NULL, player1_id INT DEFAULT NULL, player2_id INT DEFAULT NULL, team_id INT DEFAULT NULL, team2_id INT DEFAULT NULL, INDEX IDX_13991734C0990423 (player1_id), INDEX IDX_13991734D22CABCD (player2_id), INDEX IDX_13991734296CD8AE (team_id), INDEX IDX_13991734F59E604A (team2_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE role (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE team (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, user_id INT DEFAULT NULL, team_characters_id INT DEFAULT NULL, INDEX IDX_C4E0A61FA76ED395 (user_id), INDEX IDX_C4E0A61FB26D2BB9 (team_characters_id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE team_characters (id INT AUTO_INCREMENT NOT NULL, position INT NOT NULL, PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, is_searching_match TINYINT DEFAULT 0 NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL, available_at DATETIME NOT NULL, delivered_at DATETIME DEFAULT NULL, INDEX IDX_75EA56E0FB7336F0E3BD61CE16BA31DBBF396750 (queue_name, available_at, delivered_at, id), PRIMARY KEY (id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `Character` ADD CONSTRAINT FK_118B3297B26D2BB9 FOREIGN KEY (team_characters_id) REFERENCES team_characters (id)');
        $this->addSql('ALTER TABLE `Character` ADD CONSTRAINT FK_118B3297D60322AC FOREIGN KEY (role_id) REFERENCES role (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734C0990423 FOREIGN KEY (player1_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734D22CABCD FOREIGN KEY (player2_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734296CD8AE FOREIGN KEY (team_id) REFERENCES team (id)');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734F59E604A FOREIGN KEY (team2_id) REFERENCES team (id)');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE team ADD CONSTRAINT FK_C4E0A61FB26D2BB9 FOREIGN KEY (team_characters_id) REFERENCES team_characters (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE `Character` DROP FOREIGN KEY FK_118B3297B26D2BB9');
        $this->addSql('ALTER TABLE `Character` DROP FOREIGN KEY FK_118B3297D60322AC');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734C0990423');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734D22CABCD');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734296CD8AE');
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734F59E604A');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FA76ED395');
        $this->addSql('ALTER TABLE team DROP FOREIGN KEY FK_C4E0A61FB26D2BB9');
        $this->addSql('DROP TABLE `Character`');
        $this->addSql('DROP TABLE arena');
        $this->addSql('DROP TABLE battle');
        $this->addSql('DROP TABLE role');
        $this->addSql('DROP TABLE team');
        $this->addSql('DROP TABLE team_characters');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
