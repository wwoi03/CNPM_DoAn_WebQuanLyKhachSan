using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class DBHelper
    {
        DatabaseContext dbContext;

        public DBHelper(DatabaseContext _dbContext)
        {
            this.dbContext = _dbContext;
        }

        /* ------------------------------------- Room ------------------------------------- */
        // M: Lấy danh sách phòng chưa đặt
        public List<Room> GetUnusedRoom()
        {
            return dbContext.Rooms.Include(p => p.RoomType).Where(p => p.Status == 0).ToList();
        }

        // M: Lấy phòng theo Id
        public Room GetRoomById(int roomId)
        {
            return dbContext.Rooms.FirstOrDefault(p => p.RoomId == roomId);
        }


        /* ------------------------------------- RoomType ------------------------------------- */
        // M: Lấy danh sách sản phẩm
        public List<RoomType> GetRoomType()
        {
            return  dbContext.RoomTypes.OrderByDescending(p => p.RoomTypeId).ToList();
        }

        // M: Lấy loại phòng theo id
        public RoomType GetRoomTypeById(int roomTypeId)
        {
            return dbContext.RoomTypes.FirstOrDefault(p => p.RoomTypeId == roomTypeId);
        }

        // M: Thêm loại phòng
        public void InsertRoomType(RoomType newRoomType)
        {
            dbContext.RoomTypes.Add(newRoomType);
            dbContext.SaveChanges();
        }
		public void DetailsRoomType(int roomTypeId)
		{
			dbContext.SaveChanges();
		}
		public void EditRoomType(RoomType roomType)
		{
			dbContext.RoomTypes.Update(roomType);
			dbContext.SaveChanges();
		}

		// M: Thêm loại phòng
		public void DeleteRoomType(int roomTypeId)
        {
            dbContext.RoomTypes.Remove(GetRoomTypeById(roomTypeId));
            dbContext.SaveChanges();
        }

        /* ------------------------------------- Customer ------------------------------------- */
        // M: Lấy khách hàng
        public Customer GetCustomerById(int cardId)
        {
            return dbContext.Customers.FirstOrDefault(p => p.CardId == cardId); 
        }

        // M: Thêm khách hàng
        public void CreateCustomer(Customer newCustomer)
        {
            dbContext.Customers.Add(newCustomer);
            dbContext.SaveChanges();
        }

        /* ------------------------------------- BookRoomDetails ------------------------------------- */
        // M: Thêm mới chi tiết đặt phòng
        public void CreateBookRoomDetails(BookRoomDetails newBookRoomDetails)
        {
            dbContext.BookRoomDetails.Add(newBookRoomDetails);
            dbContext.SaveChanges();
        }

        // M: Lấy thông tin đặt phòng mới nhất
        public BookRoom GetNewBookRoom()
        {
            return dbContext.BookRooms.OrderByDescending(p => p.BookRoomId).FirstOrDefault();
        }

        // M: Lấy danh sách BookRoomDetails theo BookRoomId
        public List<BookRoomDetails> GetBookRoomDetailsByBookRoomId(int bookRoomId)
        {
            List<BookRoomDetails> bookRoomDetailsList = dbContext.BookRoomDetails.Include(p => p.Room).Include(p => p.BookRoom).Where(p => p.BookRoomId == bookRoomId).ToList();
            return bookRoomDetailsList;
        }

        /* ------------------------------------- BookRoom ------------------------------------- */
        // M: Lấy danh sách đặt phòng
        public List<BookRoom> GetBookRooms()
        {
            return dbContext.BookRooms.Include(p => p.Staff).Include(p => p.Customer).ToList();
        }

        // M: Thêm mới Đặt phòng
        public void CreateBookRoom(BookRoom newBookRoom)
        {
            dbContext.BookRooms.Add(newBookRoom);
            dbContext.SaveChanges();
        }

        // M: Xóa đặt phòng
        public void DeleteBookRoom(int bookRoomId)
        {
            dbContext.BookRooms.Remove(GetBookRoomById(bookRoomId));
            dbContext.SaveChanges();
        }

        // M: Lấy BookRoom theo id
        public BookRoom GetBookRoomById(int bookRoomId)
        {
            return dbContext.BookRooms.Include(p => p.Staff).Include(p => p.Customer).FirstOrDefault(p => p.BookRoomId == bookRoomId);
        }

        /* ------------------------------------- Menu ------------------------------------- */
        public Menu GetMenuById(int menuId)
        {
            return dbContext.Menus.FirstOrDefault(p => p.MenuId == menuId);
        }
        public List<Menu> GetMenus()
        {

            return dbContext.Menus.OrderByDescending(p => p.MenuId).ToList();
        }
        public void InsertMenu(Menu newMenu)
        {
            dbContext.Menus.Add(newMenu);
            dbContext.SaveChanges();
        }
		public void DeleteMenu(int menuId)
		{
			dbContext.Menus.Remove(GetMenuById(menuId));
			dbContext.SaveChanges();
		}
		public void DetailsMenu(int menuid)
		{
            dbContext.SaveChanges();
		}
        public void EditMenu(Menu menu)
        {
            dbContext.Menus.Update(menu);
            dbContext.SaveChanges();
        }
	}
}
