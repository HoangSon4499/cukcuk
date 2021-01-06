$(document).ready(function () {
    new CustomerJS();
})

class CustomerJS extends BaseJS{
    constructor() {
       /* this.loadData();*/
        super();
    }

    setDataUrl() {
        this.getDataUrl = "http://api.manhnv.net/api/customers";
    }

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




