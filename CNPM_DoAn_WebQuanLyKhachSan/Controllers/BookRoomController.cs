using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class BookRoomController : Controller
    {
        public IActionResult Index()
        {
            ViewData["PapeTitle"] = "Đặt Phòng";
            return View();
        }

        public IActionResult Create()
        {
            ViewData["PapeTitle"] = "Đặt Phòng";
            return Json("fsdfs");
        }

        [HttpPost]
        public IActionResult Create(BookRoomVM bookRoomVM,  string listRoomString, string nameCustomer, string phoneCustomer, string CardId, DateTime checkInDate, DateTime checkOutDate)
        {
            ViewData["PapeTitle"] = "Đặt Phòng";
            string[] listRoomNum = listRoomString.Split(',');



            return RedirectToAction("Index");
        }
    }
}
