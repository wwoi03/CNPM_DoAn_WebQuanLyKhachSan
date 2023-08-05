document.addEventListener('DOMContentLoaded', function () {
	Main();

	// Main
	function Main() {
		Position();
	}

	// Controler
	function Position() {
		CreatePosition();
		DeletePosition();
		DetailsPosition();
		EditPosition();
	}

	// M: Create Position
	function CreatePosition() {
		var positionCreate = document.getElementById('position-create')
		if (positionCreate != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			positionCreate.addEventListener('click', function (e) {
				// Gọi Action GetEmployee bằng AJAX
				$.ajax({
					type: "GET",
					url: "../../Position/Create", // Đường dẫn tới Action GetEmployee
					//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeCreateHtml =
							`
							<form method="post" action="../../Position/Create" enctype="multipart/form-data">
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
										

										<!-- Tên -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Tên</h5>
											<input class="panel-form-input" type="text" name="Name"/>
										</div>

										<!-- Hệ số lương -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Hệ số lương</h5>
											<input class="panel-form-input" type="number" name="CoefficientsSalary"/>
										</div>
										<!-- Hệ số thưởng -->
										<div class="panel-form-item">
											<h5 class="panel-form-title">Hệ số thưởng</h5>
											<input class="panel-form-input" type="number" name="BonusCoefficient"/>
										</div>

										
									</div>
								</div>
							</form>
						`;
						$(".right-panel").html(employeeCreateHtml);
					},
					error: function () {
						alert("Đã xảy ra lỗi khi lấy thông tin");
					}
				});
			});
		}
	}

	// M: Delete Position
	function DeletePosition() {
		var positionDelete = document.querySelectorAll('.position-delete')
		if (positionDelete != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			positionDelete.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('position-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Position/Delete?positionId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data)
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDeleteHtml =
								`
						<form method="post" action="../../Position/DeleteById?positionId=${data.positionId}">
							<!-- Lưu đặt phòng -->
							<div class="panel-save d-flex justify-content-between align-items-center">
								<span>Xác nhận xóa </span>
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
										<h5 class="panel-form-title">Mã chức vụ</h5>
										<input class="panel-form-input" type="number" value="${data.positionId}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Tên chức vụ</h5>
										<input class="panel-form-input" type="text" value="${data.name}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hệ số lương</h5>
										<input class="panel-form-input" type="number" value="${data.coefficientsSalary}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hệ số thưởng</h5>
										<input class="panel-form-input" type="number" value="${data.bonusCoefficient}" readonly/>
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

	// M: Details Position
	function DetailsPosition() {
		console.log("dadas");
		var detailsPosition = document.querySelectorAll('.position-details');
		if (detailsPosition != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			detailsPosition.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					console.log("ddddddddddddadas");

					var employeeId = $(this).data('position-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Position/Details?positionId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { positioneId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							console.log("teng");
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDetailsHtml =
								`
						<form method="post" action="../../Position/DetailsById?positionId=${data.positionId}">
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
										<h5 class="panel-form-title">Mã chức vụ</h5>
										<input class="panel-form-input" type="number" value="${data.positionId}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Tên</h5>
										<input class="panel-form-input" type="text" value="${data.name}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hệ số lương</h5>
										<input class="panel-form-input" type="number" value="${data.coefficientsSalary}" readonly/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hệ số thưởng</h5>
										<input class="panel-form-input" type="number" value="${data.bonusCoefficient}" readonly/>
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

	// M: Edit Position
	function EditPosition() {
		var positionEdit = document.querySelectorAll('.position-edit')
		if (positionEdit != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			positionEdit.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('position-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "../../Position/EditById?positionId=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { positionId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							console.log(data);
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeEditHtml =
								`
						<form method="post" action="../../Position/EditById?positionId=${data.positionId}" >
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
										<h5 class="panel-form-title">Mã chức vụ</h5>
										<input class="panel-form-input" type="number" value="${data.positionId}" name="Position" />
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Tên</h5>
										<input class="panel-form-input" type="text" value="${data.name}" name="Name" />
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hệ số lương</h5>
										<input class="panel-form-input" type="number" value="${data.coefficientsSalary}" name="CoefficientsSalary"/>
									</div>

									<!-- Tên tài khoản -->
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hệ số thưởng</h5>
										<input class="panel-form-input" type="number" value="${data.bonusCoefficient}" name="BonusCoefficient" />
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