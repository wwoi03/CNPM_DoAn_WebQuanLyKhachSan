using System.ComponentModel.DataAnnotations.Schema;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class AssignmentDetails
    {
        [key]
        public int AssginmentId { get; set; }
        [key]
        public int StaffID { get; set; }
        public Staff Staff { get; set; }
        public int WorkingHours { get; set; }
        public int Status { get; set; }
        public string? Note { get; set; }
    }
}
