using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
	public class AdminController : Controller
	{
        DBHelper dbHelper;

        public AdminController(DatabaseContext context)
        {
            dbHelper = new DBHelper(context);
        }

        // M: Trang login
        public IActionResult Login()
        {
            if (HttpContext.Session.GetString("Username") == null)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Admin");
            }
        }

        [HttpPost]
        public IActionResult Login(StaffVM staffVM)
        {
            if (HttpContext.Session.GetString("Username") == null)
            {
                Staff checkStaff = dbHelper.GetStaffByUserName(staffVM.Username);

                // kiểm tra tên đăng nhập đã có trong hệ thông
                if (checkStaff != null)
                {
                    // Kiểm tra mật khậu
                    if (checkStaff.Password == staffVM.Password)
                    {
                        HttpContext.Session.SetString("Username", checkStaff.Username);
                        HttpContext.Session.SetInt32("StaffId", checkStaff.StaffId);

                        return RedirectToAction("Index", "Admin");
                    }
                    ViewBag.messageError = "Mật khẩu không chính xác!";

                    return View();
                }

                ViewBag.messageError = "Tên đăng nhập hoặc mật khẩu không chính xác!";
            }
            return View();
        }

        public IActionResult Index(string mS)
        {
            ViewData["PapeTitle"] = mS;
            return View();
        }

        public IActionResult SystemManagementPage()
        {
            ViewData["PapeTitle"] = "Quản lý hệ thống";
            return View();
        }
    }
}
