import Vue from 'vue';
import Vuex from 'vuex';
import Enumeration from '../scripts/common/enumeration';

Vue.use(Vuex);

const storeData = {
  state: {
    //Trạng thái sidebar
    expandedSidebar: false,

    //Thực thể phục vụ cho hàm xóa
    entity: null,

    //Lưu loại form
    formMode: Enumeration.FormMode.Add,

    //Màn hình loading
    loaderEngine: false,

    //Nếu true cho phép validate
    hasValidate: false,

    pagination: {
      //Số bản ghi trên 1 trang
      pageSize: 10,

      //Số trang hiện tại
      pageNumber: 1,

      //Tổng số trang
      totalPage: 0,

      //Tổng số bản ghi
      totalRecord: 0,

      //Phân đoạn trang tối đa
      maximumPage: 5,

      //Giá trị filter
      filterValue: '', //chưa sửa dụng để tạm đây
    },
  },
  getters: {},
  mutations: {
    //Set trạng thái sidebar (true-rộng, false-hẹp)
    TOGGLE_SIDEBAR(state) {
      state.expandedSidebar = !state.expandedSidebar;
    },

    //Set thực thể để xóa
    SET_ENTITY(state, value) {
      state.entity = JSON.parse(JSON.stringify(value));
    },

    //Set loại form
    SET_FORMMODE(state, value) {
      state.formMode = value;
    },

    //Set trạng thái loading
    SET_LOADER(state, value) {
      state.loaderEngine = value;
    },

    //Set trạng thái loading
    SET_HASVALIDATE(state, value) {
      state.hasValidate = value;
    },

    //Set pagesize-chưa sửa dụng để tạm đây
    SET_PAGESIZE(state, value) {
      state.pagination.pageSize = value;
    },

    //Set pagenumber
    SET_PAGENUMBER(state, value) {
      state.pagination.pageNumber = value;
    },

    //Set filter value-chưa sửa dụng để tạm đây
    SET_FILTER_VALUE(state, value) {
      state.pagination.filterValue = value;
    },

    //Set total page-chưa sửa dụng để tạm đây
    SET_TOTALPAGE(state, value) {
      state.pagination.totalPage = value;
    },

    //Set tổng số bản ghi
    SET_TOTALRECORD(state, value) {
      state.pagination.totalRecord = value;
    },

    //Set maximum page-chưa sửa dụng để tạm đây
    SET_MAXIMUM_PAGE(state, value) {
      state.pagination.maximumPage = value;
    },
  },
};

const store = new Vuex.Store(storeData);

export default store;
