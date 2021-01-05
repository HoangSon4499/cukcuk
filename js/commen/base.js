class BaseJS {
    constructor() {
        this.getDataUrl = null;
        this.setDataUrl();
        this.loadData();
    }
    /**
     * Hàm lấy đường dẫn api
     * create by: NHSON(1-5-2021)
     * */
    setDataUrl() {

    }
    /**
     * Hàm load dữ liệu
     * create by: NHSON(1-5-2021)
     * */
    loadData() {
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