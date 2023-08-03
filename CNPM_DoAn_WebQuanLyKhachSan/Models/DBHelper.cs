﻿using Microsoft.EntityFrameworkCore;

namespace CNPM_DoAn_WebQuanLyKhachSan.Models
{
    public class DBHelper
    {
        DatabaseContext dbContext;

        public DBHelper(DatabaseContext _dbContext)
        {
            this.dbContext = _dbContext;
        }

        /* ------------------------------------- Room ------------------------------------- */
        // M: Lấy danh sách phòng
        public List<Room> GetUnusedRoom()
        {
            return dbContext.Rooms.Include(p => p.RoomType).Where(p => p.Status == 0).ToList();
        }

        // M: Lấy phòng theo Id
        public Room GetRoomById(int roomId)
        {
            return dbContext.Rooms.FirstOrDefault(p => p.RoomId == roomId);
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

        /* ------------------------------------- Customer ------------------------------------- */
        // M: Lấy khách hàng
        public Customer GetCustomerByCard(int cardId)
        {
            return dbContext.Customers.FirstOrDefault(p => p.CardId == cardId); 
        }

        // M: Thêm khách hàng
        public void CreateCustomer(Customer newCustomer)
        {
            dbContext.Customers.Add(newCustomer);
            dbContext.SaveChanges();
        }

        /* ------------------------------------- BookRoomDetails ------------------------------------- */
        // M: Thêm mới chi tiết đặt phòng
        public void CreateBookRoomDetails(BookRoomDetails newBookRoomDetails)
        {
            dbContext.BookRoomDetails.Add(newBookRoomDetails);
            dbContext.SaveChanges();
        }

        /* ------------------------------------- BookRoom ------------------------------------- */
        // M: Thêm mới Đặt phòng
        public void CreateBookRoom(BookRoom newBookRoom)
        {
            dbContext.BookRooms.Add(newBookRoom);
            dbContext.SaveChanges();
        }
    }
}
