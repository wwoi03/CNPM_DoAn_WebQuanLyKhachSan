document.addEventListener('DOMContentLoaded', function () {
	/* --------------------------------- Main --------------------------------- */
	Main();

	// Main
	function Main() {
		RoomType();
	}

	// M: Xử lý các chức năng của RoomType
	function Staff() {
		CreateStaff();
		DeleteStaff();
		DetailsStaff();
		EditStaff();
	}
	/* --------------------------------- Staff --------------------------------- */
	// M: Create Staff
	function CreateStaff() {
		var staffCreate = document.getElementById('staff-create')
		if (staffCreate != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			staffCreate.addEventListener('click', function (e) {
				cconsole.log("ssss");
				// Gọi Action GetEmployee bằng AJAX
				$.ajax({
					type: "GET",
					url: "../../Staff/Create", // Đường dẫn tới Action GetEmployee
					//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeDetailsHtml =
							`
							<form method="post" action="../../Staff/Create" enctype="multipart/form-data">
								<!-- Lưu đặt phòng -->
								<div class="panel-save d-flex justify-content-between align-items-center">
									<span>Thêm mới</span>

									<div class="">
										<input type="submit" value="submit" />
									</div>
								</div>

								<!-- Form -->
								<div class="panel-form">
									<!-- Thông tin -->
									<div class="panel-form-info">
										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Mã nhân viên</h5>
											<input class="panel-form-input" type="text" name="StaffId" />
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Tên tài khoản</h5>
											<input class="panel-form-input" type="text" />
											<span data-valmsg-for="${data}" class="text-danger"></span>
										</div>

										<!-- Tên tài khoản -->
										<a class="panel-form-item">
											<h5 class="panel-form-title">Tên nhân viên</h5>
											<input class="panel-form-input" type="text" name="Name" />
										</a>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Chức vụ</h5>
											<input class="panel-form-input" type="text" name="PositionId" />
										</div>								
										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Giới tính</h5>
											<input class="panel-form-input" type="text" name="Gender" />
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Ngày sinh</h5>
											<input class="panel-form-input" type="text" name="Birthday" />
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Số điện thoại</h5>
											<input class="panel-form-input" type="text" name="Phone" />
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Địa chỉ</h5>
											<input class="panel-form-input" type="text" name="Address" />
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Email</h5>
											<input class="panel-form-input" type="text" name="Status" />
										</div>
									</div>
								</div>
							</form>
						`;
						$(".right-panel").html(employeeDetailsHtml);
					},
					error: function () {
						alert("Đã xảy ra lỗi khi lấy thông t");
					}
				});
			});
		});
   }
}