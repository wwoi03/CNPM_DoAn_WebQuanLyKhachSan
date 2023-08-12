using CNPM_DoAn_WebQuanLyKhachSan.Models;
using CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace CNPM_DoAn_WebQuanLyKhachSan.Controllers
{
	public class HistoryController : Controller
	{
        DBHelper dBHelper;
        DatabaseContext context;
        public HistoryController(DatabaseContext context)
        {
            this.context = context;
            dBHelper = new DBHelper(context);

        }
        public IActionResult Index()
		{
            List<Bill> bills = dBHelper.GetBills();
            List<HistoryVM> historyVMs = new List<HistoryVM>();
            for(int i=0;i< bills.Count; i++)
            {
                Bill bill = bills[i];
                BookRoomDetails bookRoomDetails = dBHelper.GetBookRoomDetailsById(bill.BillId);
               

                HistoryVM history = new HistoryVM()
                {
                    BillId = bill.BillId,
                    BookRoomDetails = bookRoomDetails,
                    PaymentId = bill.PaymentId,
                    TotalPriceBill = bill.TotalPriceBill,
                    TotalPriceMenu=bill.TotalPriceMenu,
                    PriceRoom=bill.PriceRoom,
                    Note=bill.Note,
                    CheckInDate=bookRoomDetails.CheckInDate,
                    CheckOutDate=bookRoomDetails.CheckOutDate
                };
               
                historyVMs.Add(history);
            }
            ViewBag.getListHistory = historyVMs;
            return View();
        }
        public IActionResult Edit(int id)
        {
           Bill bill = dBHelper.GetBillByID(id);
            HistoryVM history;
          

                    BookRoomDetails bookRoomDetails = dBHelper.GetBookRoomDetailsById(bill.BillId);
                   
                    history = new HistoryVM()
                    {
                        BillId = bill.BillId,
                        BookRoomDetails = bookRoomDetails,
                        PaymentId = bill.PaymentId,
                        TotalPriceBill = bill.TotalPriceBill,
                        TotalPriceMenu = bill.TotalPriceMenu,
                        PriceRoom = bill.PriceRoom,
                        Note = bill.Note,
                        CheckInDate = bookRoomDetails.CheckInDate,
                        CheckOutDate = bookRoomDetails.CheckOutDate
                    };
                   
      
            if (history== null) return NotFound();
            else return Json(history); 
        }
        [HttpPost]
        public IActionResult EditPost(HistoryVM historyVM)
        {
            Bill bill = new Bill()
            {
                BillId = historyVM.BillId,
                PaymentId = historyVM.PaymentId,
                TotalPriceBill = historyVM.TotalPriceBill,
                TotalPriceMenu = historyVM.TotalPriceMenu,
                PriceRoom = historyVM.PriceRoom,
                Note = historyVM.Note,
               
            };
            dBHelper.EditBill(bill);

            return RedirectToAction("Index");
           
        }
        public IActionResult Detail(int id)
        {
            Bill bill = dBHelper.GetBillByID(id);
            HistoryVM history;


            BookRoomDetails bookRoomDetails = dBHelper.GetBookRoomDetailsById(bill.BillId);
          
            history = new HistoryVM()
            {
                BillId = bill.BillId,
                BookRoomDetails = bookRoomDetails,
                PaymentId = bill.PaymentId,
                TotalPriceBill = bill.TotalPriceBill,
                TotalPriceMenu = bill.TotalPriceMenu,
                PriceRoom = bill.PriceRoom,
                Note = bill.Note,
                CheckInDate = bookRoomDetails.CheckInDate,
                CheckOutDate = bookRoomDetails.CheckOutDate
            };
            ViewBag.getHistoryDetails = history;
             
            
            return Json(history);
        }
    }
}
