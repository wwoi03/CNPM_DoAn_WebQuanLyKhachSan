namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Position
    {
        [key]
        public int PositionID { get; set; }
        public string Name { get; set; }
        public string PositionType { get; set; }
        public int CoefficientsSlary { get; set; }
        public int BonusCoefficient { get; set; }

    }
}
