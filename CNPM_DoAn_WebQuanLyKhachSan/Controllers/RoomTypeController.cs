using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class RoomTypeController : Controller
    {
        public IActionResult Index()
        {
            ViewData["PapeTitle"] = "Loại phòng";
            return View();
        }
    }
}
