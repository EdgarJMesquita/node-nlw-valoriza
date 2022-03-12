import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCompliments1645754385695 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "compliments",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "user_sender",
            type: "int",
          },
          {
            name: "user_receiver",
            type: "int",
          },
          {
            name: "tag_id",
            type: "int",
          },
          {
            name: "message",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUserSenderCompliments",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_sender"],
            //onDelete: "SET NULL",
            //onUpdate: "SET NULL",
          },
          {
            name: "FKUserReceiverCompliments",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_receiver"],
            //onDelete: "SET NULL",
            //onUpdate: "SET NULL",
          },
          {
            name: "FKTagCompliments",
            referencedTableName: "tags",
            referencedColumnNames: ["id"],
            columnNames: ["tag_id"],
            //onDelete: "SET NULL",
            //onUpdate: "SET NULL",
          },
        ],
      })
    );
    /* await queryRunner.createForeignKey(
      "compliments",
      new TableForeignKey({
        name: "FKUserSenderCompliments",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_sender"],
        onDelete: "SET NULL",
        onUpdate: "SET NULL",
      })
    ); */
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("compliments");
  }
}
