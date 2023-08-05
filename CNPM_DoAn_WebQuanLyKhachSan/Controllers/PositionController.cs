using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using CNPM_DoAn_WebQuanLyKhachSan.Models;
using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
	public class PositionController : Controller
	{
		DBHelper dBHelper;
		private readonly IWebHostEnvironment _hostEnvironment;
		public PositionController(DatabaseContext context, IWebHostEnvironment hostEnvironment)
		{
			dBHelper = new DBHelper(context);
			_hostEnvironment = hostEnvironment;
		}
		public IActionResult Index()
		{
			ViewData["PapeTitle"] = "Vị trí";
			ViewBag.position = dBHelper.GetPosition();
			return View();
		}
		// M: Thêm vị trí
		public IActionResult Create()
		{
			ViewData["PapeTitle"] = "Vị trí";
			return Json("aaa");
		}
		[HttpPost]
		public IActionResult Create(PositionVM positionVM)
		{
			Position position = new Position()
			{
				PositionId = positionVM.PositionId,
				Name = positionVM.Name,
				CoefficientsSalary = positionVM.CoefficientsSalary,
				BonusCoefficient = positionVM.BonusCoefficient,
			};

			dBHelper.InsertPosition(position);
			return RedirectToAction("Index");
		}

		// M: Xóa chuc vu
		[HttpGet]
		public IActionResult Delete(int positionId)
		{
			Position position = dBHelper.GetPositionById(positionId);
			return Json(position);
		}

		[HttpPost]
		public IActionResult DeleteById(int positionId)
		{
			dBHelper.DeletePosition(positionId);
			return RedirectToAction("Index");
		}


		// CHi tiet chuc vu
		[HttpPost]
		public IActionResult DetailsById(int positionId)
		{
			dBHelper.DetailsPosition(positionId);
			return RedirectToAction("Index");
		}
		[HttpGet]
		public IActionResult Details(int positionId)
		{
			return Json(dBHelper.GetPositionById(positionId));
		}

		// chinh sua chuc vu
		[HttpGet]
		public IActionResult EditById(int positionId)
		{
			Position postion = dBHelper.GetPositionById(positionId);
			return Json(postion);
		}
		[HttpPost]
		public IActionResult EditById(PositionVM positionVM)
		{
			Position position = new Position()
			{
				PositionId = positionVM.PositionId,
				Name = positionVM.Name,
				CoefficientsSalary = positionVM.CoefficientsSalary,
				BonusCoefficient = positionVM.BonusCoefficient,
			};

			dBHelper.EditPostion(position);
			return RedirectToAction("Index");
		}
	}
}
