using System.ComponentModel.DataAnnotations.Schema;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class BookRoom
    {
        [key]
        public int BookRoomId { get; set; }
        
        [ForeignKey("Customer")]
        public int? CardId { get; set; }
        public Customer Customer { get; set; }
        public int? StaffId { get; set; }
        public Staff Staff { get; set; }
        public double PrePayment { get; set; }
        public string? Note { get; set; }
        public DateTime? CheckInDate { get; set; }
        public DateTime? CheckOutDate { get; set; }
    }
}
