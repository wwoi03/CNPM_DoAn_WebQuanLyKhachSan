/* --------------------------------- Main --------------------------------- */
Main();

// Main
function Main() {
	FullCalendarLibrary();
	SwitchTabs();
	MoreMenu();
	Navibar()
	RoomType();
	BookRoom();
	Menu();
	Room();
	SetColorClean();

}
function Room() {
	CreateRoom();
	DeleteRoom();
	DetailsRoom();
	EditRoom();
}
/* --------------------------------- Hàm xử lý sự kiện --------------------------------- */
function FullCalendarLibrary() {
	var calendarEl = document.getElementById('calendar');

	if (calendarEl != null) {
		$.ajax({
			type: "GET",
			url: "/BookRoom/GetDataIndex",
			success: function (data) {
				// Khởi tạo fullcalendar

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
					checkOutDate.setDate(checkOutDate.getDate() + 1);

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
						var clickedDate = info.date;

						RenderUIBookRoom(PadDate(clickedDate.getDate(), clickedDate.getMonth(), clickedDate.getFullYear()));
					},

					// Xử sự kiện khi bấm vào từng event
					eventClick: function (info) {
						// Lấy thông tin về sự kiện được chọn
						var eventId = info.event.id;
						console.log(eventId);
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

// M: xử lý sự kiện khi bấm vào một phòng để thêm vào danh sách đặt phòng
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
/* --------------------------------- Xử mấy cái thuê trả phòng --------------------------------- */
// menu mở rộng
function MoreMenu() {
	const showMenuIcons = document.querySelectorAll('.show-menu');
	console.log("44");
	showMenuIcons.forEach(icon => {
		icon.addEventListener('click', function () {
			var m = document.querySelector(".show-menu.active");
			if (m != null)
				m.classList.remove("active")
			icon.classList.toggle('active');
		});
	});
}
function openDialog() {
	document.getElementById("dialog").style.display = "block";
}
function closeDialog() {
	document.getElementById("dialog").style.display = "none";
}
function Navibar() {
	const tabbar = document.querySelectorAll('.book-room-details-tabs');
	const navItem = document.querySelectorAll('.nav-container .nav-item');

	navItem.forEach(function (item, index) {
		item.addEventListener('click', function () {
			document.querySelector('.book-room-details-tabs.active').classList.remove('active');
			console.log("dd: " + index);
			console.log(tabbar[index]);
			tabbar[index].classList.add('active');
        })
	});

}
//
let value = 0;
function Additemmenu() {
		value++;		
		valueDisplay.textContent = value;
}
function subtractionMenu() {
	value--;
	if (value <= 0)
		value = 0;
	valueDisplay.textContent = value;
}
////thêm menu
function AddMenu() {
	$.ajax({
		type: "GET",
		url: "RoomType/Create", // Đường dẫn tới Action GetEmployee
		//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
		success: function (data) {
			// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
			var employeeAddMenuHtml =
				`
							 <form method="post" action="RoomType/Create" enctype="multipart/form-data">
								<!-- Lưu đặt phòng -->
								<div class="panel-save d-flex justify-content-between align-items-center">
									<span>Thêm mới</span>

									<div class="">
										<input type="submit" value="Lưu"/>
									</div>
								</div>

                            <table class="datatable table table-stripped table table-hover table-center mb-0">
                                  <thead>
                                     <tr>
                                          <th>
                                         Tên
                                      </th>
                                      <th>
                                          giá
                                      </th>
                                      <th>
                                          số lượng
                                      </th>
                                        <th>
                                         chỉnh sửa
                                      </th>
                                     </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                         <td>
                                         bánh
                                     </td>
                                     <td>
                                         ngọt
                                     </td>
                                     <td id="valueDisplay">
                                          0
                                        </td>
                                     <td>
                                         <button onClick="Additemmenu()" type="button" class="btn btn-success">
                                            +
                                         </button>
                                         <button onClick="subtractionMenu()" type="button" class="btn btn-danger">
                                            -
                                         </button>
                                     </td>
                                    </tr>

                                  </tbody>
                              </table>
           </form>
                            
								
						`;
			$(".right-panel").html(employeeAddMenuHtml);
		},
		error: function () {
			alert("Đã xảy ra lỗi khi lấy thông t");
		}
	});
}

////nhận phòng
//function Checkin() {
//	var roomId = /* lấy roomId từ nguồn nào đó, có thể là một biến hoặc một phần tử HTML */;

//	$.ajax({
//		url: "/Room/UpdateStatus",
//		type: 'POST',
//		data: { roomiD: roomId }, // Truyền dữ liệu roomId vào yêu cầu POST
//		success: function (response) {
//			console.log('Room status updated successfully:', response);
//			// Thực hiện các hành động khác sau khi cập nhật trạng thái phòng
//		},
//		error: function (error) {
//			console.error('Error updating room status:', error);
//		}
//	});
//}

function ClearRoom() {
	//kiểm tra điều kiên kiện trong database
	document.getElementById("btclearRoom").style.color = "red";
	document.querySelectorAll('card-content1-bottom clean-room')

}
function SetColorClean() {
	//var clear = document.querySelector('.nav-item active')
	$.ajax({
		type: "GET",
		url: "Room/CleanRoom",
		success: function (data) {
			console.log(data);
			// Lặp qua mỗi phần tử chứa dữ liệu
			data.forEach(function (item) {
				var cleanRoomElements = document.querySelectorAll('.clean-room[data-room-id="' + item.roomId + '"]');
				cleanRoomElements.forEach(function (cleanRoomElement) {
					var iconElement = cleanRoomElement.querySelector('i');

					if (item.cleanRoom == null) {
						// Thay đổi thuộc tính class của thẻ <i> thành "fa-solid fa-xmark" và thiết lập màu
						iconElement.className = 'fa-solid fa-xmark';
						iconElement.style.color = '#ff0000';

						var h3Element = cleanRoomElement.querySelector('h3');
						// Thay đổi nội dung văn bản trong thẻ <h3>
						h3Element.textContent = 'Chưa dọn phòng';
						h3Element.style.color = 'red';
					} else {
						// Thay đổi thuộc tính class của thẻ <i> thành "fa-solid fa-check" và thiết lập màu
						iconElement.className = 'fa-solid fa-check fa-2xl';
						iconElement.style.color = '#4fff0f';

						var h3Element = cleanRoomElement.querySelector('h3');
						// Thay đổi nội dung văn bản trong thẻ <h3>
						h3Element.textContent = 'Đã dọn phòng';
						h3Element.style.color = '#4fff0f';
					}
				});
			});
		},
		error: function () {
			alert("Đã xảy ra lỗi khi lấy thông tin");
		}
	});
}



////trả phòng
//function CheckOut{

//}

/* --------------------------------- Kết thúc thuê trả phòng --------------------------------- */
// M: Xử lý các chức năng của BookRoom
function BookRoom() {
	CreateBookRoom();
}

// định dạng chuẩn ngày tháng năm
function PadDate(day, month, year) {
	var newDay = String(day).padStart(2, '0');
	var newMonth = String(month + 1).padStart(2, '0');
	var newYear = String(year).padStart(2, '0');

	var result = {
		day: newDay,
		month: newMonth,
		year: newYear
	};

	return result;
}

// M: Xử lý các chức năng của RoomType
function RoomType() {
	CreateRoomType();
	DeleteRoomType();
	EditRoomType();
	DetailsMenu();

}

// M: Menu
function Menu() {
	CreateMenu();
	EditMenu();
	DeleteMenu();
	DetailsMenu();
}

/* --------------------------------- BookRoom --------------------------------- */
// M: Create BookRoom
function CreateBookRoom() {
	var bookRoomCreate = document.querySelector('.btn-page')
	if (bookRoomCreate != null) {
		// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
		bookRoomCreate.addEventListener('click', function (e) {
			// Gọi Action GetEmployee bằng AJAX
			$.ajax({
				type: "GET",
				url: "/BookRoom/Create", // Đường dẫn tới Action GetEmployee
				//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
				success: function (data) {
					var roomTypes = data.roomTypes;
					var rooms = data.rooms;
					var listRoom = [];

					// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
					var employeeDetailsHtml =
						`
					<form id="form-book-room" method="post" action="BookRoom/Edit">
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
											<input class="panel-form-input" name="CheckInDate" type="date" value="" />
										</div>

										<div class="panel-form-height-item">
											<h5 class="panel-form-title">Ngày trả phòng</h5>
											<input class="panel-form-input" name="CheckOutDate" type="date" value="" />
										</div>
									</div>
								</div>

								<!-- Tiền trả trước -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Tiền trả trước</h5>
									<input class="panel-form-input" type="number" name="PrePayment" placeholder="0.000 đ"/>
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
						`</div>
					</div>
				</form>`;

					// render giao diện
					$(".right-panel").html(employeeDetailsHtml);

					// xử lý các sự kiện
					AddBookRoomDetails();
					AddRoom(listRoom);
				},
				error: function () {
					alert("Đã xảy ra lỗi khi lấy thông t");
				}
			});
			
		});

	}
}

// M: Render UI BookRoom
function RenderUIBookRoom(clickDate) {
	// Ngày tiếp theo
	var specificDate = new Date(clickDate.year + '-' + clickDate.month + '-' + clickDate.day); // Thay thế bằng ngày tháng năm cụ thể của bạn
	var nextDay = new Date(specificDate);
	nextDay.setDate(specificDate.getDate() + 1);
	var nextDateConvert = PadDate(nextDay.getDate(), nextDay.getMonth(), nextDay.getFullYear())

	// ngày nhận phòng, trả phòng
	var checkInDate = clickDate.year + '-' + clickDate.month + '-' + clickDate.day;
	var checkOutDate = nextDateConvert.year + '-' + nextDateConvert.month + '-' + nextDateConvert.day;

	var listRoom = [];
			
	// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
	var employeeDetailsHtml =
		`
			<form method="post" action="BookRoom/Create">
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
							<input class="panel-form-input" name="nameCustomer" type="text" value="" />
						</div>

						<!-- Số điện thoại -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Số điện thoại</h5>
							<input class="panel-form-input" name="phoneCustomer" type="number" value="" />
						</div>

						<!-- CCCD -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Căn cước công dân</h5>
							<input class="panel-form-input" name="cardId" type="number" value="" />
						</div>

						<!-- Ngày -->
						<div class="panel-form-item">
							<div class="panel-form-height">
								<div class="panel-form-height-item">
									<h5 class="panel-form-title">Ngày nhận phòng</h5>
									<input class="panel-form-input" name="CheckInDate" type="date" value="${checkInDate}" />
								</div>

								<div class="panel-form-height-item">
									<h5 class="panel-form-title">Ngày trả phòng</h5>
									<input class="panel-form-input" name="CheckOutDate" type="date" value="${checkOutDate}" />
								</div>
							</div>
						</div>

						<!-- Tiền trả trước -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Tiền trả trước</h5>
							<input class="panel-form-input" type="number" name="PrePayment" placeholder="0.000 đ"/>
						</div>

						<!-- Ghi chú -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Ghi chú</h5>
							<input class="panel-form-input" type="text" name="Note" value="" placeholder=""/>
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
					<div class="panel-form-roomtype">
						<div class="panel-form-roomtype-item">
							<div class="panel-form-roomtype-title">Phòng siêu vip</div>

							<div class="panel-form-roomtype-render">
								<div class="d-flex">
									<div class="row p-0 container-fluid panel-form-roomtype-render-list">
										<div value="101" class="col-2 panel-form-roomtype-render-item">
											101
										</div>

										<div value="102" class="col-2 panel-form-roomtype-render-item">
											102
										</div>

										<div value="103" class="col-2 panel-form-roomtype-render-item">
											103
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="panel-form-roomtype-item">
							<div class="panel-form-roomtype-title">Phòng siêu vip</div>

							<div class="panel-form-roomtype-render">
								<div class="d-flex">
									<div class="row p-0 container-fluid panel-form-roomtype-render-list">
										<div value="104" class="col-2 panel-form-roomtype-render-item">
											104
										</div>

										<div value="105" class="col-2 panel-form-roomtype-render-item">
											105
										</div>

										<div value="106" class="col-2 panel-form-roomtype-render-item">
											106
										</div>
									</div>
								</div>
							</div>
						</div>
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
	/*// Ngày tiếp theo
	var specificDate = new Date(clickDate.year + '-' + clickDate.month + '-' + clickDate.day); // Thay thế bằng ngày tháng năm cụ thể của bạn
	var nextDay = new Date(specificDate);
	nextDay.setDate(specificDate.getDate() + 1);
	var nextDateConvert = PadDate(nextDay.getDate(), nextDay.getMonth(), nextDay.getFullYear())

	// ngày nhận phòng, trả phòng
	var checkInDate = clickDate.year + '-' + clickDate.month + '-' + clickDate.day;
	var checkOutDate = nextDateConvert.year + '-' + nextDateConvert.month + '-' + nextDateConvert.day;*/

	var listRoom = [];

	// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
	$.ajax({
		type: "GET",
		url: "/BookRoom/Edit?bookRoomId=" + bookRoomId, //
		success: function (data) {
			var bookRoom = data.bookRoom;
			var bookRoomDetails = data.bookRoomDetails;
			var roomTypes = data.roomTypes;
			var rooms = data.rooms;

			var employeeDetailsHtml =
				`
					<form id="form-book-room" method="post" action="BookRoom/Edit">
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
											<input class="panel-form-input" name="CheckInDate" type="date" value="" />
										</div>

										<div class="panel-form-height-item">
											<h5 class="panel-form-title">Ngày trả phòng</h5>
											<input class="panel-form-input" name="CheckOutDate" type="date" value="" />
										</div>
									</div>
								</div>

								<!-- Tiền trả trước -->
								<div class="panel-form-item">
									<h5 class="panel-form-title">Tiền trả trước</h5>
									<input class="panel-form-input" type="number" name="PrePayment" value="${bookRoom.prePayment}" placeholder="0.000 đ"/>
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
				<input id="book-room-delete" type="submit" readonly value="Hủy đặt phòng">
			</div>
		</form>`;
							
			// render giao diện
			$(".right-panel").html(employeeDetailsHtml);

			document.getElementById('book-room-delete').addEventListener('click', function () {
				document.getElementById('form-book-room').action = "BookRoom/Delete?bookRoomId=" + bookRoom.bookRoomId;
			});

			// xử lý các sự kiện
			AddBookRoomDetails();
			AddRoom(listRoom);
		}
	});
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
				url: "/RoomType/Delete?roomTypeId=" + employeeId, // Đường dẫn tới Action GetEmployee
				//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
				success: function (data) {
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
				url: "/Room/Create", // Đường dẫn tới Action GetEmployee
				//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
				success: function (data) {
					// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
					var employeeDetailsHtml =
						`
							<form method="post" action="Room/Create" enctype="multipart/form-data">
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
					url: "/Room/Delete?roomId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log(data)
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeDeleteHtml =
							`
						<form method="post" action="Room/DeleteById?roomId=${data.roomId}">
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
/*----------------------------------------details r-------------------------------------------*/
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
					url: "/Room/Details?roomId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log(data);
						console.log("ting");
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeDetailsHtml =
							`
						<form method="post" action="Room/DetailsById?roomId=${data.roomId}">
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
/*------------------------------------ edit room ---------------------------------*/
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
					url: "/Room/EditById?roomId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log(data);
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeEditHtml =
							`
						<form method="post" action="Room/EditById?roomId=${data.roomId}" >
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

									<!-- Tên tài khoản -->
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
										<input class="panel-form-input" type="text" value="${data.CleanRoom}" name="CleanRoom" />
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
					url: "/RoomType/Delete?roomTypeId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
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
					url: "/RoomType/EditById?roomTypeId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log(data);
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeEditHtml =
							`
						<form method="post" action="RoomType/EditById?roomTypeId=${data.roomTypeId}" enctype="multipart/form-data">
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
					url: "/RoomType/Details?roomTypeId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log(data);
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeDetailsHtml =
							`
						<form method="post" action="RoomType/Details?roomTypeId=${data.roomTypeId}">
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
/*-------------------edit-----------------*/
/* --------------------------------- Staff --------------------------------- */
if (document.getElementById('account-edit') != null) {
	// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
	document.getElementById('account-edit').addEventListener('click', function (e) {
    //var employeeId = $(this).data("employee-id");
    // Gọi Action GetEmployee bằng AJAX
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

/* --------------------------------- Menu --------------------------------- */
/*-------------------Create-----------------*/
function CreateMenu() {
	console.log("Quan");
	var menuCreate = document.getElementById('menu-create')
	if (menuCreate != null) {
		// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
		menuCreate.addEventListener('click', function (e) {
			// Gọi Action GetEmployee bằng AJAX
			$.ajax({
				type: "GET",
				url: "/Menu/Create", // Đường dẫn tới Action GetEmployee
				//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
				success: function (data) {
					// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
					var employeeMenuCreateHtml =
						`
							<form method="post" action="Menu/Create" enctype="multipart/form-data">
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

/*-------------------delete-----------------*/
if (document.getElementById('menu-delete') != null) {
	document.getElementById('menu-delete').addEventListener('click', function (e) {
		console.log("Quan");
		$.ajax({
			type: "GET",
			url: "/Menu/Delete",
			success: function (data) {
				var employeeDeleteHtml = `
					<form method="post" action="Menu/Delete">
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
						<a class="btn btn-danger btn-sm" asp-controller="" asp-action="">Hủy bỏ</a>
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
/*-------------------edit-----------------*/
if (document.getElementById('menu-edit') != null) {
	document.getElementById('menu-edit').addEventListener('click', function (e) {
		console.log("Quan");
		$.ajax({
			type: "GET",
			url: "/Menu/Edit",
			success: function (data) {
				var employeeEditHtml = `
					<form method="post" action="Menu/Edit">
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
						<a class="btn btn-info btn-sm" asp-controller="" asp-action="">Hủy bỏ</a>
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
/* --------------------------------- Menu --------------------------------- */
/*-------------------Create-----------------*/
function CreateMenu() {
	console.log("Quan");
	var menuCreate = document.getElementById('menu-create')
	if (menuCreate != null) {
		// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
		menuCreate.addEventListener('click', function (e) {
			// Gọi Action GetEmployee bằng AJAX
			$.ajax({
				type: "GET",
				url: "/Menu/Create", // Đường dẫn tới Action GetEmployee
				//data: { id: employeeId }, // Truyền tham số id cho Action GetEmployee
				success: function (data) {
					// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
					var employeeMenuCreateHtml =
						`
							<form method="post" action="Menu/Create" enctype="multipart/form-data">
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
					url: "/Menu/Delete?menuId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log(data);
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeDeleteHtml =
							`
						<form method="post" action="Menu/DeleteById?menuId=${data.menuId}">
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
					url: "/Menu/Details?menuId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log(data);
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeDetailsHtml =
							`
						<form method="post" action="Menu/Details?menuId=${data.menuId}">
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
					url: "/Menu/EditById?menuId=" + employeeId, // Đường dẫn tới Action GetEmployee
					//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
					success: function (data) {
						console.log(data);
						// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
						var employeeEditHtml =
							`
						<form method="post" action="Menu/EditById?menuId=${data.menuId}" enctype="multipart/form-data">
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