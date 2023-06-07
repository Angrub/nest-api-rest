import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomersUsersTables1685751070954 implements MigrationInterface {
    name = 'CustomersUsersTables1685751070954'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(50) NOT NULL, \`lastname\` varchar(50) NOT NULL, \`phone\` varchar(50) NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`password\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`role\` enum ('admin', 'customer') NOT NULL, \`deleted\` tinyint NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`customer_id\` int NULL, UNIQUE INDEX \`REL_c7bc1ffb56c570f42053fa7503\` (\`customer_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_c7bc1ffb56c570f42053fa7503b\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_c7bc1ffb56c570f42053fa7503b\``);
        await queryRunner.query(`DROP INDEX \`REL_c7bc1ffb56c570f42053fa7503\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}
