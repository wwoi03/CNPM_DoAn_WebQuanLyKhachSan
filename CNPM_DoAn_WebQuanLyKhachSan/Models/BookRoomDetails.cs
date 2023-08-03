namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class BookRoomDetails
    {
        [key]
        public int BookRoomDetailsId { get; set; }
        public int BookRoomId { get; set; }
        public BookRoom BookRoom { get; set; }
        public int RoomID { get; set; }
        public Room Room { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set;}
        public int? StatusRented { get; set; }
        public string? Note { get; set; }
    }
}
