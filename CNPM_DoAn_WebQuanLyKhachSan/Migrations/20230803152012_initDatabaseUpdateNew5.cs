using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CNPM_DoAn_WebQuanLyKhachSan.Migrations
{
    /// <inheritdoc />
    public partial class initDatabaseUpdateNew5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Menus_MenuTypes_MenuTypeId",
                table: "Menus");

            migrationBuilder.DropIndex(
                name: "IX_Menus_MenuTypeId",
                table: "Menus");

            migrationBuilder.DropColumn(
                name: "MenuTypeId",
                table: "Menus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "MenuTypeId",
                table: "Menus",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Menus_MenuTypeId",
                table: "Menus",
                column: "MenuTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Menus_MenuTypes_MenuTypeId",
                table: "Menus",
                column: "MenuTypeId",
                principalTable: "MenuTypes",
                principalColumn: "MenuTypeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
