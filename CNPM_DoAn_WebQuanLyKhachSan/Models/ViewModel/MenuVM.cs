using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel
{
	public class MenuVM
	{
		public int MenuId { get; set; }
		
		public int MenuTypeId { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập loại dịch.")]
		[Display(Name = "Loại dịch vụ")]
		public string Name { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập giá nhập khẩu.")]
		[Display(Name = "Giá nhập khẩu")]
		public double ImportPrice { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập giá bán.")]
		[Display(Name = "Giá bán")]
		public double SalePrice { get; set; }
		[Display(Name = "Hình ảnh")]
		public string Image { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập Số lượng.")]
		[Display(Name = "Số lượng")]
		public int Quantity { get; set; }
		[Required(ErrorMessage = "Vui lòng thêm ảnh loại dịch vụ.")]
		public IFormFile ImageFile { get; set; }
	}
}
