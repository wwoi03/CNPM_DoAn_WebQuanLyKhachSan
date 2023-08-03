using System.ComponentModel.DataAnnotations;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel
{
    public class RoomTypeVM
    {
        public int RoomTypeId { get; set; }
        [Required(ErrorMessage = "Vui lòng nhập tên loại phòng.")]
        [Display(Name = "Tên loại phòng")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập số giường.")]
        [Display(Name = "Số giường")]
        public int BedNumber { get; set; }

        [Display(Name = "Mô tả")]
        public string? Description { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập giá phòng.")]
        [Display(Name = "Giá")]
        public double Price { get; set; }

        [Display(Name = "Hình ảnh")]
        public string Image { get; set; }

        [Required(ErrorMessage = "Vui lòng thêm ảnh loại phòng.")]
        public IFormFile ImageFile { get; set; }
    }
}
