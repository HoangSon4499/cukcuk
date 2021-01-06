class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
        this.initEvents();
    }
    /**
     * Hàm lấy đường dẫn api
     * create by: NHSON(1-5-2021)
     * */
    setDataUrl() {

    }

    initEvents() {
        var me = this;
        // sự kiện click khi nhấn thêm mới
        $('#btnAdd').click(function () {
            // hiển thị diglog thêm
            $("#dialog").show();
        })

        // sự kiện click thoát dialog thêm
        $('#exit').click(function () {
            // ẩn dialog thêm
            $("#dialog").hide();
        })

        // sự kiện click hủy trên dialog thêm
        $('#cancel').click(function () {
            // ẩn dialog thêm
            $("#dialog").hide();
        })

        // load lại dữ liệu khi nhận nạp
        $('#btnRefresh').click(function () {
            me.loadData();
        })

        // lưu dữ liệu vào DB
        $('#btnSave').click(function () {
            // validate dữ liệu
            var inputValidate = $('input[required], input[type="email"]');
            $.each(inputValidate, function (index, input) {
                $(input).trigger('blur');
            })
            var inputNotValidate = $('input[validate="false"]');
            if (inputNotValidate && inputNotValidate.length > 0) {
                alert('Dữ liệu không hợp lệ vui lòng kiểm tra lại');
                inputNotValidate[0].focus();
                return;
            }
            // thu thập thông tin dữ liệu được nhập -> build thành object
            // lấy tất cả các control nhập liệu:
            var inputs = $('input[fieldName], select[fieldName]');
            var customer = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');
                var value = $(this).val();
                customer[propertyName] = value;
                debugger;
            })
            console.log(customer);
            var employee = {
                "CustomerCode": $('#txtEmpCode').val(),
                "FullName": $('#txtFullName').val(),
                "Address": $('#txtAddress').val(),
                "DateOfBirth": $('#txtDateOfBirth').val(),
                "Email": $('#Email').val(),
                "PhoneNumber": $('#txtPhoneNumber').val(),
                "CustomerGroupId": "7a0b757e-41eb-4df6-c6f8-494a84b910f4",
                "MemberCardCode": $('#txtMemberCard').val(),
                "CompanyName": $('#txtCompanyName').val(),
            }
            console.log(customer);

            return;
            // gọi service tương ứng thực hiện lưu dữ liệu
            $.ajax({
                url: 'http://api.manhnv.net/api/customers',
                method: 'POST',
                data: JSON.stringify(employee),
                contentType:'application/json'
            }).done(function (res) {
                me.loadData();
                debugger;
            }).fail(function (res) {
                debugger;
            })
            // sau khi lưu thành công thì
            //+ đưa ra thông báo thành công
            alert('Thêm thành công');
            //+ ẩn form chi tiết
        })


        // hiển thị thông tin chi tiết khi ấn chọn 1 bản ghi trên danh sách khi ấn đúp chuột
        $('table tbody').on('dblclick', 'tr', function () {
            $("#dialog").show();
        })


        /*
         * validate các trường bắt buộc phải nhập
         * created by: NHSON(6-1-2021)
         */
        $('input[required]').blur(function () {
            // kiểm tra dữ liệu đã nhập, nếu để trống thì cảnh báo
            var value = $(this).val();
            if (!value) {
                //this.classList.add("border-red"); // cách 1: nhúng class vào thẻ input theo html thuần
                $(this).addClass('border-red'); // cách 2: nhúng class vào thẻ input theo js
                $(this).attr('title', 'Trường này không được để trống');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })

        /*
         * validate email đúng định dạng
         * created by: NHSON(6-1-2021)
         */
        $('input[type="email"]').blur(function () {
            var email = $(this).val();
            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!filter.test(String(email).toLowerCase())) {
                $(this).addClass('border-red'); // cách 2: nhúng class vào thẻ input theo js
                $(this).attr('title', 'Email không đúng định dạng');
                $(this).attr('validate', false);
            }
            else {
                $(this).removeClass('border-red');
                $(this).attr('validate', true);
            }
        })

    }
    /**
     * Hàm load dữ liệu
     * create by: NHSON(1-5-2021)
     * */
    loadData() {
        $('table tbody').empty();
        try {
            // lấy thông tin các cột dữ liệu
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;

            // lấy dữ liệu về
            $.ajax({
                url: getDataUrl,
                method: "GET",
            }).done(function (res) {
                $.each(res, function (index, obj) {
                    var tr = $(`<tr></tr>`);
                    // lấy thông tin dữ liệu sẽ map tương ứng với các cột
                    $.each(columns, function (index, th) {
                        var td = $(`<td></td>`);
                        var fieldName = $(th).attr('fieldname');
                        var value = obj[fieldName];
                        var formatType = $(th).attr('formatType');
                        switch (formatType) {
                            case "ddmmyyyy":
                                td.addClass("text-align-center");
                                value = formatDate(value);
                                break;
                            case "MoneyVND":
                                td.addClass("text-align-right");
                                value = formatMoney(value);
                                break;
                            default:
                                break;
                        }
                        td.append(value);
                        $(tr).append(td);
                    })
                    $('table tbody').append(tr);
                })
            }).fail(function (res) {
                console.warn(res);
            })
        } catch (e) {
            // Ghi log lỗi
            console.log(e);
        }
        
    }
}