document.addEventListener('DOMContentLoaded', function () {
	// Khởi tạo fullcalendar
	var calendarEl = document.getElementById('calendar');

	// Ngày cho các sự kiện trên lịch
	var date = new Date();
	var d = date.getDate(),
		m = date.getMonth(),
		y = date.getFullYear();

	var Calendar = FullCalendar.Calendar;
	var Draggable = FullCalendar.Draggable;

	var containerEl = document.getElementById("external-events");
	var checkbox = document.getElementById("drop-remove");
	var calendarEl = document.getElementById("calendar");

	// Sự kiện trên lịch
	var events = [
		{
			title: "Phòng 101 - Đào Công Tuấn",
			start: new Date(y, m, 17, 10, 20),
			end: new Date(y, m, 19, 22, 30),
			backgroundColor: "#42A5F5",
			textColor: "#fff",
			allDay: false,
		},
		{
			title: "Phòng 102 - Nguyễn Thành An",
			start: new Date(y, m, d - 5, 10, 20),
			end: new Date(y, m, d, 22, 30),
			backgroundColor: "#42A5F5",
			textColor: "#fff",
			allDay: false,
		},
		{
			title: "Phòng 103 - Bùi Thanh Tùng",
			start: new Date(y, m, 20, 10, 20),
			end: new Date(y, m, 22, 22, 30),
			backgroundColor: "#42A5F5",
			textColor: "#fff",
			allDay: false,
		},
		{
			title: "Phòng 104 - Diệp Minh Quân",
			start: new Date(y, m, d, 10, 20),
			end: new Date(y, m, d + 3, 22, 30),
			backgroundColor: "#42A5F5",
			textColor: "#fff",
			allDay: false,
		},
	];


	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: "prev,next today",
			right: "title",
			// right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},

		themeSystem: "bootstrap",

		locale: "vi",

		events: events,

		editable: true,

		droppable: true,

		dateClick: function (info) {
			var clickedDate = info.date;
			alert("Bạn đã chọn ngày: " + clickedDate);
		},

		drop: function (info) {
			if (checkbox.checked) {
				info.draggedEl.parentNode.removeChild(info.draggedEl);
			}
		},
	});

	// render giao diện calendar
	calendar.render();

	

	// Bắt sự kiện click của các item trong navbar
	$(".nav-container li").click(function () {
		// Lấy id của item được click
		var view = $(this).attr("id");

		// Thay đổi hiển thị của FullCalendar tùy theo trạng thái mới
		if (view === "month-view") {
			calendar.changeView("dayGridMonth");
		} else if (view === "week-view") {
			calendar.changeView("dayGridWeek");
		} else if (view === "day-view") {
			calendar.changeView("listDay");
		}
	});
});

/* --------------------------------- Main --------------------------------- */
Main();

// Main
function Main() {
	SwitchTabs();
	RoomType();
}

/* --------------------------------- Hàm xử lý sự kiện --------------------------------- */
// M: Xử lý chuyển tab
function SwitchTabs() {
	// Xử animation chuyển tab
	var tabActive = document.querySelector(".nav-item.active");
	var navLine = document.querySelector(".panel-navbar .nav-line");
	var navItem = document.querySelectorAll(".nav-container .nav-item");

	if (tabActive != null) {
		// Cập nhật lại đường line khi chuyển tab
		function LineUpdate(tab) {
			navLine.style.left = tab.offsetLeft + "px";
			navLine.style.width = tab.offsetWidth + "px";
		}

		// line cho tab đầu tiên
		LineUpdate(tabActive);

		// bắt sự kiện click trên mỗi tab

		navItem.forEach((item, index) => {
			item.addEventListener('click', function () {
				document.querySelector(".nav-item.active").classList.remove("active");

				LineUpdate(this);

				this.classList.add("active");
			});
		});
    }
}

// M: Xử lý các chức năng của RoomType
function RoomType() {
	CreateRoomType();
	DeleteRoomType();
}

