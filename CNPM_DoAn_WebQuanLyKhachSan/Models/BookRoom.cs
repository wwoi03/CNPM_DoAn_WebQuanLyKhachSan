namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class BookRoom
    {
        [key]
        public int BookRoomID { get; set; }
        [key]
        public int CardID { get; set; }
        [key]
        public int StaffID { get; set; }
        public double PrePayment { get; set; }
        public double PriceaGreement { get; set; }
        public string note { get; set; }
    }
}
