using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel
{
	public class PositionVM
	{
		public int PositionId { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập mã vị trí.")]
		[Display(Name = "Mã vị trí")]

		public string Name { get; set; }
		[Required(ErrorMessage = "Vui lòng nhập tên.")]
		[Display(Name = "tên")]

		public double? CoefficientsSalary { get; set; }

		[Display(Name = "Hệ số lương")]
		public double? BonusCoefficient { get; set; }
	}
}
