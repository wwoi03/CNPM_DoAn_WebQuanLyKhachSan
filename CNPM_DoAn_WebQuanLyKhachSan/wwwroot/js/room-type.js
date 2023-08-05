document.addEventListener('DOMContentLoaded', function () {
	/* --------------------------------- Main --------------------------------- */
	Main();

	// Main
	function Main() {
		RoomType();
	}

	// M: Xử lý các chức năng của RoomType
	function RoomType() {
		CreateRoomType();
		DeleteRoomType();
		DetailsRoomType();
		EditRoomType();
	}

	/* --------------------------------- RoomType --------------------------------- */
	// M: Create RoomType
	function CreateRoomType() {
		var roomTypeCreate = document.getElementById('roomType-create')
		if (roomTypeCreate != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			roomTypeCreate.addEventListener('click', function (e) {
				// Gọi Action GetEmployee bằng AJAX
				$.ajax({
					type: "GET",
					url: "../../RoomType/Create", // Đường dẫn tới Action GetEmployee
					//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeDetailsHtml =
							`
							<form method="post" action="../../RoomType/Create" enctype="multipart/form-data">
								<!-- Lưu đặt phòng -->
								<div class="panel-save d-flex justify-content-between align-items-center">
									<span>Thêm mới</span>

									<div class="">
										<input type="submit" value="Lưu"/>
									</div>
								</div>

								<!-- Form -->
								<div class="panel-form">
									<!-- Thông tin -->
									<div class="panel-form-info">
										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Tên loại phòng</h5>
											<input class="panel-form-input" type="text" name="Name"/>
											<span data-valmsg-for="${data}" class="text-danger"></span>
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Số giường</h5>
											<input class="panel-form-input" type="number" name="BedNumber"/>
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Giá</h5>
											<input class="panel-form-input" type="number" name="Price"/>
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Mô tả</h5>
											<input class="panel-form-input" type="text" name="Description"/>
										</div>

										<!-- Tên tài khoản -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Hình ảnh</h5>
											<input class="panel-form-input" accept="image/*" type="file" name="ImageFile"/>
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
		}
	}

	// M: Delete RoomType
	function DeleteRoomType() {
		var roomTypeDelete = document.querySelectorAll('.roomType-delete')
		if (roomTypeDelete != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			roomTypeDelete.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('room-type-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../RoomType/Delete?roomTypeId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDetailsHtml =
								`
						<form method="post" action="../../RoomType/DeleteById?roomTypeId=${data.roomTypeId}">
							<!-- Lưu đặt phòng -->
							<div class="panel-save d-flex justify-content-between align-items-center">
								<span>Thêm mới</span>

								<div class="">
									<input type="submit" value="Xóa"/>
								</div>
							</div>

							<!-- Form -->
							<div class="panel-form">
								<!-- Thông tin -->
								<div class="panel-form-info">
									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Tên loại phòng</h5>
										<input class="panel-form-input" type="text" value="${data.name}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Số giường</h5>
										<input class="panel-form-input" type="text" value="${data.bedNumber}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá</h5>
										<input class="panel-form-input" type="text" value="${data.price}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Mô tả</h5>
										<input class="panel-form-input" type="text" value="${data.description}" readonly/>
									</div>
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hình Ảnh </h5>
										<img src ="/images/${data.image}"/>
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
			})

		}
	}
	/*-------------------edit-----------------*/
	function EditRoomType() {
		var roomTypeEdit = document.querySelectorAll('.roomType-edit')
		if (roomTypeEdit != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			roomTypeEdit.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('room-type-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../RoomType/EditById?roomTypeId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeEditHtml =
								`
						<form method="post" action="../../RoomType/EditById?roomTypeId=${data.roomTypeId}" enctype="multipart/form-data">
							<!-- Lưu đặt phòng -->
							<div class="panel-save d-flex justify-content-between align-items-center">
								<span>Chỉnh sửa</span>

								<div class="">
									<input type="submit" value="Lưu"/>
								</div>
							</div>

							<!-- Form -->
							<div class="panel-form">
								<!-- Thông tin -->
								<div class="panel-form-info">
									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Tên Loại Phòng</h5>
										<input class="panel-form-input" type="text" value="${data.name}" name="Name"/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá</h5>
										<input class="panel-form-input" type="number" value="${data.price}" name="Price"/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Số lượng</h5>
										<input class="panel-form-input" type="number"  value="${data.bedNumber}" name="BedNumber"/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Số Lượng</h5>
										<input class="panel-form-input" type="number" value="${data.quantity}" name="Quantity"/>
									</div>
									<div class="panel-form-item">
										<h5 class="panel-form-title">Mô Tả</h5>
										<input class="panel-form-input" type="text" value="${data.description}" name="Description"/>
									</div>
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hình Ảnh </h5>
										<input class="panel-form-input" accept="image/*" type="file" name="ImageFile"/>
										<img src ="/images/${data.image}"name="ImageFile"/>
									</div>
								</div>
							</div>
						</form>
					`;
							$(".right-panel").html(employeeEditHtml);
						},
						error: function () {
							alert("Đã xảy ra lỗi khi lấy thông t");
						}
					});
				});
			})

		}
	}
	/*-------------------details-----------------*/
	function DetailsRoomType() {
		var detailsRoomType = document.querySelectorAll('.roomType-details')
		if (detailsRoomType != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			detailsRoomType.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('room-type-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../RoomType/Details?roomTypeId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDetailsHtml =
								`
						<form method="post" action="../../RoomType/Details?roomTypeId=${data.roomTypeId}">
							<!-- Lưu đặt phòng -->
							<div class="panel-save d-flex justify-content-between align-items-center">
								<span>Chi Tiết</span>
							</div>

							<!-- Form -->
							<div class="panel-form">
								<!-- Thông tin -->
								<div class="panel-form-info">
									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Tên Loại Phòng</h5>
										<input class="panel-form-input" type="text" value="${data.name}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá</h5>
										<input class="panel-form-input" type="number" value="${data.price}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Số lượng</h5>
										<input class="panel-form-input" type="number" value="${data.bedNumber}" readonly/>
									</div>
									<div class="panel-form-item">
										<h5 class="panel-form-title">Mô Tả</h5>
										<input class="panel-form-input" type="text" value="${data.description}" readonly/>
									</div>
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hình Ảnh </h5>
										<img src ="/images/${data.image}"/>
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
			})

		}
	}
});