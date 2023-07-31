$(function () {

	/* initialize the external events
	 -----------------------------------------------------------------*/
	function ini_events(ele) {
		ele.each(function () {

			// create an Event Object (https://fullcalendar.io/docs/event-object)
			// it doesn't need to have a start or end
			var eventObject = {
				title: $.trim($(this).text()) // use the element's text as the event title
			}

			// store the Event Object in the DOM element so we can get to it later
			$(this).data('eventObject', eventObject)

			// make the event draggable using jQuery UI
			$(this).draggable({
				zIndex: 1070,
				revert: true, // will cause the event to go back to its
				revertDuration: 0  //  original position after the drag
			})

		})
	}

	ini_events($('#external-events div.external-event'))

	/* initialize the calendar
	 -----------------------------------------------------------------*/
	//Date for the calendar events (dummy data)
	var date = new Date()
	var d = date.getDate(),
		m = date.getMonth(),
		y = date.getFullYear()

	var Calendar = FullCalendar.Calendar;
	var Draggable = FullCalendar.Draggable;

	var containerEl = document.getElementById('external-events');
	var checkbox = document.getElementById('drop-remove');
	var calendarEl = document.getElementById('calendar');

	var tabActive = document.querySelector('.nav-item.active');
	var navLine = document.querySelector('.panel-navbar .nav-line');

	// Chuyển line
	function LineUpdate(tab) {
		navLine.style.left = tab.offsetLeft + 'px';
		navLine.style.width = tab.offsetWidth + 'px';
	}

	LineUpdate(tabActive);

	$('.nav-container .nav-item').click(function () {
		document.querySelector('.nav-item.active').classList.remove('active');

		LineUpdate(this);

		this.classList.add('active');
	})

	// initialize the external events
	// -----------------------------------------------------------------

	new Draggable(containerEl, {
		itemSelector: '.external-event',
		eventData: function (eventEl) {
			return {
				title: eventEl.innerText,
				backgroundColor: window.getComputedStyle(eventEl, null).getPropertyValue('background-color'),
				borderColor: window.getComputedStyle(eventEl, null).getPropertyValue('background-color'),
				textColor: window.getComputedStyle(eventEl, null).getPropertyValue('color'),
			};
		}
	});

	var events = [
		{
			title: 'Phòng 101 - Đào Công Tuấn',
			start: new Date(y, m, 17, 10, 20),
			end: new Date(y, m, 19,22, 30),
			backgroundColor: '#42A5F5',
			textColor: '#fff',
			allDay: false,
		},
		{
			title: 'Phòng 102 - Nguyễn Thành An',
			start: new Date(y, m, d - 5, 10, 20),
			end: new Date(y, m, d, 22, 30),
			backgroundColor: '#42A5F5',
			textColor: '#fff',
			allDay: false,
		},
		{
			title: 'Phòng 103 - Bùi Thanh Tùng',
			start: new Date(y, m, 20, 10, 20),
			end: new Date(y, m, 22, 22, 30),
			backgroundColor: '#42A5F5',
			textColor: '#fff',
			allDay: false,
		},
		{
			title: 'Phòng 104 - Diệp Minh Quân',
			start: new Date(y, m, d, 10, 20),
			end: new Date(y, m, d + 3, 22, 30),
			backgroundColor: '#42A5F5',
			textColor: '#fff',
			allDay: false,
		},
	];

	var calendar = new Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next today',
			right: 'title',
			// right: 'dayGridMonth,timeGridWeek,timeGridDay'
		},

		themeSystem: 'bootstrap',

		locale: 'vi',

		events: events,

		editable: true,

		droppable: true,

		dateClick: function (info) {
			var clickedDate = info.date;
			alert('Bạn đã chọn ngày: ' + clickedDate);
		},

		drop: function (info) {
			if (checkbox.checked) {
				info.draggedEl.parentNode.removeChild(info.draggedEl);
			}
		},
	});

	calendar.render();
	// $('#calendar').fullCalendar()

	// Bắt sự kiện click của các item trong navbar
	$('.nav-container li').click(function () {
		// Lấy id của item được click
		var view = $(this).attr('id');

		// Thay đổi trạng thái hiện tại của FullCalendar
		//currentView = view;

		// Thay đổi hiển thị của FullCalendar tùy theo trạng thái mới
		if (view === 'month-view') {
			calendar.changeView('dayGridMonth');
		} else if (view === 'week-view') {
			calendar.changeView('dayGridWeek');
		} else if (view === 'day-view') {
			calendar.changeView('listDay');
		}
	});

	/* ADDING EVENTS */
	var currColor = '#3c8dbc' //Red by default
	// Color chooser button
	$('#color-chooser > li > a').click(function (e) {
		e.preventDefault()
		// Save color
		currColor = $(this).css('color')
		// Add color effect to button
		$('#add-new-event').css({
			'background-color': currColor,
			'border-color': currColor
		})
	})
	$('#add-new-event').click(function (e) {
		e.preventDefault()
		// Get value and make sure it is not null
		var val = $('#new-event').val()
		if (val.length == 0) {
			return
		}

		// Create events
		var event = $('<div />')
		event.css({
			'background-color': currColor,
			'border-color': currColor,
			'color': '#000'
		}).addClass('external-event')
		event.text(val)
		$('#external-events').prepend(event)

		// Add draggable funtionality
		ini_events(event)

		// Remove event from text input
		$('#new-event').val('')
	})

	$('.btn-page').click(function (e) {
		$('.right-panel').toggleClass("active");
	})

	
})

// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
document.getElementById('account-edit').addEventListener('click', function (e) {
	//var employeeId = $(this).data("employee-id");
	console.log("fkjsdhfsk");
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
			alert("Đã xảy ra lỗi khi lấy thông tin nhân viên.");
		}
	});
});

const showOptionsButton = document.getElementById('showOptionsButton');
const options = document.querySelectorAll('.options');

let isOptionsVisible = false;

showOptionsButton.addEventListener('click', function () {
	if (isOptionsVisible) {
		options.forEach(option => {
			option.style.display = 'none';
		});
	} else {
		options.forEach(option => {
			option.style.display = 'block';
		});
	}

	isOptionsVisible = !isOptionsVisible;
});