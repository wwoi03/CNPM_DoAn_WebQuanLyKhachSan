namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Bill
    {
        [key]
        public int BillId { get; set; }
        public int? BookRoomDetails { get; set; }
        public int MenuOrderID { get; set; }
        public int PaymentID { get; set; }
        public int TotalPriceBill { get; set; }
        public int PriceRoom { get; set; }
        public double TotalPriceMenu { get; set; }
        public string Note { get; set; }

    }
}
