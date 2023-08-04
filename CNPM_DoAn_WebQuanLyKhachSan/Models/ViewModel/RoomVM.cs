using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel
{
	public class RoomVM
	{
		public int RoomId { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập tên phòng.")]
		[Display(Name = "Tên phòng")]

		public int RoomTypeId { get; set; }
		[Required(ErrorMessage = "Vui lòng chọn loại phòng.")]
		[Display(Name = "Mã loại phòng")]
		public RoomType RoomType { get; set; }

		[Display(Name = "Trạng thái")]
		public int? Status { get; set; }
		[Display(Name = "Dọn phòng")]
		public int? CleanRoom { get; set; }
	}
}