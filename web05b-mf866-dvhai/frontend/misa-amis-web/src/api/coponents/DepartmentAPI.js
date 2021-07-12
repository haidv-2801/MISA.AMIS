import BaseAPI from '../base/BaseAPI';

class EmployeeAPI extends BaseAPI {
  constructor() {
    super();
    this.controler = '/v1/Departments';
  }
}

export default new EmployeeAPI();
