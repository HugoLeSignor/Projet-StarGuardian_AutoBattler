<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260211190000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add moderation fields to user and message tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE user ADD is_banned TINYINT(1) DEFAULT 0 NOT NULL, ADD ban_reason VARCHAR(500) DEFAULT NULL, ADD banned_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE message ADD is_reported TINYINT(1) DEFAULT 0 NOT NULL, ADD report_reason VARCHAR(255) DEFAULT NULL, ADD reported_by_id INT DEFAULT NULL, ADD reported_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', ADD is_removed TINYINT(1) DEFAULT 0 NOT NULL');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307F5765F4B2 FOREIGN KEY (reported_by_id) REFERENCES user (id) ON DELETE SET NULL');
        $this->addSql('CREATE INDEX IDX_B6BD307F5765F4B2 ON message (reported_by_id)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307F5765F4B2');
        $this->addSql('DROP INDEX IDX_B6BD307F5765F4B2 ON message');
        $this->addSql('ALTER TABLE message DROP is_reported, DROP report_reason, DROP reported_by_id, DROP reported_at, DROP is_removed');
        $this->addSql('ALTER TABLE user DROP is_banned, DROP ban_reason, DROP banned_at');
    }
}
