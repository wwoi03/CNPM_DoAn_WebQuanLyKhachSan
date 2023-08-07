using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class BookRoomDetailsController : Controller
    {
        DBHelper dBHelper;
        private readonly IWebHostEnvironment _hostEnvironment;
        public BookRoomDetailsController(DatabaseContext context, IWebHostEnvironment hostEnvironment)
        {
            dBHelper = new DBHelper(context);
            _hostEnvironment = hostEnvironment;
        }
        public IActionResult Index()
        {
            ViewBag.RoomType = dBHelper.GetRoomType();
            ViewBag.BookRoom = dBHelper.GetBookRoomDetails();
            return View();
        }
      
        // M: Hiển thị phòng cần dọn
        [HttpGet]
        public IActionResult CleanRoom()
        {
            return Json(dBHelper.GetBookRoomDetails());
        }

        // Phòng cần dọn
        public IActionResult GetClearRoom(int id)
        {
            Room room = dBHelper.GetRoomById(id);
            room.CleanRoom = 2;
            dBHelper.UpdateRoom(room);
            return RedirectToAction("Index");
        }

        // Trả về phòng dọn
        public IActionResult GetClearRoomSucess(int id)
        {
            Room room = dBHelper.GetRoomById(id);
            room.CleanRoom = 0;
            dBHelper.EditRoom(room);
            return RedirectToAction("Index");
        }

        // Nhận phòng
        public IActionResult CheckIn(int bookRoomDetailsId)
        {
            BookRoomDetails bookRoomDetails = dBHelper.GetBookRoomDetailsById(bookRoomDetailsId);
            bookRoomDetails.Room.Status = 2; 
            dBHelper.UpdateBookRoomDetails(bookRoomDetails);
            dBHelper.UpdateRoom(bookRoomDetails.Room);
            return RedirectToAction("Index");
        }
        public IActionResult CheckOut(int bookRoomDetailsId)
        {
            BookRoomDetails bookRoomDetails = dBHelper.GetBookRoomDetailsById(bookRoomDetailsId);

            return Json(bookRoomDetails);
        }
        public IActionResult Delete(int id)
        {
            BookRoomDetails bookRoomDetails1 = dBHelper.GetBookRoomDetailsById(id);
            dBHelper.DeleteBookRoomDetails(bookRoomDetails1);
            return RedirectToAction("Index");
        }
        [HttpGet]
        public IActionResult GetCheckOut(int bookRoomDetailsId)
        {
            
            BookRoomDetails _bookRoom = dBHelper.GetBookRoomDetailsById(bookRoomDetailsId);
            Customer _customer = dBHelper.GetCustomerById(_bookRoom.BookRoom.CardId);
            var data = new
            {
                bookRoom = _bookRoom,
                customer = _customer,
            };
            return Json(data);

        }

        [HttpPost]
        public IActionResult PostCheckOut(int bookRoomDetailsId)
        {

            BookRoomDetails _bookRoom = dBHelper.GetBookRoomDetailsById(bookRoomDetailsId);
            _bookRoom.StatusRented = 2;
            dBHelper.UpdateBookRoomDetails(_bookRoom);

            Customer _customer = dBHelper.GetCustomerById(_bookRoom.BookRoom.CardId);
            Bill bill = new Bill()
            {
                BillId = bookRoomDetailsId,
                PriceRoom = _bookRoom.Room.RoomType.Price,
                TotalPriceMenu=0,
                TotalPriceBill=0,           
                Note="0",
            };
            
            dBHelper.InsertBill(bill);

            return RedirectToAction("Index");

        }
    }
}
