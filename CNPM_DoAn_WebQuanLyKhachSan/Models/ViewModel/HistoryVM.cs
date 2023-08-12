using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel
{
	public class HistoryVM
	{
        public int BillId { get; set; }
        public BookRoomDetails BookRoomDetails { get; set; }
        public int PaymentId { get; set; }
        public double TotalPriceMenu { get; set; }
        public double TotalPriceBill { get; set; }
        public double PriceRoom { get; set; }
        public string? Note { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
    }
}
