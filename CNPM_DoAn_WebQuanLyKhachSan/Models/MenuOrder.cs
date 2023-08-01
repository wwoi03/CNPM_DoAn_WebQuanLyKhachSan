namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class MenuOrder
    {
        [key]
        public int MenuId { get; set; }
        [key]
        public int StaffId { get; set; }
        [key]
        public int BookRoomDetailsId { get; set; }
        [key]
        public DateTime OrderTime { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }
        public string? note { get; set; }
    }
}
