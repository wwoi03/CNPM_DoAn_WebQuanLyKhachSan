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
		DetailsMenu();
		DeleteMenu();
		EditMenu();
	}

	// Create Menu
	function CreateMenu() {
		console.log("Quan");
		var menuCreate = document.getElementById('menu-create')
		if (menuCreate != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			menuCreate.addEventListener('click', function (e) {
				console.log("ffs");
				// Gọi Action GetEmployee bằng AJAX
				$.ajax({
					type: "GET",
					url: "../../Menu/Create", // Đường dẫn tới Action GetEmployee
					//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log("ffs");
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
												<input class="panel-form-input" type="number" name="ImportPrice"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Giá bán</h5>
												<input class="panel-form-input" type="number" name="SalePrice"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Số lương</h5>
												<input class="panel-form-input" type="number" name="Quantity"/>
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

	/*-------------------delete-----------------*/
	function DeleteMenu() {
		var menuDelete = document.querySelectorAll('.menu-delete')
		if (menuDelete != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			menuDelete.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('menu-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Menu/Delete?menuId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDeleteHtml =
								`
						<form method="post" action="../../Menu/DeleteById?menuId=${data.menuId}">
							<!-- Lưu đặt phòng -->
							<div class="panel-save d-flex justify-content-between align-items-center">
								<span>Xóa</span>

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
										<h5 class="panel-form-title">Tên Thực đơn</h5>
										<input class="panel-form-input" type="text" value="${data.name}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá Nhập</h5>
										<input class="panel-form-input" type="number" value="${data.importPrice}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá Bán</h5>
										<input class="panel-form-input" type="number" value="${data.salePrice}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Số Lượng</h5>
										<input class="panel-form-input" type="number" value="${data.quantity}" readonly/>
									</div>
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hình Ảnh </h5>
										<img src ="/images/${data.image}"/>
									</div>
								</div>
							</div>
						</form>
					`;
							$(".right-panel").html(employeeDeleteHtml);
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
	function DetailsMenu() {
		var detailsMenu = document.querySelectorAll('.menu-details')
		if (detailsMenu != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			detailsMenu.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('menu-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Menu/Details?menuId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDetailsHtml =
								`
						<form method="post" action="../..Menu/Details?menuId=${data.menuId}">
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
										<h5 class="panel-form-title">Tên Thực đơn</h5>
										<input class="panel-form-input" type="text" value="${data.name}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá Nhập</h5>
										<input class="panel-form-input" type="number" value="${data.importPrice}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá Bán</h5>
										<input class="panel-form-input" type="number" value="${data.salePrice}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Số Lượng</h5>
										<input class="panel-form-input" type="number" value="${data.quantity}" readonly/>
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
	function EditMenu() {
		var menuEdit = document.querySelectorAll('.menu-edit')
		if (menuEdit != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			menuEdit.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('menu-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Menu/EditById?menuId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeEditHtml =
								`
						<form method="post" action="../../Menu/EditById?menuId=${data.menuId}" enctype="multipart/form-data">
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
										<h5 class="panel-form-title">Tên Thực đơn</h5>
										<input class="panel-form-input" type="text" value="${data.name}" name="Name"/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá Nhập</h5>
										<input class="panel-form-input" type="number" value="${data.importPrice}" name="ImportPrice"/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Giá Bán</h5>
										<input class="panel-form-input" type="number"  value="${data.salePrice}" name="SalePrice"/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Số Lượng</h5>
										<input class="panel-form-input" type="number" value="${data.quantity}" name="Quantity"/>
									</div>
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hình Ảnh </h5>
										<input class="panel-form-input" accept="image/*" type="file" name="ImageFile"/>
										<input class="panel-form-input"  name="Image" value="${data.image}" hidden/>
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

})