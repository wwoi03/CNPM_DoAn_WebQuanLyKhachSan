using CNPM_DoAn_WebQuanLyKhachSan.Models;
using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class StaffController : Controller
    {
        DBHelper dBHelper;
        private readonly IWebHostEnvironment _hostEnvironment;

        public StaffController(DatabaseContext context, IWebHostEnvironment hostEnvironment)
        {
            dBHelper = new DBHelper(context);
            _hostEnvironment = hostEnvironment;
        }
        public IActionResult Index(string searchString)
        {
            ViewData["PapeTitle"] = "Tài khoản phụ";
            if (searchString != null && searchString.Length >= 0)
                ViewBag.staffs = dBHelper.GetStaffByName(searchString);
            else
                ViewBag.staffs = dBHelper.GetStaffs();
            return View();
        }

        // M: Tạo nhân viên
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
