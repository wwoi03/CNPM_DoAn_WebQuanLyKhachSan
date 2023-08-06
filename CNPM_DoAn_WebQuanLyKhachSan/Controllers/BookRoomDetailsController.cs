using CNPM_DoAn_WebQuanLyKhachSan.Models;
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
            dBHelper.CheckIn()
        }
       
       
    }
}
