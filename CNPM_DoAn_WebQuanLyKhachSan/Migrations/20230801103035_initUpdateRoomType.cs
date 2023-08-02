using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CNPM_DoAn_WebQuanLyKhachSan.Migrations
{
    /// <inheritdoc />
    public partial class initUpdateRoomType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ListImage",
                table: "RoomTypes",
                newName: "Image");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Image",
                table: "RoomTypes",
                newName: "ListImage");
        }
    }
}
