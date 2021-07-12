import BaseAPI from "../base/BaseAPI";
import BaseAPIConfig from "../base/BaseAPIConfig";

class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = "/v1/Employees";
  }

  /**
   * Lấy mã nhân viên mới
   * DVHAI 07/07/2021
   */
  getNextEmployeeCode() {
    let urlFull = this.controler + "/NextEmployeeCode";
    return BaseAPIConfig.get(urlFull);
  }

  /**
   * Lọc
   * DVHAI 07/07/2021
   */
  getEmployeesFilterPaging(pageSize, pageNumber, employeeFilter) {
    let urlFull =
      this.controler +
      `/EmployeesFilterPaging?filterValue=${employeeFilter}&limit=${pageSize}&offset=${pageNumber}`;
    return BaseAPIConfig.get(urlFull);
  }

  /**
   * Lấy nhân viên theo mã nhân viên
   * DVHAI 07/07/2021
   */
  getEmployeeBycode(employeeCode) {
    let urlFull = `${this.controler}/EmployeeByCode/${employeeCode}`;
    return BaseAPIConfig.get(urlFull);
  }

   /**
   * Xuất excel
   * DVHAI 12/07/2021
   */
    exportExcel(filterValue) {
      let urlFull = `${this.controler}/Export?filterValue=${filterValue}`;
      return BaseAPIConfig.get(urlFull, { responseType: 'blob' });
    }
}

export default new EmployeeAPI();
