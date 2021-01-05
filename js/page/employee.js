$(document).ready(function () {
    new EmployeeJS();
})

class EmployeeJS extends BaseJS{
    constructor() {
        //this.loadData();
        super();

    }
    setDataUrl() {
        this.getDataUrl ="http://api.manhnv.net/api/employees";
    }
    /**
     * Load Dữ liệu
     * createBy: nhson(31/12/2020)
     * */
/*    loadData() {
        
    
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



