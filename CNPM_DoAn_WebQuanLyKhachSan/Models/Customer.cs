using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Customer
    {
        [Key]
        public int CardId { get; set; }
        public string Name { get; set; }    
        public string Phone { get; set; }
    }
}
