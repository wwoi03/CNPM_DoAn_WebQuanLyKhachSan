using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using System.Globalization;

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
            ViewBag.openAddBookRoom = true;
            ViewData["PapeTitle"] = "Đặt Phòng";
            
            return View();
        }

        // M: Lấy danh sách các phòng đã đặt trả về dạng Json
        public IActionResult GetDataIndex()
        {
            ViewBag.openAddBookRoom = true;
            List<BookRoom> _bookRooms = dBHelper.GetBookRooms();
            return Json(_bookRooms);
        }

        // M: Thêm đơn đặt phòng
        public IActionResult Create()
        {
            ViewBag.openAddBookRoom = true;
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
            ViewBag.openAddBookRoom = true;
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
            CreateBookRoom(bookRoomVM, cardId);

            // Tạo các chi tiết đặt phòng
            int bookRoomId = dBHelper.GetNewBookRoom().BookRoomId;

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
            ViewBag.openAddBookRoom = true;
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
            ViewBag.openAddBookRoom = true;
            string[] listRoomNum = listRoomString.Split(',');

            // Kiểm tra khách hàng đã có từ trước
            

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
            ViewBag.openAddBookRoom = true;
            DeleteOldRoom(bookRoomId);
            dBHelper.DeleteBookRoom(bookRoomId);
            //dBHelper.DeleteCustomer(dBHelper.GetBookRoomById(bookRoomId).CardId);

            List<BookRoom> _bookRooms = dBHelper.GetBookRooms();
            return Json(_bookRooms);
        }

        // Xóa phòng cũ của khách hàng
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

        // Kiểm tra khách hàng đã tồn tại
        public void CheckExistsCustomerById() { 
        }

        // M: Tạo đơn đặt phòng
        public void CreateBookRoom(BookRoomVM bookRoomVM, int cardId)
        {
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
        }

        // M: Thêm đặt phòng bằng File Excel
        [HttpPost]
        public IActionResult ImportFileExcel(IFormFile excelFile)
        {
            // tạo và quản lý một MemoryStream, một luồng bộ nhớ trong .NET.
            using (var stream = new MemoryStream())
            {
                excelFile.CopyTo(stream);

                // Thiết lập LicenseContext cho thư viện EPPlus
                ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

                using (var package = new ExcelPackage(stream))
                {
                    ExcelWorksheet worksheet = package.Workbook.Worksheets[0];
                    int rowCount = worksheet.Dimension.Rows;

                    // Duyệt dữ liệu từng dòng
                    for (int row = 2; row <= rowCount; row++) // Bắt đầu từ dòng thứ 2
                    {
                        // Lấy dữ liệu từng cột trong excel
                        string nameCustomer = worksheet.Cells[row, 1].Value.ToString() ?? string.Empty;
                        string phoneCustomer = worksheet.Cells[row, 2].Value.ToString() ?? string.Empty;
                        int cardId = int.Parse(worksheet.Cells[row, 3].Value.ToString() ?? string.Empty);
                        DateTime checkInDate = DateTime.ParseExact(worksheet.Cells[row, 4].Value.ToString() ?? string.Empty, "MM/dd/yyyy HH:mm", CultureInfo.InvariantCulture);
                        DateTime checkOutDate = DateTime.ParseExact(worksheet.Cells[row, 5].Value.ToString() ?? string.Empty, "MM/dd/yyyy HH:mm", CultureInfo.InvariantCulture);
                        double prepayment = double.Parse(worksheet.Cells[row, 6].Value.ToString() ?? string.Empty);
                        string note = worksheet.Cells[row, 7].Value?.ToString() ?? string.Empty;
                        string[] rooms = (worksheet.Cells[row, 8].Value.ToString() ?? string.Empty).Split('-');

                        // Kiểm tra khách hàng đã có từ trước
                        if (dBHelper.GetCustomerById(cardId) == null) // chưa có khách hàng
                        {
                            // Thêm mới khách hàng
                            Customer customer = new Customer()
                            {
                                CardId = cardId,
                                Name = nameCustomer,
                                Phone = phoneCustomer
                            };

                            dBHelper.CreateCustomer(customer);
                        }

                        BookRoom bookRoom = new BookRoom()
                        {
                            CardId = cardId,
                            StaffId = HttpContext.Session.GetInt32("StaffId"),
                            PrePayment = prepayment,
                            Note = note != null ? note : "",
                            CheckOutDate = checkOutDate,
                            CheckInDate = checkInDate,
                        };
                        dBHelper.CreateBookRoom(bookRoom);

                        // Tạo các chi tiết đặt phòng
                        int bookRoomId = dBHelper.GetNewBookRoom().BookRoomId;

                        for (int i = 0; i < rooms.Length; i++)
                        {
                            int roomId = int.Parse(rooms[i]);
                            Room room = dBHelper.GetRoomById(roomId);
                            room.Status = 1;

                            dBHelper.UpdateRoom(room);

                            BookRoomDetails bookRoomDetails = new BookRoomDetails()
                            {
                                BookRoomId = bookRoomId,
                                RoomID = roomId,
                                CheckInDate = checkInDate,
                                CheckOutDate = checkOutDate,
                                StatusRented = 0,
                                CheckInPerson = nameCustomer,
                                Note = "",
                            };

                            dBHelper.CreateBookRoomDetails(bookRoomDetails);
                        }
                    }

                }

            }
            return RedirectToAction("Index");
        }
    }
}
