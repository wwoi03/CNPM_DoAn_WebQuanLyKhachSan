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

        public IActionResult GetDataIndex()
        {
            List<BookRoom> bookRooms = dBHelper.GetBookRooms();
            return Json(bookRooms);
        }

        public IActionResult Create()
        {
            ViewData["PapeTitle"] = "Đặt Phòng";
            return Json("fsdfs");
        }

        [HttpPost]
        public IActionResult Create(BookRoomVM bookRoomVM,  string listRoomString, string nameCustomer, string phoneCustomer, int cardId)
        {
            ViewData["PapeTitle"] = "Đặt Phòng";
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
                StaffId = 1,
                PrePayment = bookRoomVM.PrePayment,
                Note = bookRoomVM.Note,
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

                BookRoomDetails bookRoomDetails = new BookRoomDetails()
                {
                    BookRoomId = bookRoomId,
                    RoomID = roomId,
                    CheckInDate = bookRoomVM.CheckInDate,
                    CheckOutDate = bookRoomVM.CheckOutDate,
                    StatusRented = 0,
                    Note = "",
                };

                dBHelper.CreateBookRoomDetails(bookRoomDetails);
            }

            return RedirectToAction("Index");
        }
    }
}
