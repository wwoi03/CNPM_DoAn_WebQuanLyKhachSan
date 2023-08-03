using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class RoomTypeController : Controller
    {
        DBHelper dBHelper;
        private readonly IWebHostEnvironment _hostEnvironment;
        public RoomTypeController(DatabaseContext context, IWebHostEnvironment hostEnvironment)
        {
            dBHelper = new DBHelper(context);
            _hostEnvironment = hostEnvironment;
        }
        public IActionResult Index()
        {
            ViewData["PapeTitle"] = "Loại phòng";
            ViewBag.roomTypes = dBHelper.GetRoomType();
            return View();
        }

        // M: Thêm loại phòng
        public IActionResult Create()
        {
            ViewData["PapeTitle"] = "Loại phòng";
            return Json("aaa");
        }

        [HttpPost]
        public IActionResult Create(RoomTypeVM roomTypeVM)
        {
            IFormFile imageFile = roomTypeVM.ImageFile;
            ModelState.Remove("Image");

            if (ModelState.IsValid)
            {
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
                    roomTypeVM.Image = fileName;
                }

                RoomType roomType = new RoomType()
                {
                    RoomTypeId = roomTypeVM.RoomTypeId,
                    Name = roomTypeVM.Name,
                    BedNumber = roomTypeVM.BedNumber,
                    Description = roomTypeVM.Description,
                    Price = roomTypeVM.Price,
                    Image = roomTypeVM.Image,
                };

                dBHelper.InsertRoomType(roomType);
                return RedirectToAction("Index");
            }

            return Json(roomTypeVM);
        }

        // M: Xóa loại phòng
        [HttpGet]
        public IActionResult Delete(int roomTypeId)
        {
            RoomType roomType = dBHelper.GetRoomTypeById(roomTypeId);
            return Json(roomType);
        }

        [HttpPost]
        public IActionResult DeleteById(int roomTypeId)
        {
            dBHelper.DeleteRoomType(roomTypeId);
            return RedirectToAction("Index");
        }
    }
}
