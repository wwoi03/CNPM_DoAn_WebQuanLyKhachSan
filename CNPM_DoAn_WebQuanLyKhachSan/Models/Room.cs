namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Room
    {
        [key]
        public int RoomId { get; set; }
        public int RoomTypeId { get; set; }
        public RoomType RoomType { get; set; }
        public int StaffId { get; set; }
        public Staff Staff { get; set; }
        public int? Staus { get; set; }
        public string image { get; set; }
        public int? CleanRoom { get; set; }

    }
}
