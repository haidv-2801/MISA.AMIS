import Vue from 'vue';
import Vuex from 'vuex';
import Enumeration from '../scripts/common/enumeration';

import { GET_ENTITY, GET_FILTERVALUE, GET_FORMMODE, GET_HASVALIDATE, 
  GET_LOADER, GET_MAXIMUMPAGE, GET_PAGENUMBER, GET_PAGESIZE, GET_TOGGLESIDEBAR, 
  GET_TOTALPAGE, GET_TOTALRECORD, SET_ENTITY, SET_FILTERVALUE, SET_FORMMODE, SET_HASVALIDATE, 
  SET_LOADER, SET_MAXIMUMPAGE, SET_PAGENUMBER, SET_PAGESIZE, SET_TOGGLESIDEBAR, SET_TOTALPAGE, SET_TOTALRECORD }
 from './mutation-types.js'

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
  getters: {
    [GET_TOGGLESIDEBAR]: state => state.expandedSidebar,
    [GET_ENTITY]: state => state.entity,
    [GET_FORMMODE]: state => state.formMode,
    [GET_LOADER]: state => state.loaderEngine,
    [GET_HASVALIDATE]: state => state.hasValidate,
    [GET_FILTERVALUE]: state => state.pagination.filterValue,
    [GET_MAXIMUMPAGE]: state => state.pagination.maximumPage,
    [GET_PAGESIZE]: state => state.pagination.pageSize,
    [GET_PAGENUMBER]: state => state.pagination.pageNumber,
    [GET_TOTALPAGE]: state => state.pagination.totalPage,
    [GET_TOTALRECORD]: state => state.pagination.totalRecord,
  },
  mutations: {
    //Set trạng thái sidebar (true-rộng, false-hẹp)
    [SET_TOGGLESIDEBAR]: state =>  (state.expandedSidebar = !state.expandedSidebar),

    //Set thực thể để xóa
    [SET_ENTITY]: (state, value) => (state.entity = JSON.parse(JSON.stringify(value))),
    
    //Set loại form
    [SET_FORMMODE]: (state, value) => (state.formMode = value),
    
    //Set trạng thái loading
    [SET_LOADER]: (state, value) => (state.loaderEngine = value),
    
    //Set trạng thái loading
    [SET_HASVALIDATE]: (state, value) => (state.hasValidate = value),
    
    //Set pagesize-chưa sửa dụng để tạm đây
    [SET_PAGESIZE]: (state, value) => (state.pagination.pageSize = value),
    
    //Set pagenumber
    [SET_PAGENUMBER]: (state, value) => (state.pagination.pageNumber = value),
    
    //Set filter value-chưa sửa dụng để tạm đây
    [SET_FILTERVALUE]: (state, value) => (state.pagination.filterValue = value),
    
    //Set total page-chưa sửa dụng để tạm đây
    [SET_TOTALPAGE]: (state, value) => (state.pagination.totalPage = value),
    
    //Set tổng số bản ghi
    [SET_TOTALRECORD]: (state, value) => (state.pagination.totalRecord = value),
    
    //Set maximum page-chưa sửa dụng để tạm đây
    [SET_MAXIMUMPAGE]: (state, value) => (state.pagination.maximumPage = value),
  },
};

const store = new Vuex.Store(storeData);

export default store;
