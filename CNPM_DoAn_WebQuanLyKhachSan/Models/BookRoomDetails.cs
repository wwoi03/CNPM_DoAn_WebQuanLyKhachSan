namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class BookRoomDetails
    {
        [key]
        public int BookRoomDetailsID { get; set; }
        public int? BookRoomID { get; set; }
        public int? RoomID { get; set; }
        public DateTime CheckinDate { get; set; }
        public DateTime CheckoutDate { get; set;}
        public string StatusRented { get; set; }
    }
}
