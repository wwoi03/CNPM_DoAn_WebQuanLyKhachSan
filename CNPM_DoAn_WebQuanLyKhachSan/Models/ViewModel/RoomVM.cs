using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel
{
	public class RoomVM
	{
		public int RoomId { get; set; }

		public int RoomTypeId { get; set; }

		public RoomType RoomType { get; set; }

		public int? Status { get; set; }

		public int? CleanRoom { get; set; }

	}
}
