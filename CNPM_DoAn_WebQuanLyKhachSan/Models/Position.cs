namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Position
    {
        [key]
        public int PositionId { get; set; }
        public string Name { get; set; }
        public double? CoefficientsSalary { get; set; }
        public double? BonusCoefficient { get; set; }
    }
}