/* --------------------------------- RoomType --------------------------------- */
// Create RoomType
function CreateRoomType() {
	var roomTypeCreate = document.getElementById('roomType-create')
	if (roomTypeCreate != null) {
		// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
		roomTypeCreate.addEventListener('click', function (e) {
			//var employeeId = $(this).data("employee-id");
			// Gọi Action GetEmployee bằng AJAX
			console.log("mofff");
			$.ajax({
				type: "GET",
				url: "/RoomType/Create", // Đường dẫn tới Action GetEmployee
				//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
				success: function (data) {
					// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
					var employeeDetailsHtml =
						`
							<form method="post" action="RoomType/Create" enctype="multipart/form-data">
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

// Delete RoomType
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
				url: "/RoomType/Delete?roomTypeId=" + employeeId, // Đường dẫn tới Action GetEmployee
				//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
				success: function (data) {
					console.log(data);
					// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
					var employeeDetailsHtml =
						`
						<form method="post" action="RoomType/DeleteById?roomTypeId=${data.roomTypeId}">
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

/* --------------------------------- Staff --------------------------------- */
if (document.getElementById('account-edit') != null) {
	// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
	document.getElementById('account-edit').addEventListener('click', function (e) {
    //var employeeId = $(this).data("employee-id");
    // Gọi Action GetEmployee bằng AJAX
	console.log("mofff");
    $.ajax({
        type: "GET",
        url: "/Staff/Edit", // Đường dẫn tới Action GetEmployee
        //data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
        success: function (data) {
            // Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
            var employeeDetailsHtml = `
                        <!-- Lưu đặt phòng -->
						<div class="panel-save d-flex justify-content-between align-items-center">
							<span>Thêm mới ${data}</span>

							<div class="">
								<a asp-controller="" asp-action="">Lưu</a>
							</div>
						</div>

						<!-- Form -->
						<form class="panel-form">
							<!-- Thông tin -->
							<div class="panel-form-info">
								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Tên tài khoản</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<div class="setting-account">
									<div class="setting-account-title">
										<i class="fa-solid fa-gear"></i>
										<span>Thiết lập quyền hạn</span>
									</div>

									<div class="setting-account-power">
										<div class="setting-account-list">
											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Thuê trả phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý loại phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý tài khoản phụ</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý tài Menu</label>
											</div>
										</div>

										<div class="setting-account-list">
											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Đặt phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Xem lịch sử</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý menu</label>
											</div>
										</div>
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

// Details staff
var accountDetails = document.getElementById('account-details')
if (accountDetails != null) {
	// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
	accountDetails.addEventListener('click', function (e) {
		//var employeeId = $(this).data("employee-id");
		// Gọi Action GetEmployee bằng AJAX
		console.log("mofff");
		$.ajax({
			type: "GET",
			url: "/Staff/Details", // Đường dẫn tới Action GetEmployee
			//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
			success: function (data) {
				// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
				var employeeDetailsHtml =
					`
                        <!-- Lưu đặt phòng -->
						<div class="panel-save d-flex justify-content-between align-items-center">
							<span>Thêm mới ${data}</span>

							<div class="">
								<a asp-controller="" asp-action="">Lưu</a>
							</div>
						</div>

						<!-- Form -->
						<form class="panel-form">
							<!-- Thông tin -->
							<div class="panel-form-info">
								<!-- Tên tài khoản -->
								<a class="panel-form-item" href="/Admin/Index?mS=${12}">
									<h5 class="panel-form-title">Mã nhân viên</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</a>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Tên tài khoản</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<a class="panel-form-item">
									<h5 class="panel-form-title">Tên nhân viên</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</a>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Chức vụ</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<div class="setting-account">
									<div class="setting-account-title">
										<i class="fa-solid fa-gear"></i>
										<span>Thiết lập quyền hạn</span>
									</div>

									<div class="setting-account-power">
										<div class="setting-account-list">
											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Thuê trả phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý loại phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý tài khoản phụ</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý tài Menu</label>
											</div>
										</div>

										<div class="setting-account-list">
											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Đặt phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Xem lịch sử</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý menu</label>
											</div>
										</div>
									</div>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Giới tính</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Ngày sinh</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Số điện thoại</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Địa chỉ</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Email</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
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

// Create staff
var accountCreate = document.getElementById('account-create')
if (accountCreate != null) {
	// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
	accountCreate.addEventListener('click', function (e) {
		//var employeeId = $(this).data("employee-id");
		// Gọi Action GetEmployee bằng AJAX
		console.log("mofff");
		$.ajax({
			type: "GET",
			url: "/Staff/Create", // Đường dẫn tới Action GetEmployee
			//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
			success: function (data) {
				// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
				var employeeDetailsHtml =
					`
                        <!-- Lưu đặt phòng -->
						<div class="panel-save d-flex justify-content-between align-items-center">
							<span>Thêm mới ${data}</span>

							<div class="">
								<a asp-controller="" asp-action="">Lưu</a>
							</div>
						</div>

						<!-- Form -->
						<form class="panel-form">
							<!-- Thông tin -->
							<div class="panel-form-info">
								<!-- Tên tài khoản -->
								<a class="panel-form-item" href="/Admin/Index?mS=${12}">
									<h5 class="panel-form-title">Mã nhân viên</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</a>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Tên tài khoản</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<a class="panel-form-item">
									<h5 class="panel-form-title">Tên nhân viên</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</a>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Chức vụ</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<div class="setting-account">
									<div class="setting-account-title">
										<i class="fa-solid fa-gear"></i>
										<span>Thiết lập quyền hạn</span>
									</div>

									<div class="setting-account-power">
										<div class="setting-account-list">
											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Thuê trả phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý loại phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý tài khoản phụ</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý tài Menu</label>
											</div>
										</div>

										<div class="setting-account-list">
											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Đặt phòng</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Xem lịch sử</label>
											</div>

											<div class="setting-account-item">
												<input type="checkbox" id="" value="" />
												<label for="">Quản lý menu</label>
											</div>
										</div>
									</div>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Giới tính</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Ngày sinh</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Số điện thoại</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Địa chỉ</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
								</div>

								<!-- Tên tài khoản -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Email</h5>
									<input class="panel-form-input" type="text" value="tuandao8826" readonly/>
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
