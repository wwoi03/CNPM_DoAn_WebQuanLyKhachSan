using CNPM_DoAn_WebQuanLyKhachSan.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}