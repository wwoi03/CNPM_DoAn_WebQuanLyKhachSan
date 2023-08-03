using Microsoft.AspNetCore.Mvc;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using CNPM_DoAn_WebQuanLyKhachSan.Models;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class RoomController : Controller
    {
		DBHelper dBHelper;
		private readonly IWebHostEnvironment _hostEnvironment;
		public RoomController(DatabaseContext context, IWebHostEnvironment hostEnvironment)
		{
			dBHelper = new DBHelper(context);
			_hostEnvironment = hostEnvironment;
		}
		public IActionResult Index()
        {
			ViewData["PapeTitle"] = "Phòng";
			ViewBag.room = dBHelper.GetUnusedRoom();
			return View();
        }



		// M: Thêm loại phòng
		public IActionResult Create()
		{
			ViewData["PapeTitle"] = "Phòng";
			return Json("aaa");
		}
		[HttpPost]
		public IActionResult Create(RoomVM roomVM)
		{
			Room room = new Room()
		{
			RoomId = roomVM.RoomId,
			RoomTypeId = roomVM.RoomTypeId,
			RoomType = roomVM.RoomType,
			Status = roomVM.Status,
			CleanRoom = roomVM.CleanRoom,
		};

		dBHelper.InsertRoom(room);
                return RedirectToAction("Index");
	}

	// M: Xóa loại phòng
	[HttpGet]
		public IActionResult Delete(int roomId)
		{
			Room room = dBHelper.GetRoomById(roomId);
			return Json(room);
		}

		[HttpPost]
		public IActionResult DeleteById(int roomId)
		{
			dBHelper.DeleteRoom(roomId);
			return RedirectToAction("Index");
		}
	}
}
