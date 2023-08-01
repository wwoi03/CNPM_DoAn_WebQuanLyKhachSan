using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
	public class AdminController : Controller
	{
        public IActionResult Index(string mS)
        {
            ViewData["PapeTitle"] = mS;
            return View();
        }

        public IActionResult WaitRoom()
        {
            return View();
        }

        public IActionResult SystemManagementPage()
        {
            ViewData["PapeTitle"] = "Quản lý hệ thống";
            return View();
        }
    }
}
