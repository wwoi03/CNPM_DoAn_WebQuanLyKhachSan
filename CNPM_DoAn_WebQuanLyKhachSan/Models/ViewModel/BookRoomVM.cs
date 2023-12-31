﻿namespace CNPM_DoAn_WebQuanLyKhachSan.Models.ViewModel
{
    public class BookRoomVM
    {
        public int BookRoomId { get; set; }
        public int CardId { get; set; }
        public int StaffId { get; set; }
        public double PrePayment { get; set; }
        public string? Note { get; set; }
        public List<string> Rooms { get; set; }
        public DateTime CheckInDate { get; set; }
        public DateTime CheckOutDate { get; set; }
    }
}
