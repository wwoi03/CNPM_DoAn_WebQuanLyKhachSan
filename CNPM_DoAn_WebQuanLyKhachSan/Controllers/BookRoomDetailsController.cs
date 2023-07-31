using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class BookRoomDetailsController : Controller
    {
        public IActionResult Index()
        {
            ViewData["PapeTitle"] = "Thuê Trả Phòng";
            return View();
        }
    }
}
