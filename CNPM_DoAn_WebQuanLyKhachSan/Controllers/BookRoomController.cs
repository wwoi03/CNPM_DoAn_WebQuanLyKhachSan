using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class BookRoomController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
