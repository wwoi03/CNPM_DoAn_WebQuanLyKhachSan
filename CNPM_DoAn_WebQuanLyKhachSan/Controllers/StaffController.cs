using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class StaffController : Controller
    {
        public IActionResult Index()
        {
            ViewData["PapeTitle"] = "Tài khoản phụ";
            return View();
        }

        public IActionResult Create()
        {
            return Json("dsdf");
        }

        public IActionResult Edit()
        {
            return Json("dsdf");
        }

        public IActionResult Details()
        {
            return Json("dsfffdf");
        }
    }
}
