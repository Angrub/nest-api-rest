import { MigrationInterface, QueryRunner } from "typeorm";

export class VerificationCodeTableAndUserChages1685758801580 implements MigrationInterface {
    name = 'VerificationCodeTableAndUserChages1685758801580'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`verification_code\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(8) NOT NULL, \`expiration_date\` datetime NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_20dc9f8d86616620881be14083\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`google_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`facebook_id\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)`);
        await queryRunner.query(`ALTER TABLE \`verification_code\` ADD CONSTRAINT \`FK_20dc9f8d86616620881be140833\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`verification_code\` DROP FOREIGN KEY \`FK_20dc9f8d86616620881be140833\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\``);
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`password\` \`password\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`facebook_id\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`google_id\``);
        await queryRunner.query(`DROP INDEX \`REL_20dc9f8d86616620881be14083\` ON \`verification_code\``);
        await queryRunner.query(`DROP TABLE \`verification_code\``);
    }

}
