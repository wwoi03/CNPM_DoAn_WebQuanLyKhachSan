﻿namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class DBHelper
    {
        DatabaseContext dbContext;

        public DBHelper(DatabaseContext _dbContext)
        {
            this.dbContext = _dbContext;
        }



        /* ------------------------------------- RoomType ------------------------------------- */
        // M: Lấy danh sách sản phẩm
        public List<RoomType> GetRoomType()
        {
            return  dbContext.RoomTypes.OrderByDescending(p => p.RoomTypeId).ToList();
        }

        // M: Lấy loại phòng theo id
        public RoomType GetRoomTypeById(int roomTypeId)
        {
            return dbContext.RoomTypes.FirstOrDefault(p => p.RoomTypeId == roomTypeId);
        }

        // M: Thêm loại phòng
        public void InsertRoomType(RoomType newRoomType)
        {
            dbContext.RoomTypes.Add(newRoomType);
            dbContext.SaveChanges();
        }

        // M: Thêm loại phòng
        public void DeleteRoomType(int roomTypeId)
        {
            dbContext.RoomTypes.Remove(GetRoomTypeById(roomTypeId));
            dbContext.SaveChanges();
        }
    }
}