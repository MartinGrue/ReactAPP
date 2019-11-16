using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddedFollowerFollowings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FollowerFollowings",
                columns: table => new
                {
                    UserAId = table.Column<string>(nullable: false),
                    UserBId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FollowerFollowings", x => new { x.UserAId, x.UserBId });
                    table.ForeignKey(
                        name: "FK_FollowerFollowings_AspNetUsers_UserAId",
                        column: x => x.UserAId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FollowerFollowings_AspNetUsers_UserBId",
                        column: x => x.UserBId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FollowerFollowings_UserBId",
                table: "FollowerFollowings",
                column: "UserBId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FollowerFollowings");
        }
    }
}
