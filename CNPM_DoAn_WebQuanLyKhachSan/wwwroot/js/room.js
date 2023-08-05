document.addEventListener('DOMContentLoaded', function () {
	Main();

	// Main
	function Main() {
		Room();
	}

	// M: Xử lý các chức năng của BookRoom
	function Room() {
		CreateRoom();
		DeleteRoom();
		DetailsRoom();
		EditRoom();
	}

	/*------------------------------------Room----------------------------------*/
	// M: Create Room
	function CreateRoom() {
		var roomCreate = document.getElementById('room-create')
		if (roomCreate != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			roomCreate.addEventListener('click', function (e) {
				// Gọi Action GetEmployee bằng AJAX
				$.ajax({
					type: "GET",
					url: "../../Room/Create", // Đường dẫn tới Action GetEmployee
					//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeDetailsHtml =
							`
							<form method="post" action="../../Room/Create" enctype="multipart/form-data">
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
										<!-- Mã phòng -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Tên phòng</h5>
											<input class="panel-form-input" type="number" name="RoomId"/>
											<span data-valmsg-for="${data}" class="text-danger"></span>
										</div>

										<!-- Mã loại phòng -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Mã loại phòng</h5>
											<input class="panel-form-input" type="number" name="RoomTypeId"/>
										</div>

										<!-- trạng thái -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">trạng thái</h5>
											<input class="panel-form-input" type="number" name="Status"/>
										</div>
										<!-- dọn phòng -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Dọn phòng</h5>
											<input class="panel-form-input" type="number" name="CleanRoom"/>
										</div>

										
									</div>
								</div>
							</form>
						`;
						$(".right-panel").html(employeeDetailsHtml);
					},
					error: function () {
						alert("Đã xảy ra lỗi khi lấy thông tin");
					}
				});
			});
		}
	}
	// M: Delete Room
	function DeleteRoom() {
		var roomDelete = document.querySelectorAll('.room-delete')
		if (roomDelete != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			roomDelete.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('room-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Room/Delete?roomId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data)
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDeleteHtml =
								`
						<form method="post" action="../../Room/DeleteById?roomId=${data.roomId}">
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
										<h5 class="panel-form-title">Tên phòng</h5>
										<input class="panel-form-input" type="number" value="${data.roomId}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Mã loại phòng</h5>
										<input class="panel-form-input" type="text" value="${data.roomTypeId}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Trạng thái</h5>
										<input class="panel-form-input" type="text" value="${data.Status}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Dọn phòng</h5>
										<input class="panel-form-input" type="text" value="${data.CleanRoom}" readonly/>
									</div>
								</div>
							</div>
						</form>
					`;
							$(".right-panel").html(employeeDeleteHtml);
						},
						error: function () {
							alert("Đã xảy ra lỗi khi lấy thông tin");
						}
					});
				});
			})

		}
	}

	// M: Details Room
	function DetailsRoom() {
		var detailsRoom = document.querySelectorAll('.room-details')
		if (detailsRoom != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			detailsRoom.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('room-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Room/Details?roomId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							console.log("ting");
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDetailsHtml =
								`
						<form method="post" action="../../Room/DetailsById?roomId=${data.roomId}">
							<!-- Lưu đặt phòng -->
							<div class="panel-save d-flex justify-content-between align-items-center">
								<span>Chi tiết phòng</span>
								<div class="">
									<input type="submit" value="OK"/>
								</div>
							</div>

							<!-- Form -->
							<div class="panel-form">
								<!-- Thông tin -->
								<div class="panel-form-info">
									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Tên phòng</h5>
										<input class="panel-form-input" type="number" value="${data.roomId}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Mã loại phòng</h5>
										<input class="panel-form-input" type="text" value="${data.roomTypeId}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Trạng thái</h5>
										<input class="panel-form-input" type="text" value="${data.status}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Dọn phòng</h5>
										<input class="panel-form-input" type="text" value="${data.cleanRoom}" readonly/>
									</div>
								</div>
							</div>
						</form>
					`;
							$(".right-panel").html(employeeDetailsHtml);
						},
						error: function () {
							alert("coi lại code đi hahahahaaaaha");
						}
					});
				});
			})

		}
	}

	// M: Edit Room
	function EditRoom() {
		var roomEdit = document.querySelectorAll('.room-edit')
		if (roomEdit != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			roomEdit.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('room-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Room/EditById?roomId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeEditHtml =
								`
						<form method="post" action="../../Room/EditById?roomId=${data.roomId}" >
							<!-- Lưu đặt phòng -->
							<div class="panel-save d-flex justify-content-between align-items-center">
								<span>Chỉnh sửa phòng</span>
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
										<h5 class="panel-form-title">Tên phòng</h5>
										<input class="panel-form-input" type="number" value="${data.roomId}" name="RoomId" />
									</div>

									<!-- loại phòng -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Mã loại phòng</h5>
										<input class="panel-form-input" type="text" value="${data.roomTypeId}" name="RoomTypeId" />
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Trạng thái</h5>
										<input class="panel-form-input" type="text" value="${data.status}" name="Status"/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Dọn phòng</h5>
										<input class="panel-form-input" type="text" value="${data.cleanRoom}" name="CleanRoom" />
									</div>
								</div>
							</div>
						</form>
					`;
							$(".right-panel").html(employeeEditHtml);
						},
						error: function () {
							alert("Đã xảy ra lỗi khi lấy thông tin");
						}
					});
				});
			})

		}
	}
});