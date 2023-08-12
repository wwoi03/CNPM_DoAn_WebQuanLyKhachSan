document.addEventListener('DOMContentLoaded', function () {
	Main();

	// Main
	function Main() {
		RoomType();
	}

	// M: Xử lý các chức năng của RoomType
	function RoomType() {
		var tbodyShare = document.querySelector('.tbody-share');

		if (tbodyShare != null) {
			$.ajax({
				type: "GET",
				url: "../../RoomType/RoomTypes",
				success: function (data) {
					var roomTypes = data;

					RenderRoomTypes(roomTypes);

					SearchRoomType();
					CreateRoomType();
					DeleteRoomType();
					//DetailsRoomType();
					//EditRoomType();
				},
				error: {

				}
			});
		};
	}

	/* -----------------------------------------------  ----------------------------------------------- */
	// M: Tìm kiếm
	function SearchRoomType() {
		var submitButton = document.getElementById('submit-button');
		var searchInput = document.getElementById('search-input');

		searchInput.oninput = function (e) {
			var searchString = searchInput.value;

			$.ajax({
				type: "GET",
				url: "../../RoomType/RoomTypes",
				data: { searchString: searchString },
				success: function (data) {
					var roomTypes = data;

					RenderRoomTypes(roomTypes);
				},
				error: function () {

				}
			})
        }

		if (submitButton != null) {
			submitButton.addEventListener('click', function () {
				var searchString = searchInput.value;
				console.log(searchString)
				$.ajax({
					type: "GET",
					url: "../../RoomType/RoomTypes",
					data: { searchString: searchString },
					success: function (data) {
						var roomTypes = data;

						RenderRoomTypes(roomTypes);
					},
					error: function () {

                    }
                })
			});
        }
	}

	// M: Xử lý Create
	function CreateRoomType() {
		// Get
		var roomTypeCreate = document.getElementById('roomType-create')
		if (roomTypeCreate != null) {
			roomTypeCreate.addEventListener('click', function () {
				GetCreateRoomType();
			});
		}

		// Post
		var sumbitInput = document.querySelector('#submit-input');
		if (sumbitInput != null) {

        }
	}

	// M: Xử lý Delete
	function DeleteRoomType() {
		// Get
		var roomTypeDelete = document.querySelectorAll('.roomType-delete')

		if (roomTypeDelete != null) {
			roomTypeDelete.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var roomTypeId = $(this).data('room-type-id');

					GetDeleteRoomType(roomTypeId);

					// Post
					var sumbitInput = document.querySelector('#submit-input');

					if (sumbitInput != null) {
						sumbitInput.addEventListener('click', function () {
							var roomTypeId = $(this).data('room-type-id');
							PostDeleteRoomType(roomTypeId);
						})
					}
				});
			});
        }
    }

	/* ----------------------------------------------- GET - POST ----------------------------------------------- */
	// M: Render List RoomType
	function RenderRoomTypes(roomTypes) {
		var html = "";
		
		roomTypes.forEach(function (item, index) {
			html +=
				`<tr>
					<td>${item.roomTypeId}</td>
					<td>${item.name}</td>
					<td>${item.price}</td>
					<td>${item.bedNumber}</td>
					<td>
						<img class="img-100w-50h" src="/images/${item.image}">
					</td>
					<td>
						<a data-room-type-id="${item.roomTypeId}" class="btn btn-primary btn-sm roomType-details">
							<i class="fas fa-pencil-alt"></i>
							Chi Tiết
						</a>

						<a data-room-type-id="${item.roomTypeId}" class="btn btn-info btn-sm roomType-edit">
							<i class="fas fa-pencil-alt"></i>
							Chỉnh sửa
						</a>

						<a data-room-type-id="${item.roomTypeId}" class="btn btn-danger btn-sm roomType-delete"  >
							<i class="fas fa-pencil-alt"></i>
							Xóa
						</a>
					</td>
				</tr>`;
		});

		$('.tbody-share').html(html);
    }

	// M: Get Create RoomType
	function GetCreateRoomType() {
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
								<input id="submit-input" type="submit" value="Lưu"/>
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
	}

	// M: Post Create RoomType
	function PostCreateRoomType() {
		$.ajax({
			type: "POST",
			url: "../../RoomType/Create",
		});
	}

	// M: Delete RoomType
	function GetDeleteRoomType(roomTypeId) {
		// Gọi Action GetEmployee bằng AJAX
		$.ajax({
			type: "GET",
			url: "../../RoomType/Delete",
			data: { roomTypeId: roomTypeId }, // định dạng dữ liệu như một Json
			async: false, // chạy đồng bộ
			success: function (data) {
				// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
				var employeeDetailsHtml =
					`
					<form>
						<!-- Lưu đặt phòng -->
						<div class="panel-save d-flex justify-content-between align-items-center">
							<span>Xóa loại phòng</span>

							<div class="">
								<p id="submit-input" data-room-type-id="${data.roomTypeId}">Xóa</p>
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
									<img src ="/images/${data.image}" style="width: 100%"/>
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
	}

	// M: Post Delete RoomType
	function PostDeleteRoomType(roomTypeId) {
		$.ajax({
			type: "POST",
			url: "../../RoomType/DeleteById",
			data: { roomTypeId: roomTypeId },
			success: function (data) {
				ClearPanelRight();
				RenderRoomTypes(data);
				DeleteRoomType();
			},
			error: function () {

            }
		});
    }

	// M: Edit RoomType
	function GetEditRoomType() {
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

									<div class="panel-form-item">
										<h5 class="panel-form-title">Mô Tả</h5>
										<input class="panel-form-input" type="text" value="${data.description}" name="Description"/>
									</div>
									<div class="panel-form-item">
										<h5 class="panel-form-title">Hình Ảnh </h5>
										<input class="panel-form-input" accept="image/*" type="file" name="ImageFile"/>
										<input class="panel-form-input"  name="Image" value="${data.image}" hidden/>
										<img src ="/images/${data.image}" name="ImageFile" style="width: 100%"/>
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

	// M: Details RoomType
	function GetDetailsRoomType() {
		var detailsRoomType = document.querySelectorAll('.roomType-details');

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
										<img src ="/images/${data.image}" style="width: 100%"/>
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

	/* ----------------------------------------------- GET - POST ----------------------------------------------- */
	// M: Xóa giao diện panel-right
	function ClearPanelRight() {
		$(".right-panel").html("");
	};
});