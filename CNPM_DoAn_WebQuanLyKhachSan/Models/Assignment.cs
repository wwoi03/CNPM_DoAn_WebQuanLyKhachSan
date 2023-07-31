namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Assignment
    {
        [key]
        public int AssignmentID { get; set; }
        [key]
        public DateTime WorkDate { get; set; }
        public string EndofWork { get; set; }
        public string WorkContent { get; set; }
    }
}
