using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

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
                Staff checkStaff = dbHelper.GetStaffByUsername(staffVM.Username);

                // kiểm tra tên đăng nhập đã có trong hệ thông
                if (checkStaff != null)
                {
                    // Kiểm tra mật khậu
                    if (checkStaff.Password == staffVM.Password)
                    {
                        HttpContext.Session.SetString("Username", checkStaff.Username);
                        HttpContext.Session.SetString("Name", checkStaff.Name);
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

        // M: Đăng xuất
        public IActionResult Logout()
        {
            return View();
        }

        public IActionResult SystemManagementPage()
        {
            ViewData["PapeTitle"] = "Quản lý hệ thống";
            return View();
        }

        public IActionResult Index()
        {
            return View();
        }
        public int count(int i)
        {
            int count = 0;
            List<BookRoomDetails> bills = dbHelper.GetBookRoomDetails();
            foreach (var item in bills)
            {
                if (i == item.CheckInDate.Month && item.CheckInDate.Year == DateTime.Now.Year)
                {
                    count++;
                }
            }
            return count;
        }
        public IActionResult GetIndex()
        {
            var connection = @"Server=LAPTOP-OTHPHUSK\SQLEXPRESS;Database=QLKHACHSAN;Trusted_Connection=True;TrustServerCertificate=True";

            //Phong Tong Phong




            //Tong booking 
            int TongBooking = 0;
            using (var conect = new SqlConnection(connection))
            using (var command = new SqlCommand("select count(*) from BookRooms", conect))
            {
                conect.Open();
                var SqlData = command.ExecuteReader(CommandBehavior.CloseConnection);
                if (SqlData.HasRows)
                {
                    while (SqlData.Read())
                    {
                        TongBooking = SqlData.GetInt32(0);
                    }
                }
            }
            //Phong hiện tại 
            int Phong = 0;
            using (var conect = new SqlConnection(connection))
            using (var command = new SqlCommand("select count(*) from Rooms where Status=0", conect))
            {
                conect.Open();
                var SqlData = command.ExecuteReader(CommandBehavior.CloseConnection);
                if (SqlData.HasRows)
                {
                    while (SqlData.Read())
                    {
                        Phong = SqlData.GetInt32(0);
                    }
                }
            }
            //Tong tien 
            double Tong = 0;
            using (var conect = new SqlConnection(connection))
            using (var command = new SqlCommand("select sum(TotalPriceBill) from Bills", conect))
            {
                conect.Open();
                var SqlData = command.ExecuteReader(CommandBehavior.CloseConnection);
                if (SqlData.HasRows)
                {
                    while (SqlData.Read())
                    {
                        Tong = SqlData.GetDouble(0);
                    }
                }
            }

            //Tong nhan viên 
            int SoNV = 0;
            using (var conect = new SqlConnection(connection))
            using (var command = new SqlCommand("select count(*) from Staffs", conect))
            {
                conect.Open();
                var SqlData = command.ExecuteReader(CommandBehavior.CloseConnection);
                if (SqlData.HasRows)
                {
                    while (SqlData.Read())
                    {
                        SoNV = SqlData.GetInt32(0);
                    }
                }
            }




            List<int> a = new List<int>();
            for (int i = 1; i < 13; i++)
            {
                a.Add(count(i));
                //ViewData[$"{i}"]= count(i);
            }

            List<RoomType> roomTypes = dbHelper.GetRoomType();
            List<BookRoomDetails> bookRoomDetails = dbHelper.GetBookRoomDetails();
            List<int> listCount = new List<int>();
            List<string> listNameRT = new List<string>();

            foreach (var itemRT in roomTypes)
            {
                int count = 0;
                foreach (var itemBRDT in bookRoomDetails)
                {
                    if (itemRT.RoomTypeId == itemBRDT.Room.RoomTypeId && itemBRDT.StatusRented == 1)
                    {
                        count++;
                    }
                }
                listNameRT.Add(itemRT.Name);
                listCount.Add(count);
            }

            var data = new
            {

                TongBooking,
                a,
                Phong,
                Tong,
                SoNV,
                listNameRT,
                listCount
            };
            ViewData["PapeTitle"] = "Thông tin hệ thống";
            return Json(data);
        }
    }
}
