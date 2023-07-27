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
    }
}
