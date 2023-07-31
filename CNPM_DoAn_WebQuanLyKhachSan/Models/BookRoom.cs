namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class BookRoom
    {
        [key]
        public int BookRoomId { get; set; }
        [key]
        public int CardId { get; set; }
        [key]
        public int StaffId { get; set; }
        public double PrePayment { get; set; }
        public double PriceAgreement { get; set; }
        public string? note { get; set; }
    }
}
