document.addEventListener('DOMContentLoaded', function () {
	Main();

	// Main
	function Main() {
		// Controller
		Menu();
	}

	// M: Menu
	function Menu() {
		CreateMenu();
	}

	// Create Menu
	function CreateMenu() {
		console.log("Quan");
		var menuCreate = document.getElementById('menu-create')
		if (menuCreate != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			menuCreate.addEventListener('click', function (e) {
				// Gọi Action GetEmployee bằng AJAX
				$.ajax({
					type: "GET",
					url: "../../Menu/Create", // Đường dẫn tới Action GetEmployee
					//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeMenuCreateHtml =
							`
								<form method="post" action="../../Menu/Create" enctype="multipart/form-data">
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
												<h5 class="panel-form-title">Tên thực đơn</h5>
												<input class="panel-form-input" type="text" name="Name"/>
												<span data-valmsg-for="${data}" class="text-danger"></span>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Giá nhập</h5>
												<input class="panel-form-input" type="number" name="BedNumber"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Giá bán</h5>
												<input class="panel-form-input" type="number" name="Price"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Số lương</h5>
												<input class="panel-form-input" type="number" name="Description"/>
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
						$(".right-panel").html(employeeMenuCreateHtml);
					},
					error: function () {
						alert("Đã xảy ra lỗi khi lấy thông t");
					}
				});
			});
		}
	}

	// Delete Menu
	if (document.getElementById('menu-delete') != null) {
		document.getElementById('menu-delete').addEventListener('click', function (e) {
			console.log("Quan");
			$.ajax({
				type: "GET",
				url: "../../Menu/Delete",
				success: function (data) {
					var employeeDeleteHtml = `
						<form method="post" action="../../Menu/Delete">
						<!-- Xóa -->
			<!-- Lưu đặt phòng -->
			<div class="panel-save d-flex justify-content-between align-items-center">
				<span>Xóa</span>

				<div class="">
					<input class="panel-save-submit" type="submit" value="lưu" />
				</div>
			</div>

			<!-- Form -->
			<form class="panel-form">
				<!-- Thông tin -->
				<div class="panel-form-info">
					<!-- Mã dịch vụ -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Mã dịch vụ</h5>
						<input class="panel-form-input" type="text" value="1" readonly />
					</div>


					<!-- Tên dịch vụ -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Tên</h5>
						<input class="panel-form-input" type="text" value="Phòng siêu Vip" readonly />
					</div>

					<!-- Giá dịch vụ -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Giá</h5>
						<input class="panel-form-input" type="text" value="1.000.000đ" readonly />
					</div>

					<!-- Số lượng -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Số lượng</h5>
						<input class="panel-form-input" type="text" value="2" readonly />
					</div>
					<div>
						<div class="" style="text-align:right">
							<a class="btn btn-danger btn-sm" asp-controller="" asp-action="../../">Hủy bỏ</a>
						</div>
					</div>
			</form>
		<form/>
					`;
					$(".right-panel").html(employeeDeleteHtml);
				},
				error: function () {
					alert("Đã xảy ra lỗi khi lấy thông tin")
				}
			});
		});
	}

	// Edit Menu
	if (document.getElementById('menu-edit') != null) {
		document.getElementById('menu-edit').addEventListener('click', function (e) {
			console.log("Quan");
			$.ajax({
				type: "GET",
				url: "../../Menu/Edit",
				success: function (data) {
					var employeeEditHtml = `
						<form method="post" action="../../Menu/Edit">
						<!-- Xóa -->
			<!-- Lưu đặt phòng -->
			<div class="panel-save d-flex justify-content-between align-items-center">
				<span>Chỉnh sửa</span>

				<div class="">
					<input class="panel-save-submit" type="submit" value="lưu" />
				</div>
			</div>

			<!-- Form -->
			<form class="panel-form">
				<div class="panel-form-info">
					<!-- Mã dịch vụ -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Mã dịch vụ</h5>
						<input class="panel-form-input" type="text" value="" />
					</div>


					<!-- Tên dịch vụ -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Tên</h5>
						<input class="panel-form-input" type="text" value="" />
					</div>

					<!-- Giá dịch vụ -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Giá</h5>
						<input class="panel-form-input" type="text" value="" />
					</div>

					<!-- Số lượng -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Số lượng</h5>
						<input class="panel-form-input" type="text" value="" />
					</div>
					<div>
						<div class="" style="text-align:right">
							<a class="btn btn-info btn-sm">Hủy bỏ</a>
						</div>
					</div>
			</form>
		<form/>
					`;
					$(".right-panel").html(employeeEditHtml);
				},
				error: function () {
					alert("Đã xảy ra lỗi khi lấy thông tin")
				}
			});
		});
	}
});