namespace CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel
{
    public class BillVM
    {
        public int BillId { get; set; }
        public int PaymentId { get; set; }
        public double TotalPriceMenu { get; set; }
        public double TotalPriceBill { get; set; }
        public double PriceRoom { get; set; }
        public string? Note { get; set; }
    }
}
