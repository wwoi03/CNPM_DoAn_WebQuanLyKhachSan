namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class MenuOrder
    {
        [key]
        public int MenuID { get; set; }
        [key]
        public int StaffID { get; set; }
        [key]
        public int BookRoomDetails { get; set; }
        [key]
        public DateTime OrderTime { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public string note { get; set; }
    }
}
