using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Numerics;
using System.Reflection;

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
				ViewBag.staffs = dBHelper.GetStaffByUserName(searchString);
			else
				ViewBag.staffs = dBHelper.GetStaff();
			return View();
		}

        public IActionResult Create()
        {
			ViewData["PapeTitle"] = "Staff";
			return Json("dsdf");
        }
		[HttpPost]
		public IActionResult Create(StaffVM staffVM)
		{
			Staff staff = new Staff()
			{
				StaffId = staffVM.StaffId,
				PositionId = staffVM.PositionId,
				Name = staffVM.Name,
				Gender = staffVM.Gender,
				Birthday = staffVM.Birthday,
				Phone = staffVM.Phone,
				Address = staffVM.Address,
				Email = staffVM.Email,
				Username = staffVM.Username,
				Status = staffVM.Status,
				Password = staffVM.Password,
			};

			dBHelper.InsertStaff(staff);
			return RedirectToAction("Index");
		}
		public IActionResult Delete(string staffUserName)
		{
			Staff staff = dBHelper.GetStaffByUserName(staffUserName);
			return Json(staff);
		}

		[HttpPost]
		public IActionResult DeleteByUserName(string staffUserName)
		{
			dBHelper.DeleteStaff(staffUserName);
			return RedirectToAction("Index");
		}
		[HttpGet]
		public IActionResult Details(string staffUserName)
		{
			Staff staff = dBHelper.GetStaffByUserName(staffUserName);
			return Json(staff);
		}
		[HttpPost]
		public IActionResult DetailsByUserName(string staffUserName)
		{
			dBHelper.DetailsStaff(staffUserName);
			return RedirectToAction("Index");
		}

		[HttpGet]
		public IActionResult EditByUserName(string staffUserName)
		{
			Staff staff = dBHelper.GetStaffByUserName(staffUserName);
			return Json(staff);
		}
		[HttpPost]
		public IActionResult EditByUserName(StaffVM staffVM)
		{
			Staff staff = new Staff()
			{
				StaffId = staffVM.StaffId,
				PositionId = staffVM.PositionId,
				Name = staffVM.Name,
				Gender = staffVM.Gender,
				Birthday = staffVM.Birthday,
				Phone = staffVM.Phone,
				Address = staffVM.Address,
				Email = staffVM.Email,
				Username = staffVM.Username,
				Status = staffVM.Status,
				Password = staffVM.Password,
			};

			dBHelper.EditStaff(staff);
			return RedirectToAction("Index");
		}
	}
}
