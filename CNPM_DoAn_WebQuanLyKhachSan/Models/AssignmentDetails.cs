﻿using System.ComponentModel.DataAnnotations.Schema;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class AssignmentDetails
    {
        [key]
        public int AssginmentDetailsId { get; set; }
        [key]
        public int StaffID { get; set; }
        public Staff staffID { get; set; }
        public int WorkingHours { get; set; }
        public int Status { get; set; }
        public string? Note { get; set; }
    }
}
