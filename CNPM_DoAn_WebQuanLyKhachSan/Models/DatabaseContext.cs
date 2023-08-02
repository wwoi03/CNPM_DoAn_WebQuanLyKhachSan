using Microsoft.EntityFrameworkCore;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class DatabaseContext:DbContext
    {
        public DatabaseContext(DbContextOptions options) : base(options)
        {

        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AssignmentDetails>()
                .HasKey(o => new { o.AssginmentDetailsId, o.StaffID });
            modelBuilder.Entity<MenuOrder>()
                .HasKey(o => new { o.MenuId, o.StaffId, o.BookRoomDetailsId, o.OrderTime });
        }
        
        public DbSet<Assignment> Assignments { get; set; }
        public DbSet<AssignmentDetails> AssignmentDetails { get; set; }
        public DbSet<Bill> Bill { get; set; }
        public DbSet<BookRoom> BookRooms { get; set; }
        public DbSet<BookRoomDetails> BookRoomDetails { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<MenuOrder> MenuOrders { get; set; }
        public DbSet<MenuType> MenuTypes { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<RoomType> RoomTypes { get; set; }
        public DbSet<Staff> Staffs { get; set; }
    }
}
