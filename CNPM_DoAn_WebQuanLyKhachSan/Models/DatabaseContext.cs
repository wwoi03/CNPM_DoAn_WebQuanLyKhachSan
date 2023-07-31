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
        
        public DbSet<Assignment> Assignment { get; set; }
        public DbSet<AssignmentDetails> AssignmentDetails { get; set; }
        public DbSet<Bill> Bill { get; set; }
        public DbSet<BookRoom> BookRooms { get; set; }
        public DbSet<BookRoomDetails    > BookRoomDetails { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Menu> Menu { get; set; }
        public DbSet<MenuOrder> MenuOrder { get; set; }
        public DbSet<MenuType> MenuType { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<Position> Position { get; set; }
        public DbSet<Room> Room { get; set; }
        public DbSet<RoomType> RoomType { get; set; }
        public DbSet<Staff> Staff { get; set; }
    }
}
