document.addEventListener('DOMContentLoaded', function () {
	Main();

	// Main
	function Main() {
		SwitchTabs();
		MoreMenu();
		Navibar()
		SetColorClean();
		CheckIn();
		ClickCheckOut();
	}

	// M: Xử lý chuyển tab
	function SwitchTabs() {
		console.log("a");
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

	function ClickCheckOut() {
		var clickCheckout = document.querySelectorAll('.click-checkout');

		if (clickCheckout != null) {
			clickCheckout.forEach((item, index) => {
				item.addEventListener('click', function () {
					console.log("dsa")
					var id = $(this).data('checkout-id');
					console.log(id + "pppppppp")

					FormCheckOut(id);
				})
			})
		}
	}

	function FormCheckOut(id) {
		$.ajax({
			type: "GET",
			url: "../../BookRoomDetails/GetCheckOut?bookRoomDetailsId=" + id,
			success: function (data) {
				var customer = data.customer;
				var bookRoom = data.bookRoom;
				console.log(data);
				; var html = `
		<form id="form-book-room" method="post"  action="../../BookRoomDetails/PostCheckOut?bookRoomDetailsId=${bookRoom.bookRoomDetailsId}">
			<!-- Lưu đặt phòng -->
			<div class="panel-save d-flex justify-content-between align-items-center">
				<span>Trả phòng</span>

				<div class="">
					<input id="input-submit" type="submit" value="Lưu" />
				</div>
			</div>

			<!-- Form -->
			<div class="panel-form">
				<!-- Thông tin -->
				<div class="panel-form-info">

					<!-- Tên khách hàng -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Phòng</h5>
						<input class="panel-form-input" name="nameCustomer" value="${bookRoom.room.roomId}" type="text" />
					</div>

					<!-- Tên khách hàng -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Họ và tên khách hàng</h5>
						<input class="panel-form-input" name="nameCustomer" value="${customer.name}" type="text" />
					</div>

					<!-- Ngày -->
					<div class="panel-form-item">
						<div class="panel-form-height">
							<div class="panel-form-height-item">
								<h5 class="panel-form-title">Ngày nhận phòng</h5>
								<input class="panel-form-input" name="CheckInDate"  value="${bookRoom.checkInDate}" type="datetime-local"
									value="" />
							</div>

							<div class="panel-form-height-item">
								<h5 class="panel-form-title">Ngày trả phòng</h5>
								<input class="panel-form-input" name="CheckOutDate" value="${bookRoom.checkOutDate}" type="datetime-local"
									value="" />
							</div>
						</div>
					</div>

					<!-- Tiền trả trước -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Tổng tiền</h5>
						<input class="panel-form-input" type="number"value="${bookRoom.bookRoom.prePayment}" name="PrePayment" id="form-input-money"
							placeholder="0.000 đ" />
					</div>

					<!-- Ghi chú -->
					<div class="panel-form-item">
						<h5 class="panel-form-title">Ghi chú</h5>
						<input class="panel-form-input" type="text" name="Note" placeholder="" />
					</div>
				</div>
			</div>
		</form >
	`;
				$(".right-panel").html(html);
			},
			error: function () {

			}
		});

	}


	function SetColorClean() {
		$.ajax({
			type: "GET",
			url: "../../BookRoomDetails/CleanRoom",
			success: function (data) {
				console.log(data);

				// Lặp qua mỗi phần tử chứa dữ liệu
				data.forEach(function (item) {

					var cleanRoomElement = document.querySelector('.clean-room[data-room-id="' + item.room.roomId + '"]');

					if (cleanRoomElement) {
						var iconElement = cleanRoomElement.querySelector('i');
						var h3Element = cleanRoomElement.querySelector('h3');

						//console.log(item.room.roomId);
						//console.log(item.room.cleanRoom + "hehe");
						if (item.room.cleanRoom == 0) {

							// Thay đổi thuộc tính class của thẻ <i> thành "fa-solid fa-xmark" và thiết lập màu
							iconElement.className = 'fa-solid fa-xmark';
							iconElement.style.color = '#ff0000';

							// Thay đổi nội dung văn bản trong thẻ <h3>
							h3Element.textContent = 'Chưa dọn phòng';
							h3Element.style.color = 'red';
						} else if (tem.room.cleanRoom = 1) {
							// Thay đổi thuộc tính class của thẻ <i> thành "fa-solid fa-check" và thiết lập màu
							iconElement.className = 'fa-solid fa-check fa-2xl';
							iconElement.style.color = '#4fff0f';

							// Thay đổi nội dung văn bản trong thẻ <h3>
							h3Element.textContent = 'Đã dọn phòng';
							h3Element.style.color = '#4fff0f';
						} else {
							// Thay đổi thuộc tính class của thẻ <i> thành "fa-solid fa-check" và thiết lập màu
							iconElement.className = 'fa-solid fa-check fa-2xl';
							iconElement.style.color = 'yellow';

							// Thay đổi nội dung văn bản trong thẻ <h3>
							h3Element.textContent = 'Đã dọn phòng';
							h3Element.style.color = 'yellow';
						}
					}

				});
			},
			error: function () {
				alert("lỗi clean");
			}
		});
	}




	////trả phòng
	//function CheckOut{

	//}

	/* --------------------------------- Kết thúc thuê trả phòng --------------------------------- */
});
function openDialog() {
	document.getElementById("dialog").style.display = "block";
}
function closeDialog() {
	document.getElementById("dialog").style.display = "none";
}
function AddMenu() {
	$.ajax({
		type: "GET",
		url: "../../RoomType/Create", // Đường dẫn tới Action GetEmployee
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

function PostCheckIn(bookRoomDetailsId) {
	$.ajax({
		type: "POST",
		url: "../../BookRoomDetails/CheckIn?bookRoomDetailsId=" + bookRoomDetailsId,
		success: function (data) {
			console.log(data);
		},
		error: function () {

		}
	});
}

function CheckIn() {
	var checkin = document.querySelector('checkin');

	if (checkin != null) {
		checkin.addEventListener('click', function () {
			var employeeId = $(this).data('br-id');
			PostCheckIn(employeeId);
		});
	}
}