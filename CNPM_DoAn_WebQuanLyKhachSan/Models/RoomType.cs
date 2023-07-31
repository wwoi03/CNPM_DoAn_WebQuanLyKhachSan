namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class RoomType
    {
        [key]
        public int RoomTypeID { get; set; }
        public string Name { get; set; }
        public int BedNumber { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string ListImage { get; set; }

    }
}
