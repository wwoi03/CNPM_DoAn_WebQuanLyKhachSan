using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
	public class MenuController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
		public IActionResult Create()
		{
			ViewData["PapeTitle"] = "Menu";
			return Json("aaa");
		}
		public IActionResult Delete() {
			ViewData["PapeTitle"] = "Delete";
			return Json("aaa");
		}
		public IActionResult Edit()
		{
			ViewData["PapeTitle"] = "Delete";
			return Json("aaa");
		}
	}
}
