document.addEventListener('DOMContentLoaded', function () {
	Main();

	// Main
	function Main() {
		SwitchTabs();
		MoreMenu();
		Navibar()
		SetColorClean();

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
});