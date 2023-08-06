document.addEventListener('DOMContentLoaded', function () {
    Main();

    function Main() {
		GetCreateStaff();
    }

    function GetCreateStaff() {
        var accountCreate = document.getElementById('account-create');

        if (accountCreate != null) {
            accountCreate.addEventListener('click', function () {
                $.ajax({
                    type: "GET",
                    url: "../../Staff/Index",
                    success: function (data) {
						var employeeDetailsHtml =
                            `
                                <form method="post" action="../../Staff/Create" enctype="multipart/form-data">
									<!-- Lưu đặt phòng -->
									<div class="panel-save d-flex justify-content-between align-items-center">
										<span>Thêm mới</span>

										<div class="">
											<input type="submit" value="submit" />
										</div>
									</div>

									<!-- Form -->
									<div class="panel-form">
										<!-- Thông tin -->
										<div class="panel-form-info">
											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Tên tài khoản</h5>
												<input class="panel-form-input" type="text" name="Username"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Mật khẩu</h5>
												<input class="panel-form-input" type="password" name="Password" />
											</div>

											<!-- Tên tài khoản -->
											<a class="panel-form-item">
												<h5 class="panel-form-title">Tên nhân viên</h5>
												<input class="panel-form-input" type="text" name="Name" />
											</a>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Chức vụ</h5>
												<input class="panel-form-input" type="number" name="PositionId"/>
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
												<input class="panel-form-input" type="text" name="Gender"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Ngày sinh</h5>
												<input class="panel-form-input" type="text" name="Birthday"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Số điện thoại</h5>
												<input class="panel-form-input" type="text" name="Phone"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Địa chỉ</h5>
												<input class="panel-form-input" type="text" name="Address"/>
											</div>

											<!-- Tên tài khoản -->
											<div class="panel-form-item">
												<h5 class="panel-form-title">Email</h5>
												<input class="panel-form-input" type="text" name="Email"/>
											</div>
										</div>
									</div>
								</form>
                            `;

						// render giao diện
						$(".right-panel").html(employeeDetailsHtml);
                    },
                    error: function () {

                    }
                })
            });
        }
    }
});