class BaseJS {
    constructor() {
        this.host = "http://api.manhnv.net";
        this.apiRouter = null;
        this.setApiRouter();
        this.loadData();
        this.initEvents();
    }

    /**
     * Hàm lấy đường dẫn api
     * create by: NHSON(1-5-2021)
     * */
    setApiRouter() {

    }

    initEvents() {
        var me = this;
        // sự kiện click khi nhấn thêm mới
        $('#btnAdd').click(function () {

            try {
                // hiển thị diglog thêm
                $("#dialog").show();
                $('input[type!="radio"]').val(null);
                // load dữ liệu cho các combobox
                $('.loading').show();
                var select = $('select#cbxEmpGroup');
                select.empty();
                // lấy dữ liệu nhóm khách hàng
                $.ajax({
                    url: me.host + "/api/customergroups",
                    method: "GET"

                }).done(function (res) {
                    if (res) {
                        $.each(res, function (index, obj) {
                            var option = $(`<option value="${obj.CustomerGroupId}">${obj.CustomerGroupName}</option>`);
                            select.append(option);
                        })
                    }
                    $('.loading').hide();
                }).fail(function (res) {
                    $('.loading').hide();
                    console.log(res);
                })
            } catch (e) {
                console.log(e);
            }
           
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
            var entity = {};
            $.each(inputs, function (index, input) {
                var propertyName = $(this).attr('fieldName');
                var value = $(this).val();
                console.log(this);  
                // check với trường hợp input là radio, thì chỉ cần lấy value của input
                if ($(this).attr('type') == "radio") {
                    if (this.checked) {
                        alert(value);
                        entity[propertyName] = value;
                    }
                    debugger;
                } else {
                    entity[propertyName] = value;
                }
                debugger;
            })
                console.log(entity);
            return;
            // gọi service tương ứng thực hiện lưu dữ liệu
            $.ajax({
                url: me.host + me.apiRouter,
                method: 'POST',
                data: JSON.stringify(entity),
                contentType:'application/json'
            }).done(function (res) {
                me.loadData();
                // sau khi lưu thành công thì
                //+ đưa ra thông báo thành công
                alert('Thêm thành công');
                //+ ẩn form chi tiết
                $('#dialog').hide();
            }).fail(function (res) {
                alert('Thêm không thành công');
            })
            
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
        var me = this;
        $('table tbody').empty();
        try {
            // lấy thông tin các cột dữ liệu
            var columns = $('table thead th');
            var getDataUrl = this.getDataUrl;
            $('.loading').show();
            // lấy dữ liệu về
            $.ajax({
                url: me.host + me.apiRouter,
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
                    $('.loading').hide();
                })
            }).fail(function (res) {
                $('.loading').hide();
                console.warn(res);
            })
        } catch (e) {
            // Ghi log lỗi
            console.log(e);
        }
        
    }
}