namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Menu
    {
        [key]
        public int MenuId { get; set; }
        public int MenuTypeId { get; set; }
        public MenuType MenuType { get; set; }
        public string Name { get; set; }  
        public double ImportPrice { get; set; }
        public double SalePrice { get; set; }
        public string Image { get; set; }
        public int Quantity { get; set; }

    }
}
