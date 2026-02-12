<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260212100000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create unban_request table';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE unban_request (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, message LONGTEXT NOT NULL, status VARCHAR(20) DEFAULT \'pending\' NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', reviewed_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', admin_note VARCHAR(500) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE unban_request');
    }
}
