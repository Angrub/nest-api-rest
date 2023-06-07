import { MigrationInterface, QueryRunner } from "typeorm";

export class LastnameAndTelephoneNullable1685783607501 implements MigrationInterface {
    name = 'LastnameAndTelephoneNullable1685783607501'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`lastname\` \`lastname\` varchar(50) NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`phone\` \`phone\` varchar(50) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`phone\` \`phone\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`customers\` CHANGE \`lastname\` \`lastname\` varchar(50) NOT NULL`);
    }

}
