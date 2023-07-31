using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class MenuType
    {
        [Key]
        public int MenuTypeID { get; set; }

        public string Name { get; set; }
    }
}
