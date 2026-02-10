<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20260210113338 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // Suppression de la clé étrangère sur team2_id avant modification (player1_id déjà supprimée ou inexistante)
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734F59E604A');
        $this->addSql('ALTER TABLE battle ADD created_at DATETIME NOT NULL, ADD match_type VARCHAR(20) NOT NULL, ADD bot_name VARCHAR(255) DEFAULT NULL, ADD winner VARCHAR(50) NOT NULL, ADD combat_logs JSON NOT NULL, ADD team1_id INT NOT NULL, CHANGE player1_id player1_id INT NOT NULL, CHANGE team2_id team2_id INT NOT NULL, CHANGE team_id duration_seconds INT DEFAULT NULL');
        $this->addSql('ALTER TABLE battle ADD CONSTRAINT FK_13991734E72BCFA4 FOREIGN KEY (team1_id) REFERENCES team (id)');
        $this->addSql('CREATE INDEX IDX_13991734E72BCFA4 ON battle (team1_id)');
    }

    public function down(Schema $schema): void
    {
        // Correction : on ne tente pas de supprimer une clé étrangère ou un index qui n'existent pas
        $this->addSql('ALTER TABLE battle DROP FOREIGN KEY FK_13991734E72BCFA4');
        $this->addSql('DROP INDEX IDX_13991734E72BCFA4 ON battle');
        $this->addSql('ALTER TABLE battle DROP created_at, DROP match_type, DROP bot_name, DROP winner, DROP combat_logs, DROP team1_id, CHANGE player1_id player1_id INT DEFAULT NULL, CHANGE team2_id team2_id INT DEFAULT NULL, CHANGE duration_seconds team_id INT DEFAULT NULL');
    }
}
