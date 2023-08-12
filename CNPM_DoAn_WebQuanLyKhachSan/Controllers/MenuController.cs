using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{

	public class MenuController : Controller
	{
		DBHelper dBHelper;
		private readonly IWebHostEnvironment _hostEnvironment;
		public MenuController(DatabaseContext context, IWebHostEnvironment hostEnvironment)
		{
			dBHelper = new DBHelper(context);
			_hostEnvironment = hostEnvironment;
		}
		public IActionResult Index(string searchString)
		{
			if (searchString != null && searchString.Length > 0)
				ViewBag.menu = dBHelper.SearchMenu(searchString);
			else
				ViewBag.menu = dBHelper.GetMenus();
			return View();
		}
		public IActionResult Create()
		{
			ViewData["PapeTitle"] = "Menu";
			return Json("aaa");
		}
		[HttpPost]
		public IActionResult Create(MenuVM menuVM)
		{
			IFormFile imageFile = menuVM.ImageFile;
			ModelState.Remove("Image");

			// Kiểm tra file ảnh
			if (imageFile != null && imageFile.Length > 0)
			{
				// Đảm bảo đường dẫn thư mục image
				var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "images");

				// Tạo tên tệp ảnh duy nhất bằng cách sử dụng Guid và đuôi tệp ảnh ban đầu
				var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);

				// Kết hợp đường dẫn đến thư mục image và tên tệp ảnh để có đường dẫn đầy đủ
				var filePath = Path.Combine(imagePath, fileName);

				// Lưu tệp ảnh vào thư mục image
				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					imageFile.CopyTo(stream);
				}

				// Lưu đường dẫn tệp ảnh vào thuộc tính Image của sản phẩm
				menuVM.Image = fileName;
			}

			Menu menu = new Menu()
			{
				MenuId = menuVM.MenuId,
				Name = menuVM.Name,
				ImportPrice = menuVM.ImportPrice,
				SalePrice = menuVM.SalePrice,
				Quantity = menuVM.Quantity,
				Image = menuVM.Image,
			};

			dBHelper.InsertMenu(menu);
			return RedirectToAction("Index");
		}
		[HttpGet]
		public IActionResult EditById(int menuId)
		{
			Menu menu = dBHelper.GetMenuById(menuId);
			return Json(menu);
		}
		[HttpPost]
		public IActionResult EditById(MenuVM menuVM)
		{
			IFormFile imageFile = menuVM.ImageFile;


			// Kiểm tra file ảnh
			if (imageFile != null && imageFile.Length > 0)
			{
				// Đảm bảo đường dẫn thư mục image
				var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "images");

				// Tạo tên tệp ảnh duy nhất bằng cách sử dụng Guid và đuôi tệp ảnh ban đầu
				var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);

				// Kết hợp đường dẫn đến thư mục image và tên tệp ảnh để có đường dẫn đầy đủ
				var filePath = Path.Combine(imagePath, fileName);

				// Lưu tệp ảnh vào thư mục image
				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					imageFile.CopyTo(stream);
				}

		[HttpGet]
		public IActionResult Delete(int menuId)
		{
			Menu menu = dBHelper.GetMenuById(menuId);
			return Json(menu);
		}

		[HttpPost]
		public IActionResult DeleteById(int menuId)
		{
			dBHelper.DeleteMenu(menuId);
			return RedirectToAction("Index");
		}
		[HttpGet]
		public IActionResult Details(int menuId)
		{
			Menu menu = dBHelper.GetMenuById(menuId);
			return Json(menu);
		}
		[HttpPost]
		public IActionResult DetailsById(int menuId)
		{
			dBHelper.DetailsMenu(menuId);
			return RedirectToAction("Index");
		}
		[HttpGet]
		public IActionResult EditById(int menuId)
		{
			Menu menu = dBHelper.GetMenuById(menuId);
			return Json(menu);
		}
		[HttpPost]
		public IActionResult EditById(MenuVM menuVM)
		{
			IFormFile imageFile = menuVM.ImageFile;


			// Kiểm tra file ảnh
			if (imageFile != null && imageFile.Length > 0)
			{
				// Đảm bảo đường dẫn thư mục image
				var imagePath = Path.Combine(_hostEnvironment.WebRootPath, "images");

				// Tạo tên tệp ảnh duy nhất bằng cách sử dụng Guid và đuôi tệp ảnh ban đầu
				var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);

				// Kết hợp đường dẫn đến thư mục image và tên tệp ảnh để có đường dẫn đầy đủ
				var filePath = Path.Combine(imagePath, fileName);

				// Lưu tệp ảnh vào thư mục image
				using (var stream = new FileStream(filePath, FileMode.Create))
				{
					imageFile.CopyTo(stream);
				}

				// Lưu đường dẫn tệp ảnh vào thuộc tính Image của sản phẩm
				menuVM.Image = fileName;
			}

			Menu menu = new Menu()
			{
				MenuId = menuVM.MenuId,
				Name = menuVM.Name,
				ImportPrice = menuVM.ImportPrice,
				SalePrice = menuVM.SalePrice,
				Quantity = menuVM.Quantity,
				Image = menuVM.Image,
			};

			dBHelper.EditMenu(menu);
			return RedirectToAction("Index");
		}
		public IActionResult Search(String searchString)
		{
			ViewData["PageTitle"] = "List Product";
			if (searchString != null && searchString.Length > 0)
				ViewData["listProduct"] = dBHelper.SearchMenu(searchString);
			else
				ViewData["listProduct"] = dBHelper.GetMenus();
			return View();
		}
	}
}