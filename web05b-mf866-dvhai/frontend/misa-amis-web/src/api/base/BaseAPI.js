import BaseAPIConfig from "../base/BaseAPIConfig";

export default class BaseAPI {
  constructor() {
    this.controler = null;
  }
  
  /**
   * Phương thức lấy tất cả dữ liệu
   */
  getAll() {
    return BaseAPIConfig.get(`${this.controler}`);
  }

  /**
   * Phương thức lấy tất cả dữ liệu
   */
  getById(id) {
    return BaseAPIConfig.get(`${this.controler}/${id}`);
  }

  /**
   * Hàm lấy dữ liệu phân trang
   * @param {*} payload
   */
  paging(payload) {
    return BaseAPIConfig.post(`${this.controler}/Filter`, payload);
  }

  /**
   * Hàm cập nhật dữ liệu
   * @param {*} id
   * @param {*} body
   */
  update(id, body) {
    return BaseAPIConfig.put(`${this.controler}/${id}`, body);
  }

  /**
   * Hàm xóa bản ghi
   * @param {*} id
   */
  delete(id) {
    return BaseAPIConfig.delete(`${this.controler}/${id}`);
  }

  /**
   * Hàm thêm bản ghi
   * @param {*} id
   * @param {*} body
   */
  insert(body) {
    return BaseAPIConfig.post(`${this.controler}`, body);
  }
}
