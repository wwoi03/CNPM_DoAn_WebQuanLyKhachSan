using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Customer
    {
        [Key]
        public int CardID { get; set; }
        public string Name { get; set; }    
        public int Phone { get; set; }
        public string Address { get; set; }
    }
}
