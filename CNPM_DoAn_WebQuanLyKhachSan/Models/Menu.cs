namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Menu
    {
        [key]
        public int MenuID { get; set; }
        public int? MenuTypeID { get; set; }
        public string Name { get; set; }  

        public double Importil { get; set; }
        public double SalePrice { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }

    }
}
