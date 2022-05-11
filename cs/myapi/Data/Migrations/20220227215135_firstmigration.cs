using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace myapi.Data.Migrations
{
    public partial class firstmigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PostRelations",
                columns: table => new
                {
                    PostId = table.Column<Guid>(type: "uuid", nullable: false),
                    ParentId = table.Column<Guid>(type: "uuid", nullable: false),
                    ChildId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostRelations", x => x.PostId);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    PostId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "character varying(100000)", maxLength: 100000, nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.PostId);
                });

            migrationBuilder.InsertData(
                table: "PostRelations",
                columns: new[] { "PostId", "ChildId", "ParentId" },
                values: new object[,]
                {
                    { new Guid("1437d980-79e9-40ab-b25a-680cad04e174"), new Guid("b85a0821-b0d9-478c-8cad-27dc9291ad9f"), new Guid("02774989-0e37-4a21-9d96-d239dbb3820f") },
                    { new Guid("a3b8bb70-de38-4727-a394-ff6dd9583d01"), new Guid("87af72af-1f1b-4ba1-848f-b8b154add88d"), new Guid("02774989-0e37-4a21-9d96-d239dbb3820f") }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "Content", "CreatedOn", "Title" },
                values: new object[,]
                {
                    { new Guid("02774989-0e37-4a21-9d96-d239dbb3820f"), "content 0", new DateTime(2022, 2, 27, 21, 51, 34, 881, DateTimeKind.Utc).AddTicks(150), "post 0" },
                    { new Guid("87af72af-1f1b-4ba1-848f-b8b154add88d"), "content 2", new DateTime(2022, 2, 27, 21, 51, 34, 881, DateTimeKind.Utc).AddTicks(250), "post 2" },
                    { new Guid("b85a0821-b0d9-478c-8cad-27dc9291ad9f"), "content 1", new DateTime(2022, 2, 27, 21, 51, 34, 881, DateTimeKind.Utc).AddTicks(200), "post 1" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostRelations");

            migrationBuilder.DropTable(
                name: "Posts");
        }
    }
}
