namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Assignment
    {
        [key]
        public int AssignmentId { get; set; }
        [key]
        public DateTime WorkDate { get; set; }
        public string EndOfWork { get; set; }
        public string WorkContent { get; set; }
    }
}
