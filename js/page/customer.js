$(document).ready(function () {
    new CustomerJS();
})

class CustomerJS extends BaseJS{
    constructor() {
       /* this.loadData();*/
        super();
    }
    /**-------------------------------
     * Hàm loadData
     * createBy: NHSON(31/12/2020)
     * */
    /*loadData() {
        // lấy dữ liệu về
        $.ajax({
            url: "http://api.manhnv.net/api/customers",
            method: "GET",
        }).done(function (res) {
            var data = res;
            console.table(data);
            // binding dữ liệu lên table
            $.each(data, function (index, item) {
                var DateOfBirth = item["DateOfBirth"];
                DateOfBirth = formatDate(DateOfBirth);
                var checkbox = `<input type="checkbox"/>`;
                if (item.Gender > 0) {
                    var checkbox = `<input type="checkbox" checked/>`;
                }
                var money = item.Salary;
                money = formatMoney(money);
                var tr = $(`<tr>
                        <td style="text-align:left">${item.CustomerCode}</td>
                        <td style="text-align:left">${item.FullName}</td>
                        <td style="text-align:center">`+ checkbox + `</td>
                        <td style="text-align:center">`+ DateOfBirth + `</td>
                        <td style="text-align:left">${item.PhoneNumber}</td>
                        <td style="text-align:left">${item.Email}</td>
                        <td style="text-align:left">${item.Address}</td>
                        <td style="text-align:left">${item.CustomerGroupName}</td>
                     </tr>`);
                $('table tbody').append(tr);
            })
        }).fail(function (res) {
            console.warn(res);
        })
    }*/

    /**
     * Thêm Dữ liệu
     * createBy: nhson(31/12/2020)
     * */
    add() {

    }


    /**
     * Sửa Dữ liệu
     * createBy: nhson(31/12/2020)
     * */
    update() {

    }


    /**
     * Xóa Dữ liệu
     * createBy: nhson(31/12/2020)
     * */
    delete() {

    }
}




