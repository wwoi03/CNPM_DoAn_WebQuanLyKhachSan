using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class BookRoomController : Controller
    {
        DBHelper dBHelper;
        private readonly IWebHostEnvironment _hostEnvironment;

        public BookRoomController(DatabaseContext context, IWebHostEnvironment hostEnvironment)
        {
            dBHelper = new DBHelper(context);
            _hostEnvironment = hostEnvironment;
        }

        public IActionResult Index()
        {
            ViewData["PapeTitle"] = "Đặt Phòng";
            
            return View();
        }

        // M: Lấy danh sách các phòng đã đặt trả về dạng Json
        public IActionResult GetDataIndex()
        {
            List<BookRoom> _bookRooms = dBHelper.GetBookRooms();
            return Json(_bookRooms);
        }

        // M: Thêm đơn đặt phòng
        public IActionResult Create()
        {
            List<RoomType> _roomTypes = dBHelper.GetRoomType();
            List<Room> _rooms = dBHelper.GetUnusedRoom();

            var data = new
            {
                roomTypes = _roomTypes,
                rooms = _rooms
            };

            return Json(data);
        }

        [HttpPost]
        public IActionResult Create(BookRoomVM bookRoomVM,  string listRoomString, string nameCustomer, string phoneCustomer, int cardId)
        {
            string[] listRoomNum = listRoomString.Split(',');

            // Kiểm tra khách hàng đã có từ trước
            if (dBHelper.GetCustomerById(cardId) == null) // chưa có khách hàng
            {
                // Thêm mới khách hàng
                Customer customer = new Customer()
                {
                    CardId = cardId,
                    Name = nameCustomer,
                    Phone = phoneCustomer,
                };

                dBHelper.CreateCustomer(customer);
            }

            // Tạo đơn đặt phòng
            BookRoom bookRoom = new BookRoom()
            {
                CardId = cardId,
                StaffId = HttpContext.Session.GetInt32("StaffId"),
                PrePayment = bookRoomVM.PrePayment,
                Note = bookRoomVM.Note != null ? bookRoomVM.Note : "",
                CheckOutDate = bookRoomVM.CheckOutDate,
                CheckInDate = bookRoomVM.CheckInDate,
            };
            dBHelper.CreateBookRoom(bookRoom);
            int bookRoomId = dBHelper.GetNewBookRoom().BookRoomId;

            // Tạo các chi tiết đặt phòng
            for (int i = 0; i < listRoomNum.Length; i++)
            {
                int roomId = int.Parse(listRoomNum[i]);
                Room room = dBHelper.GetRoomById(roomId);
                room.Status = 1;

                dBHelper.UpdateRoom(room);

                BookRoomDetails bookRoomDetails = new BookRoomDetails()
                {
                    BookRoomId = bookRoomId,
                    RoomID = roomId,
                    CheckInDate = bookRoomVM.CheckInDate,
                    CheckOutDate = bookRoomVM.CheckOutDate,
                    StatusRented = 0,
                    CheckInPerson = nameCustomer,
                    Note = "",
                };

                dBHelper.CreateBookRoomDetails(bookRoomDetails);
            }

            return RedirectToAction("Index");
        }

        // M: Sửa đơn đặt phòng
        public IActionResult Edit(int bookRoomId)
        {
            BookRoom _bookRoom = dBHelper.GetBookRoomById(bookRoomId);
            List<BookRoomDetails> _bookRoomDetails = dBHelper.GetBookRoomDetailsByBookRoomId(bookRoomId);
            List<RoomType> _roomTypes = dBHelper.GetRoomType();
            List<Room> rooms = dBHelper.GetRooms();

            var data = new
            {
                bookRoom = _bookRoom,
                bookRoomDetails = _bookRoomDetails,
                roomTypes = _roomTypes,
                rooms = rooms
            };

            return Json(data);
        }

        [HttpPost]
        public IActionResult Edit(BookRoomVM bookRoomVM, string listRoomString, string nameCustomer, string phoneCustomer, int cardId)
        {
            string[] listRoomNum = listRoomString.Split(',');

            // Kiểm tra khách hàng đã có từ trước
            if (dBHelper.GetCustomerById(cardId) == null) // chưa có khách hàng
            {
                // Thêm mới khách hàng
                Customer customer = new Customer()
                {
                    CardId = cardId,
                    Name = nameCustomer,
                    Phone = phoneCustomer,
                };

                dBHelper.CreateCustomer(customer);
            }

            // Tạo đơn đặt phòng
            BookRoom bookRoom = new BookRoom()
            {
                BookRoomId = bookRoomVM.BookRoomId,
                CardId = cardId,
                StaffId = HttpContext.Session.GetInt32("StaffId"),
                PrePayment = bookRoomVM.PrePayment,
                Note = bookRoomVM.Note,
                CheckOutDate = bookRoomVM.CheckOutDate,
                CheckInDate = bookRoomVM.CheckInDate,
            };
            dBHelper.UpdateBookRoom(bookRoom);

            DeleteOldRoom(bookRoomVM.BookRoomId);

            // Tạo các chi tiết đặt phòng
            for (int i = 0; i < listRoomNum.Length; i++)
            {
                int roomId = int.Parse(listRoomNum[i]);
                Room room = dBHelper.GetRoomById(roomId);
                room.Status = 1;

                dBHelper.UpdateRoom(room);

                BookRoomDetails bookRoomDetails = new BookRoomDetails()
                {
                    BookRoomId = bookRoomVM.BookRoomId,
                    RoomID = roomId,
                    CheckInDate = bookRoomVM.CheckInDate,
                    CheckOutDate = bookRoomVM.CheckOutDate,
                    StatusRented = 0,
                    CheckInPerson = nameCustomer,
                    Note = "",
                };

                dBHelper.CreateBookRoomDetails(bookRoomDetails);
            }

            return RedirectToAction("Index");
        }

        // M: Xóa đặt phòng
        [HttpPost]
        public IActionResult Delete(int bookRoomId)
        {
            DeleteOldRoom(bookRoomId);
            dBHelper.DeleteBookRoom(bookRoomId);
            //dBHelper.DeleteCustomer(dBHelper.GetBookRoomById(bookRoomId).CardId);

            List<BookRoom> _bookRooms = dBHelper.GetBookRooms();
            return Json(_bookRooms);
        }

        public void DeleteOldRoom(int bookRoomId)
        {
            // Xóa các chi phòng cũ
            List<BookRoomDetails> bookRoomDetailsList = dBHelper.GetBookRoomDetailsByBookRoomId(bookRoomId);
            for (int i = 0; i < bookRoomDetailsList.Count; i++)
            {
                var deleteBookRoomDetails = bookRoomDetailsList[i];
                deleteBookRoomDetails.Room.Status = 0;
                dBHelper.UpdateRoom(deleteBookRoomDetails.Room);
                dBHelper.DeleteBookRoomDetails(deleteBookRoomDetails);
            }
        }
    }
}
