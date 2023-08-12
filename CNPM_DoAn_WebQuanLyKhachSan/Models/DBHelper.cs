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
        // M: lấy danh sách phòng
        public List<Room> GetRooms()
        {
            return dbContext.Rooms.Include(p => p.RoomType).ToList();
        }
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

        // M: cập nhật phòng
        public void UpdateRoom(Room room)
        {
            dbContext.Rooms.Update(room);
            dbContext.SaveChanges();
        }

        public List<Room> GetRoom()
        { //aben
            return dbContext.Rooms.OrderByDescending(p => p.RoomId).Include(p => p.RoomType).ToList();
        }

        // M: Thêm  phòng
        public void InsertRoom(Room newRoom)
        {
            dbContext.Rooms.Add(newRoom);
            dbContext.SaveChanges();
        }


        // M: xóa phòng
        public void DeleteRoom(int roomId)
        {
            dbContext.Rooms.Remove(GetRoomById(roomId));
            dbContext.SaveChanges();
        }

        // chi tiết phòng
        public void DetailsRoom(int roomId)
        {
            dbContext.SaveChanges();
        }

        // chỉnh sửa phòng
        public void EditRoom(Room room)
        {
            dbContext.Rooms.Update(room);
            dbContext.SaveChanges();
        }

        /* ------------------------------------- RoomType ------------------------------------- */
        // M: Lấy danh sách sản phẩm
        public List<RoomType> GetRoomType()
        {
            return dbContext.RoomTypes.OrderByDescending(p => p.RoomTypeId).ToList();
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

        public List<RoomType> SearchRoomtype(String searchString)
        {
            return dbContext.RoomTypes.Where(p => p.Name.Contains(searchString)).OrderByDescending(p => p.RoomTypeId).ToList();
        }


        /* ------------------------------------- Customer ------------------------------------- */
        // M: Lấy khách hàng
        public Customer GetCustomerById(int? cardId)
        {
            return dbContext.Customers.FirstOrDefault(p => p.CardId == cardId); 
        }

        // M: Thêm khách hàng
        public void CreateCustomer(Customer newCustomer)
        {
            dbContext.Customers.Add(newCustomer);
            dbContext.SaveChanges();
        }

        // M: Xóa khách hàng
        public void DeleteCustomer(int? customerId)
        {
            dbContext.Customers.Remove(GetCustomerById(customerId));
            dbContext.SaveChanges();
        }

        /* ------------------------------------- BookRoomDetails ------------------------------------- */
        public BookRoomDetails GetBookRoomDetailsById(int bookRoomId)
        {
            return dbContext.BookRoomDetails.Include(p => p.Room).Include(p => p.BookRoom).FirstOrDefault(p => p.BookRoomDetailsId == bookRoomId);
        }
        // M: Thêm mới chi tiết đặt phòng
        public void CreateBookRoomDetails(BookRoomDetails newBookRoomDetails)
        {
            dbContext.BookRoomDetails.Add(newBookRoomDetails);
            dbContext.SaveChanges();
        }

        // M: Thêm mới chi tiết đặt phòng
        public void UpdateBookRoomDetails(BookRoomDetails newBookRoomDetails)
        {
            dbContext.BookRoomDetails.Update(newBookRoomDetails);
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

        // M: Xóa BookRoomDetails
        public void DeleteBookRoomDetails(BookRoomDetails deleteBookRoomDetails)
        {
            dbContext.BookRoomDetails.Remove(deleteBookRoomDetails);
            dbContext.SaveChanges();
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

        // M: Thêm mới Đặt phòng
        public void UpdateBookRoom(BookRoom newBookRoom)
        {
            dbContext.BookRooms.Update(newBookRoom);
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
        //
       


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
        public void DetailsMenu(int menuId)
        {
            dbContext.SaveChanges();
        }
        public void EditMenu(Menu menu)
        {
            dbContext.Menus.Update(menu);
            dbContext.SaveChanges();
        }
        // M: Tìm kiếm sản phẩm
        public List<Menu> SearchMenu(String searchString)
        {
            return dbContext.Menus.Where(p => p.Name.Contains(searchString)).OrderByDescending(p => p.MenuId).ToList();
        }


        /* ------------------------------------- Staff ------------------------------------- */
        public Staff GetStaffByUsername(string username)
        {
            return dbContext.Staffs.Where(p => p.Username == username).FirstOrDefault();
        }

        // M: Lấy danh sách nhân viên
        public List<Staff> GetStaffs()
        {
            return dbContext.Staffs.Include(p => p.Position).OrderByDescending(p => p.StaffId).ToList();
        }

        // M: Lấy dánh sách nhân viên theo tên
        public List<Staff> GetStaffByName(string searchString)
        {
            return dbContext.Staffs.Where(p => p.Name.Contains(searchString)).Include(p => p.Position).OrderByDescending(p => p.StaffId).ToList();
        }

        //-----------------------------------Position-------------------------------------------//
        public List<Position> GetPosition()
        { //aben
            return dbContext.Positions.OrderByDescending(p => p.PositionId).ToList();
        }

        // M: Lấy chức vụ theo Id
        public Position GetPositionById(int positionId)
        {
            return dbContext.Positions.FirstOrDefault(p => p.PositionId == positionId);

        }
        // M: Thêm  chức vụ
        public void InsertPosition(Position newPosition)
        {
            dbContext.Positions.Add(newPosition);
            dbContext.SaveChanges();
        }


        // M: xóa chuc vu
        public void DeletePosition(int positionId)
        {
            dbContext.Positions.Remove(GetPositionById(positionId));
            dbContext.SaveChanges();
        }

        // chi tiết chuc vu
        public void DetailsPosition(int positionId)
        {
            dbContext.SaveChanges();
        }

        // chỉnh sửa phòng
        public void EditPostion(Position position)
        {
            dbContext.Positions.Update(position);
            dbContext.SaveChanges();
        }

        /* ------------------------------------- History ------------------------------------- */
        //M: lay danh sach lich su
        public List<Bill> GetBills()
        {
            return dbContext.Bills.ToList();
        }
        public void EditHistory(Bill history)
        {
            dbContext.Bills.Update(history);
            dbContext.SaveChanges();
        }
        public Bill GetBillByID(int id)
        {
            return dbContext.Bills.FirstOrDefault(p => p.BillId == id);
        }
        public void DeleteHistory(int id)
        {
            dbContext.Bills.Remove(GetBillByID(id));
            dbContext.SaveChanges();
        }

        public List<BookRoomDetails> GetBookRoomDetails()
        {
            return dbContext.BookRoomDetails.Include(p => p.Room).Include(p => p.BookRoom).ToList();
        }
        public BookRoom GetBookRoomByID(int id)
        {
            return dbContext.BookRooms.Include(p => p.Customer).Where(p => p.BookRoomId == id).FirstOrDefault();

        }
        public void EditBill(Bill bill)
        {
            dbContext.Bills.Update(bill);
            dbContext.SaveChanges();
        }
        public void EditBookRoomDetail(BookRoomDetails bookRoomDetails)
        {
            dbContext.BookRoomDetails.Update(bookRoomDetails);
            dbContext.SaveChanges();
        }
        public void EditCustomer(Customer customer)
        {
            dbContext.Customers.Update(customer);
            dbContext.SaveChanges();
        }

        public void InsertBill(Bill bill)
        {
            dbContext.Bills.Add(bill);
            dbContext.SaveChanges();
        }
    }
}
