using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class MenuType
    {
        [Key]
        public int MenuTypeId { get; set; }
        public string Name { get; set; }
    }
}
