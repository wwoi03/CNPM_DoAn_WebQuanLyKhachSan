namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Staff
    {
        [key]
        public int StaffId { get; set; }
        public int PositionId { get; set; }
        public Position Position { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }
        public DateTime? Birthday { get; set; }
        public string Phone { get; set; }
        public string? Address { get; set; }
        public string Email { get; set; }
        public string Passwork { get; set; }
        public int? Status { get; set; }
        public ICollection<AssignmentDetails> AssignmentDetails { get; set; }
    }
}

