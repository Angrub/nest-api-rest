import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstAuthVersion1686180033471 implements MigrationInterface {
    name = 'FirstAuthVersion1686180033471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`permissions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`method\` enum ('GET', 'POST', 'PUT', 'DELETE') NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`views\` (\`id\` int NOT NULL AUTO_INCREMENT, \`menu\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`rolname\` varchar(255) NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(50) NOT NULL, \`lastname\` varchar(50) NULL, \`phone\` varchar(50) NULL, \`deleted\` tinyint NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`google_id\` varchar(255) NULL, \`facebook_id\` varchar(255) NULL, \`password\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, \`role_id\` int NULL, UNIQUE INDEX \`REL_c7bc1ffb56c570f42053fa7503\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`verification_code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(8) NOT NULL, \`expiration_date\` datetime NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_20dc9f8d86616620881be14083\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_permissions\` (\`role_id\` int NOT NULL, \`permission_id\` int NOT NULL, INDEX \`IDX_7d2dad9f14eddeb09c256fea71\` (\`role_id\`), INDEX \`IDX_337aa8dba227a1fe6b73998307\` (\`permission_id\`), PRIMARY KEY (\`role_id\`, \`permission_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles_views\` (\`role_id\` int NOT NULL, \`view_id\` int NOT NULL, INDEX \`IDX_ef2bafe825964f581d45c8b5a2\` (\`role_id\`), INDEX \`IDX_1f92ab4874c976141025b50b92\` (\`view_id\`), PRIMARY KEY (\`role_id\`, \`view_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c7bc1ffb56c570f42053fa7503b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`verification_code\` ADD CONSTRAINT \`FK_20dc9f8d86616620881be140833\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD CONSTRAINT \`FK_7d2dad9f14eddeb09c256fea719\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` ADD CONSTRAINT \`FK_337aa8dba227a1fe6b73998307b\` FOREIGN KEY (\`permission_id\`) REFERENCES \`permissions\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_views\` ADD CONSTRAINT \`FK_ef2bafe825964f581d45c8b5a2b\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`roles_views\` ADD CONSTRAINT \`FK_1f92ab4874c976141025b50b92b\` FOREIGN KEY (\`view_id\`) REFERENCES \`views\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`roles_views\` DROP FOREIGN KEY \`FK_1f92ab4874c976141025b50b92b\``);
        await queryRunner.query(`ALTER TABLE \`roles_views\` DROP FOREIGN KEY \`FK_ef2bafe825964f581d45c8b5a2b\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_337aa8dba227a1fe6b73998307b\``);
        await queryRunner.query(`ALTER TABLE \`roles_permissions\` DROP FOREIGN KEY \`FK_7d2dad9f14eddeb09c256fea719\``);
        await queryRunner.query(`ALTER TABLE \`verification_code\` DROP FOREIGN KEY \`FK_20dc9f8d86616620881be140833\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c7bc1ffb56c570f42053fa7503b\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f92ab4874c976141025b50b92\` ON \`roles_views\``);
        await queryRunner.query(`DROP INDEX \`IDX_ef2bafe825964f581d45c8b5a2\` ON \`roles_views\``);
        await queryRunner.query(`DROP TABLE \`roles_views\``);
        await queryRunner.query(`DROP INDEX \`IDX_337aa8dba227a1fe6b73998307\` ON \`roles_permissions\``);
        await queryRunner.query(`DROP INDEX \`IDX_7d2dad9f14eddeb09c256fea71\` ON \`roles_permissions\``);
        await queryRunner.query(`DROP TABLE \`roles_permissions\``);
        await queryRunner.query(`DROP INDEX \`REL_20dc9f8d86616620881be14083\` ON \`verification_code\``);
        await queryRunner.query(`DROP TABLE \`verification_code\``);
        await queryRunner.query(`DROP INDEX \`REL_c7bc1ffb56c570f42053fa7503\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`views\``);
        await queryRunner.query(`DROP TABLE \`permissions\``);
    }

}
