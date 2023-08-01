namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Bill
    {
        [key]
        public int BillId { get; set; }
        public int BookRoomDetailsId { get; set; }
        public BookRoomDetails BookRoomDetails { get; set; }
        public int MenuOrderId { get; set; }
        public int PaymentId { get; set; }
        public double TotalPriceBill { get; set; }
        public double PriceRoom { get; set; }
        public double TotalPriceMenu { get; set; }
        public string? Note { get; set; }

    }
}
