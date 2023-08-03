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
        // M: Lấy danh sách phòng
        public List<Room> GetUnusedRoom()
        {
            return dbContext.Rooms.Include(p => p.RoomType).Where(p => p.Status == 0).ToList();
        }

        // M: Lấy phòng theo Id
        public Room GetRoomById(int roomId)
        {
            return dbContext.Rooms.FirstOrDefault(p => p.RoomId == roomId);
        }
		// M: Thêm  phòng
		public void InsertRoom(Room newRoom)
		{
			dbContext.Rooms.Add(newRoom);
			dbContext.SaveChanges();
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

		internal void DeleteRoom(object roomId)
		{
			throw new NotImplementedException();
		}
	}
}
