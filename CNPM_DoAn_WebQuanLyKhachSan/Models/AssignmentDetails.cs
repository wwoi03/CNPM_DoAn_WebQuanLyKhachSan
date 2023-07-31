using System.ComponentModel.DataAnnotations.Schema;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class AssignmentDetails
    {
        [key]
        public int AssginmentDetailsID { get; set; }
        [key]
        public int StaffID { get; set; }
        public Staff staffID { get; set; }
        public string WorkingHours { get; set; }
        public string Status { get; set; }
        public string Note { get; set; }
    }
}
