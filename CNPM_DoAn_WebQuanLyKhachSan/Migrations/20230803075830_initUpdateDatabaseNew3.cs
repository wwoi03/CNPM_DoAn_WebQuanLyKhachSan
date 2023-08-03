using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CNPM_DoAn_WebQuanLyKhachSan.Migrations
{
    /// <inheritdoc />
    public partial class initUpdateDatabaseNew3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "StaffId",
                table: "BookRooms",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "CardId",
                table: "BookRooms",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckInDate",
                table: "BookRooms",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckOutDate",
                table: "BookRooms",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_BookRooms_CardId",
                table: "BookRooms",
                column: "CardId");

            migrationBuilder.CreateIndex(
                name: "IX_BookRooms_StaffId",
                table: "BookRooms",
                column: "StaffId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookRooms_Customers_CardId",
                table: "BookRooms",
                column: "CardId",
                principalTable: "Customers",
                principalColumn: "CardId");

            migrationBuilder.AddForeignKey(
                name: "FK_BookRooms_Staffs_StaffId",
                table: "BookRooms",
                column: "StaffId",
                principalTable: "Staffs",
                principalColumn: "StaffId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BookRooms_Customers_CardId",
                table: "BookRooms");

            migrationBuilder.DropForeignKey(
                name: "FK_BookRooms_Staffs_StaffId",
                table: "BookRooms");

            migrationBuilder.DropIndex(
                name: "IX_BookRooms_CardId",
                table: "BookRooms");

            migrationBuilder.DropIndex(
                name: "IX_BookRooms_StaffId",
                table: "BookRooms");

            migrationBuilder.DropColumn(
                name: "CheckInDate",
                table: "BookRooms");

            migrationBuilder.DropColumn(
                name: "CheckOutDate",
                table: "BookRooms");

            migrationBuilder.AlterColumn<int>(
                name: "StaffId",
                table: "BookRooms",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "CardId",
                table: "BookRooms",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
