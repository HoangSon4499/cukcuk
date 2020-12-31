/**---------------------------------------------
 * format dữ liệu ngày tháng sang ngày tháng năm
 * creatBy: nhson(31/12/2020)
 * @param {any} date có kiểu dữ liệu bất kỳ
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getDate())) {
        return "";
    } else {
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        var formatDate = day + "/" + month + "/" + year;
        return formatDate;
    }
}

/**----------------------------------
 * Hàm định dạng hiển thị tiền tệ
 * createBy: nhson(31/12/2020)
 * @param {any} money số tiền
 */
function formatMoney(money) {
    if (money == null) {
        return "";
    } else {
        var num = money.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");
        return num;
    }

}