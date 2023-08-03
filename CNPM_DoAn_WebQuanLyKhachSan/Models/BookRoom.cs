namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class BookRoom
    {
        [key]
        public int BookRoomId { get; set; }
        public int CardId { get; set; }
        public int StaffId { get; set; }
        public double PrePayment { get; set; }
        public string? note { get; set; }
    }
}
