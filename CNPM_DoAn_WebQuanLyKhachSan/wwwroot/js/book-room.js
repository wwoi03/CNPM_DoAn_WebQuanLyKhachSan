document.addEventListener('DOMContentLoaded', function () {
	/* --------------------------------- Main --------------------------------- */
	Main();

	// Main
	function Main() {
		BookRoom();
	}

	// M: Xử lý các chức năng của BookRoom
	function BookRoom() {
		FullCalendarLibrary();
		CreateBookRoom();
	}

	// M: Fullcalendar
	function FullCalendarLibrary() {
		var calendarEl = document.getElementById('calendar');

		if (calendarEl != null) {
			$.ajax({
				type: "GET",
				url: "../../BookRoom/GetDataIndex",
				success: function (data) {

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
						/*{
							id: 101,
							title: "Phòng 101 - Đào Công Tuấn",
							start: new Date(y, m, 17, 10, 20),
							end: new Date(y, m, 19, 22, 30),
							backgroundColor: "#42A5F5",
							textColor: "#fff",
							allDay: false,
						},*/

					];

					function addEvent(_id, _tittle, _start, _end) {
						var checkInDate = new Date(_start);
						var checkOutDate = new Date(_end);
						checkOutDate.setDate(checkOutDate.getDate());

						var newEvent = {
							id: _id,
							title: _tittle,
							start: checkInDate,
							end: checkOutDate,
							allDay: false,
							backgroundColor: "#42A5F5 !important",
							textColor: "#fff"
						};

						return newEvent;
					};

					data.forEach(function (item) {
						events.push(addEvent(item.bookRoomId, item.customer.name, item.checkInDate, item.checkOutDate));
					});

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

						// xử lý sự kiện khi bấm vào từng date
						dateClick: function (info) {
							// lấy ngày
							var infoDate = info.date;

							var newDate = new Date();
							newDate.setFullYear(infoDate.getFullYear());
							newDate.setMonth(infoDate.getMonth());
							newDate.setDate(infoDate.getDate());

							var date = setDateTime(newDate);

							// sử dụng ajax để gọi đến action bên controller
							$.ajax({
								type: "GET",
								url: "../../BookRoom/Create",
								success: function (data) {
									console.log("dada");
									var roomTypes = data.roomTypes;
									var rooms = data.rooms;
									RenderFormBookRoom(date, roomTypes, rooms);
								},
								error: function () {
									alert("Không thể lấy được thông tin");
								}
							});
						},

						// Xử sự kiện khi bấm vào từng event
						eventClick: function (info) {
							// Lấy thông tin về sự kiện được chọn
							var eventId = info.event.id;
							EditBookRoom(eventId);
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
				},
				error: function () {
					alert("Đã xảy ra lỗi khi lấy thông tin");
				}
			});
		}
	}

	// M: Create BookRoom
	function CreateBookRoom() {
		var bookRoomCreate = document.querySelector('.btn-page')
		if (bookRoomCreate != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			bookRoomCreate.addEventListener('click', function (e) {
				// Gọi Action GetEmployee bằng AJAX
				$.ajax({
					type: "GET",
					url: "../../BookRoom/Create", // Đường dẫn tới Action GetEmployee
					//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						var roomTypes = data.roomTypes;
						var rooms = data.rooms;


						RenderFormBookRoom('', roomTypes, rooms);
					},
					error: function () {
						alert("Đã xảy ra lỗi khi lấy thông t");
					}
				});

			});

		}
	}

	// M: Render UI BookRoom
	function RenderFormBookRoom(date, roomTypes, rooms) {
		// ngày nhận phòng, trả phòng
		var checkInDate = date;
		var checkOutDate = setDateTime(NextDay(date));

		// lưu danh sách phòng khách hàng đặt
		var listRoom = [];

		// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
		var employeeDetailsHtml =
			`
			<form id="form-book-room" method="post" action="../../BookRoom/Create">
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
						<!-- Tên khách hàng -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Họ và tên khách hàng</h5>
							<input class="panel-form-input" name="nameCustomer" type="text" />
						</div>

						<!-- Số điện thoại -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Số điện thoại</h5>
							<input class="panel-form-input" name="phoneCustomer" type="number"/>
						</div>

						<!-- CCCD -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Căn cước công dân</h5>
							<input class="panel-form-input" name="cardId" type="number" />
						</div>

						<!-- Ngày -->
						<div class="panel-form-item">
							<div class="panel-form-height">
								<div class="panel-form-height-item">
									<h5 class="panel-form-title">Ngày nhận phòng</h5>
									<input class="panel-form-input" name="CheckInDate" type="datetime-local" value="${checkInDate != null ? checkInDate : ""}" />
								</div>

								<div class="panel-form-height-item">
									<h5 class="panel-form-title">Ngày trả phòng</h5>
									<input class="panel-form-input" name="CheckOutDate" type="datetime-local" value="${checkOutDate != null ? checkOutDate : ""}" />
								</div>
							</div>
						</div>

						<!-- Tiền trả trước -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Tiền trả trước</h5>
							<input class="panel-form-input" type="number" name="PrePayment" id="form-input-money" placeholder="0.000 đ"/>
						</div>

						<!-- Ghi chú -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Ghi chú</h5>
							<input class="panel-form-input" type="text" name="Note" placeholder=""/>
						</div>
					</div>

					<!-- Phòng -->
					<div class="panel-form-room">
						<div class="panel-form-room-item">
							<h5 class="panel-form-title">Thêm phòng</h5>

							<div class="panel-form-add-room">
								<i class="fa-solid fa-square-plus"></i>
								<p class="panel-form-room-btn">Thêm phòng</p>
								<input id="list-room-string" hidden name="listRoomString"/>
							</div>
						</div>
					</div>

					<!-- Danh sách phòng theo loại-->
					<div class="panel-form-roomtype">`;

		roomTypes.forEach(function (itemRT, index) {
			// Tên loại phòng
			employeeDetailsHtml +=
				`
				<div class="panel-form-roomtype-item">
					<div class="panel-form-roomtype-title">${itemRT.name}</div>

					<div class="panel-form-roomtype-render">
						<div class="d-flex">
							<div class="row p-0 container-fluid panel-form-roomtype-render-list">
			`;

			var nextItemHtml = ``;

			// Phòng
			rooms.forEach(function (itemR, index) {
				if (itemRT.roomTypeId == itemR.roomTypeId) {
					nextItemHtml +=
						`
						<div value="${itemR.roomId}" class="col-2 panel-form-roomtype-render-item">
							${itemR.roomId}
						</div>
					`;
				}
			});

			employeeDetailsHtml += nextItemHtml;

			employeeDetailsHtml +=
				`
					</div>
				</div>
			</div> 
		</div>
		`;
		})

		employeeDetailsHtml +=
			`
				</div>
			</div>
		</form>
		`;

		// render giao diện
		$(".right-panel").html(employeeDetailsHtml);

		// xử lý các sự kiện
		AddBookRoomDetails();
		AddRoom(listRoom);
	}

	// M: Edit BookRoom
	function EditBookRoom(bookRoomId) {
		var listRoom = [];

		// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
		$.ajax({
			type: "GET",
			url: "../../BookRoom/Edit?bookRoomId=" + bookRoomId, //
			success: function (data) {
				var bookRoom = data.bookRoom;
				var bookRoomDetails = data.bookRoomDetails;
				var roomTypes = data.roomTypes;
				var rooms = data.rooms;

				var d = new Date(bookRoom.checkInDate);
				console.log(d);

				var employeeDetailsHtml =
					`
					<form id="form-book-room" method="post" action="../../BookRoom/Edit">
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
								<!-- Tên khách hàng -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Họ và tên khách hàng</h5>
									<input class="panel-form-input" name="nameCustomer" type="text" value="${bookRoom.customer.name}" />
								</div>

								<!-- Số điện thoại -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Số điện thoại</h5>
									<input class="panel-form-input" name="phoneCustomer" type="number" value="${bookRoom.customer.phone}" />
								</div>

								<!-- CCCD -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Căn cước công dân</h5>
									<input class="panel-form-input" name="cardId" type="number" value="${bookRoom.customer.cardId}" />
								</div>

								<!-- Ngày -->
								<div class="panel-form-item">
									<div class="panel-form-height">
										<div class="panel-form-height-item">
											<h5 class="panel-form-title">Ngày nhận phòng</h5>
											<input class="panel-form-input" name="CheckInDate" type="datetime-local" value="${bookRoom.checkInDate}" />
										</div>

										<div class="panel-form-height-item">
											<h5 class="panel-form-title">Ngày trả phòng</h5>
											<input class="panel-form-input" name="CheckOutDate" type="datetime-local" value="${bookRoom.checkOutDate}" />
										</div>
									</div>
								</div>

								<!-- Tiền trả trước -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Tiền trả trước</h5>
									<input class="panel-form-input" type="number" name="PrePayment" id="form-input-money" value="${bookRoom.prePayment}" placeholder="0.000 đ"/>
								</div>

								<!-- Ghi chú -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Ghi chú</h5>
									<input class="panel-form-input" type="text" name="Note" value="${bookRoom.note}" placeholder=""/>
								</div>
							</div>

							<!-- Phòng -->
							<div class="panel-form-room">
								<div class="panel-form-room-item">
									<h5 class="panel-form-title">Thêm phòng</h5>

									<div class="panel-form-add-room">
										<i class="fa-solid fa-square-plus"></i>
										<p class="panel-form-room-btn">Thêm phòng</p>
										<input id="list-room-string" hidden name="listRoomString"/>
									</div>
								</div>
							</div>

							<!-- Danh sách phòng theo loại-->
							<div class="panel-form-roomtype">`;

				roomTypes.forEach(function (itemRT, index) {
					// Tên loại phòng
					employeeDetailsHtml +=
						`
						<div class="panel-form-roomtype-item">
							<div class="panel-form-roomtype-title">${itemRT.name}</div>

							<div class="panel-form-roomtype-render">
								<div class="d-flex">
									<div class="row p-0 container-fluid panel-form-roomtype-render-list">
					`;

					var nextItemHtml = ``;

					// Phòng
					rooms.forEach(function (itemR, index) {
						if (itemR.roomTypeId == itemRT.roomTypeId) {
							var checkCount = 0;
							bookRoomDetails.forEach(function (itemBRD, index) {
								if (itemR.roomId == itemBRD.room.roomId) {
									nextItemHtml +=
										`
										<div value="${itemR.roomId}" class="col-2 panel-form-roomtype-render-item active">
											${itemR.roomId}
										</div>
									`;
									listRoom.push(String(itemR.roomId));
									checkCount++;
									return;
								}
							})

							// Kiểm tra nếu phòng
							if (checkCount == 0) {
								nextItemHtml +=
									`
									<div value="${itemR.roomId}" class="col-2 panel-form-roomtype-render-item">
										${itemR.roomId}
									</div>
								`;
							}
						}
					})

					employeeDetailsHtml += nextItemHtml;

					employeeDetailsHtml +=
						`
							</div>
						</div>
					</div> 
				</div>
					`;
				})

				employeeDetailsHtml +=
					`</div>
				</div>

				<div class="panel-cancel-room">
					<input id="book-room-delete" readonly value="Hủy đặt phòng">
				</div>
			</form>`;

				// render giao diện
				$(".right-panel").html(employeeDetailsHtml);


				document.getElementById('book-room-delete').addEventListener('click', function () {
					DeleteBookRoom(bookRoom.bookRoomId)
				});

				// xử lý các sự kiện
				AddBookRoomDetails();
				AddRoom(listRoom);
			}
		});
	}

	// Delete BookRoom
	function DeleteBookRoom(bookRoomId) {
		$.ajax({
			type: "POST",
			url: "../../BookRoom/Delete?bookRoomId=" + bookRoomId,
			success: function (data) {
				// Reload trang web
				location.reload();
			},
			error: function () {

            }
		});
    }

	/* ------------------------------- Xử lý các sự kiện ------------------------------- */
	// M: Xử lý khi bấm vào nút thêm phòng
	function AddBookRoomDetails() {
		var addRoom = document.querySelector('.panel-form-add-room');
		var panelFormRoomType = document.querySelector('.panel-form-roomtype');

		if (addRoom != null) {
			addRoom.addEventListener('click', function () {
				panelFormRoomType.classList.toggle('active');
			});
		}
	}

	// M: Xử lý sự kiện khi bấm vào một phòng để thêm vào danh sách đặt phòng
	function AddRoom(listRoom) {
		var roomItem = document.querySelectorAll('.panel-form-roomtype-render-item');
		var listRoomString = document.getElementById('list-room-string');

		// duyệt từng roomItem
		roomItem.forEach((item, index) => {
			item.addEventListener('click', function (e) {
				if (item.classList.contains('active')) {
					item.classList.remove('active');
					listRoom.splice(listRoom.indexOf(item.getAttribute('value')), 1);
				} else {
					item.classList.add('active');
					listRoom.push(item.getAttribute('value'));
				}
				console.log(listRoom);

				listRoomString.setAttribute('value', listRoom.join(','));
			});
		});

	}

	// M: Hàm tính ngày tiếp theo
	function NextDay(date) {
		var nextDay = new Date(date);
		nextDay.setDate(nextDay.getDate() + 1);

		return nextDay;
	}

	// M: Hàm định dạng ngày giờ
	function setDateTime(date) {
		// Lấy thời gian hiện tại
		const currentDate = new Date(date);

		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');

		// Gán giá trị vào input
		const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

		return formattedDate;
	}
});