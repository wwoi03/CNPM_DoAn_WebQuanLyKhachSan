document.addEventListener('DOMContentLoaded', function () {
	//********************************************************************************
	/* --------------------------------- History --------------------------------- */

	Main()

	function Main() {
		History();
		adminLayout();
    }

	function History() {
		EditHistory();
		DetailsHistory();
    }


	//Edit



	function EditHistory() {
		var editHistory = document.querySelectorAll('.history-edit')
		if (editHistory != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			editHistory.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('history-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "/History/Edit?id=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDetailsHtml =
								`
						<form method="post" action="History/EditPost?id=${data.billId}">

		<!-- Lưu đặt phòng -->
				<div class="panel-save d-flex justify-content-between align-items-center">
					<span >Chỉnh sửa hóa đơn </span>

					<div class="">
						<input type="submit" value="Lưu"/>
					</div>
				</div>

				<!-- Form -->
				<form class="panel-form">
					<!-- Thông tin -->
					<div class="panel-form-info">

<!-- Hoá đơn -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Hóa đơn phòng</h5>
							<input class="panel-form-input" type="text" name="BillId" value="${data.billId}" readonly />
						</div>

					


						<!-- Phòng -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Phòng</h5>
							<input class="panel-form-input" type="text" name="RoomId" value="${data.bookRoomDetails.roomID}" />
						</div>
	<div class="panel-form-item">
							<h5 class="panel-form-title">Id thanh toan</h5>
							<input class="panel-form-input" type="text" name="PaymentId" value="${data.paymentId}" />
						</div>

						<!-- Ngày -->
						<div class="panel-form-item">
							<div class="panel-form-height">
								<div class="panel-form-height-item">
									<h5 class="panel-form-title">Ngày nhận phòng</h5>
									<input class="panel-form-input" type="datetime-local" name="CheckInDate" value="${data.checkInDate}" />
								</div>

								<div class="panel-form-height-item">
									<h5 class="panel-form-title">Ngày trả phòng</h5>
									<input class="panel-form-input" type="datetime-local" name="CheckOutDate" value="${data.checkOutDate}" />
								</div>
							</div>
						</div>

						<!-- Số tiền đã thanh toán -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Số tiền thanh toán</h5>
							<input class="panel-form-input" type="number" name="TotalPriceBill" value="${data.totalPriceBill}" placeholder="0.000 đ" />
						</div>

<div class="panel-form-item">
							<h5 class="panel-form-title">Số tiền thanh toán</h5>
							<input class="panel-form-input" type="number" name="TotalPriceMenu" value="${data.totalPriceMenu}" placeholder="0.000 đ" />
						</div>

<div class="panel-form-item">
							<h5 class="panel-form-title">Số tiền thanh toán</h5>
							<input class="panel-form-input" type="number" name="PriceRoom" value="${data.priceRoom}" placeholder="0.000 đ" />
						</div>
						<!-- Ghi chú -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Ghi chú</h5>
							<input class="panel-form-input" type="text" name="Note" value="${data.note}" placeholder="" />
						</div>
					</div>


				</form>
								</form>
							`;
							$(".right-panel").html(employeeDetailsHtml);
						},
						error: function () {
							alert("Đã xảy ra lỗi khi lấy thông tin");
						}
					});
				});
			})

		}
	}



	function DetailsHistory() {
		var detailsHistory = document.querySelectorAll('.history-details')
		if (detailsHistory != null) {
			// Lắng nghe sự kiện khi người dùng bấm chỉnh sửa một nhân viên
			detailsHistory.forEach((ele, index) => {
				ele.addEventListener('click', function (e) {
					var employeeId = $(this).data('history-id');

					// Gọi Action GetEmployee bằng AJAX
					$.ajax({
						type: "GET",
						url: "/History/Detail?id=" + employeeId, // Đường dẫn tới Action GetEmployee
						//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
						success: function (data) {
							// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
							var employeeDetailsHtml =
								`
		<form method="post" action="History/EditPost?id=${data.billId}">

		<!-- Lưu đặt phòng -->
				<div class="panel-save d-flex justify-content-between align-items-center">
					<span >Chi tiết hóa đơn </span>

				
				</div>

				<!-- Form -->
				<form class="panel-form">
					<!-- Thông tin -->
					<div class="panel-form-info">

<!-- Hoá đơn -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Hóa đơn phòng</h5>
							<input class="panel-form-input" type="text" name="BillId" value="${data.billId}" readonly />
						</div>

						

						<!-- Phòng -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Phòng</h5>
							<input class="panel-form-input" type="text" name="RoomId" value="${data.bookRoomDetails.roomID}" readonly/>
						</div>
	<div class="panel-form-item">
							<h5 class="panel-form-title">Id thanh toan</h5>
							<input class="panel-form-input" type="text" name="PaymentId" value="${data.paymentId}" readonly/>
						</div>

						<!-- Ngày -->
						<div class="panel-form-item">
							<div class="panel-form-height">
								<div class="panel-form-height-item">
									<h5 class="panel-form-title">Ngày nhận phòng</h5>
									<input class="panel-form-input" type="datetime-local" name="CheckInDate" value="${data.checkInDate}" readonly/>
								</div>

								<div class="panel-form-height-item">
									<h5 class="panel-form-title">Ngày trả phòng</h5>
									<input class="panel-form-input" type="datetime-local" name="CheckOutDate" value="${data.checkOutDate}" readonly/>
								</div>
							</div>
						</div>

						<!-- Số tiền đã thanh toán -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Số tiền thanh toán</h5>
							<input class="panel-form-input" type="number" name="TotalPriceBill" value="${data.totalPriceBill}" readonly />
						</div>

<div class="panel-form-item">
							<h5 class="panel-form-title">Số tiền thanh toán</h5>
							<input class="panel-form-input" type="number" name="TotalPriceMenu" value="${data.totalPriceMenu}" readonly/>
						</div>

<div class="panel-form-item">
							<h5 class="panel-form-title">Số tiền thanh toán</h5>
							<input class="panel-form-input" type="number" name="PriceRoom" value="${data.priceRoom}" readonly />
						</div>
						<!-- Ghi chú -->
						<div class="panel-form-item">
							<h5 class="panel-form-title">Ghi chú</h5>
							<input class="panel-form-input" type="text" name="Note" value="${data.note}" readonly />
						</div>
					</div>


				</form>
								</form>
							`;
							$(".right-panel").html(employeeDetailsHtml);
						},
						error: function () {
							alert("Đã xảy ra lỗi khi lấy thông tin");
						}
					});
				});
			})

		}
	}

	function adminLayout() {
		var adminLayout = document.querySelectorAll('.adminLayout')
		if (adminLayout != null) {
			$.ajax({
				type: "GET",
				url: "/Admin/GetIndex",// Đường dẫn tới Action GetEmployee
				//data: { roomTypeId: employeeId }, // Truyền tham số id cho Action GetEmployee
				success: function (data) {
					// Hiển thị khung chỉnh sửa với dữ liệu của nhân viên
					var employeeDetailsHtml =
						`

										<div class="content container-fluid">
								<div class="page-header">
								
								<div class="row">
									<div class="col-xl-3 col-sm-6 col-12">
										<div class="card board1 fill">
											<div class="card-body">
												<div class="dash-widget-header">
													<div>
														<h3 class="card_widget_header">${data.soNV}
					</h3>
														<a href="/History/Index"><h6 class="text-muted">Tổng nhân viên</h6> </a>
										</div>
													<div class="ml-auto mt-md-3 mt-lg-0"> <span class="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#009688" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus">
													<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
													<circle cx="8.5" cy="7" r="4"></circle>
													<line x1="20" y1="8" x2="20" y2="14"></line>
													<line x1="23" y1="11" x2="17" y2="11"></line>
													</svg></span> </div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-3 col-sm-6 col-12">
										<div class="card board1 fill">
											<div class="card-body">
												<div class="dash-widget-header">
													<div>
														<h3 class="card_widget_header">${data.tong}</h3>
														<h6 class="text-muted">Tổng tiền </h6> </div>
													<div class="ml-auto mt-md-3 mt-lg-0"> <span class="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#009688" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-dollar-sign">
													<line x1="12" y1="1" x2="12" y2="23"></line>
													<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
													</svg></span> </div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-3 col-sm-6 col-12">
										<div class="card board1 fill">
											<div class="card-body">
												<div class="dash-widget-header">
													<div>
														<h3 class="card_widget_header">${data.phong}</h3>
														<h6 class="text-muted">Phòng còn trống</h6> </div>
													<div class="ml-auto mt-md-3 mt-lg-0"> <span class="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#009688" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus">
													<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z">
													</path>
													<polyline points="14 2 14 8 20 8"></polyline>
													<line x1="12" y1="18" x2="12" y2="12"></line>
													<line x1="9" y1="15" x2="15" y2="15"></line>
													</svg></span> </div>
												</div>
											</div>
										</div>
									</div>
									<div class="col-xl-3 col-sm-6 col-12">
										<div class="card board1 fill">
											<div class="card-body">
												<div class="dash-widget-header">
													<div>
														<h3 class="card_widget_header">${data.tongBooking}</h3>
														<h6 class="text-muted">Tổng phòng đã đặt</h6> </div>
													<div class="ml-auto mt-md-3 mt-lg-0"> <span class="opacity-7 text-muted"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#009688" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe">
													<circle cx="12" cy="12" r="10"></circle>
													<line x1="2" y1="12" x2="22" y2="12"></line>
													<path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
													</path>
													</svg></span> </div>
												</div>
											</div>
										</div>
									</div>
								</div>
					<div class="d-flex">

								<div  class="col-8 box-shadow">
									<canvas class="w-100 h-100" style ="width:100% !important" id="myChart"></canvas>
								</div>

					<div class="col-4 box-shadow" >
						<canvas class="w-100 h-100" style ="width:100%; !important" id="pie"></canvas>
					</div>

				<div>
	
	<style>
		 .box-shadow{
					background-color:white;
					border: 1px solid hsl(200, 5%, 35%);
					margin:1px;
					border-radius: 1.5rem;
		 }

	</style>

											`;
					$(".adminLayout").html(employeeDetailsHtml);

					const myChart = document.getElementById('myChart');
					new Chart(myChart, {
						type: 'line',
						data: {
							labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
							datasets: [{
								label: 'Doanh thu',



								data: data.a,
								fill: true,

								//datasets:[ fill: {
								//	below: 'rgb(0, 0, 255)'    
								//}],

								borderColor: '#009688',
								backgroundColor: 'rgba(75, 192, 192, 0.5)',
								hoverBackgroundColor: '#009688',
								borderWidth: 1
							}]
						},
						options: {
							scales: {
								y: {
									beginAtZero: true
								}
							},
							plugins: {
								legend: {
									labels: {
										font: {
											size: 16
										}
									}
								}
							}
						}
					});

					var listName = [...data.listNameRT];
					var listCount = [...data.listCount];

					console.log(listName)
					console.log(listCount)

					const pie = document.getElementById('pie');
					new Chart(pie, {
						type: 'pie',
						data: {
							labels: listName,
							datasets: [{
								label: 'Số lượng',
								data: listCount,
								backgroundColor: [
									'rgb(75, 192, 192)',
									'rgb(54, 250, 200)'
								],
								hoverOffset: 10,
								borderWidth: 1,
							}]
						},
						options: {
							plugins: {
								legend: {
									labels: {
										font: {
											size: 16
										}
									}
								}
							}
						}
					});
				},

				error: function () {
					alert("Đã xảy ra lỗi khi lấy thông tin");
				}
			});

		}
	}
})