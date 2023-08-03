using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CardId { get; set; }
        public string Name { get; set; }    
        public string Phone { get; set; }
    }
}
