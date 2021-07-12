<template>
  <div class="main">
    <!-- confirm popup -->
    <DialogConfirmDel
      :data="entity"
      ref="confirmDialogDel"
      @deleteRecord="deleteRecord"
    />
    <!-- warning popup -->
    <DialogWarning ref="formWarning" />

    <!-- Error popup -->
    <DialogError ref="formError" />

    <DialogConfirmStopTyping
      :data="entity"
      ref="confirmDialogStop"
      @saveData="saveData"
      @closeForm="closeFormEmployeeDetail"
    />

    <!-- form employee -->
    <EmployeeDetail
      @openDialogConfirmStoptyping="openDialogConfirmStoptyping"
      @openFormError="openFormError"
      @openFormWarning="openFormWarning"
      @refreshGrid="refreshGrid"
      ref="formEmployeeDetail"
    />

    <!-- toolbar -->
    <EmployeeToolBar @openFormEmployeeDetail="openFormEmployeeDetail" />

    <div class="body-index">
      <!-- filterbar -->
      <EmployeeFilterBar
        @changeValueFilterString="changeValueFilterString"
        @filterTable="filterTable"
        @refreshGrid="refreshGrid"
      />

      <!-- grid -->
      <Grid
        ref="Grid"
        :gridData="gridDataTable"
        @filterTable="filterTable"
        @openFormDetail="openFormEmployeeDetail"
        @openConfirmDelete="openConfirmDelete"
      />
    </div>
  </div>
</template>

<script>
import EmployeeDetail from './EmployeeDetail.vue';
import EmployeeToolBar from './EmployeeToolBar.vue';
import EmployeeFilterBar from './EmployeeFilterBar.vue';
import Grid from '../../common/Grid.vue';
import DialogConfirmDel from '../../common/vdialog/DialogConfirmDel.vue';
import DialogWarning from '../../common/vdialog/DialogWarning.vue';
import DialogError from '../../common/vdialog/DialogError.vue';
import DialogConfirmStopTyping from '../../common/vdialog/DialogConfirmStopTyping.vue';
import EmployeeAPI from '../../../api/coponents/EmployeeAPI';
import Resource from '../../../scripts/common/resource';

export default {
  name: 'EmployeeIndex',
  components: {
    EmployeeDetail,
    EmployeeToolBar,
    EmployeeFilterBar,
    Grid,
    DialogConfirmDel,
    DialogConfirmStopTyping,
    DialogWarning,
    DialogError,
  },
  data() {
    return {
      //Có mở form chi tiết không
      isDisplayedEmployeeDetail: false,

      //Thông tin màn hình hiện tại
      entity: {
        entityName: 'Nhân Viên',
      },

      //Dữ liệu dùng cho bảng
      gridDataTable: {
        column: [
          {
            fieldName: 'employeeCode',
            displayName: 'Mã nhân viên',
            dataType: '',
            displayType: '',
          },
          {
            fieldName: 'employeeName',
            displayName: 'Tên nhân viên',
            dataType: '',
            displayType: '',
          },
          {
            fieldName: 'gender',
            displayName: 'Giới tính',
            dataType: 'Enum',
            displayType: 'Gender',
          },
          {
            fieldName: 'dateOfBirth',
            displayName: 'Ngày sinh',
            dataType: 'Date',
            displayType: '',
          },
          {
            fieldName: 'identityNumber',
            displayName: 'Số cmnd',
            dataType: '',
            displayType: '',
          },
          {
            fieldName: 'employeePosition',
            displayName: 'Chức danh',
            dataType: '',
            displayType: '',
          },
          {
            fieldName: 'departmentName',
            displayName: 'Tên đơn vị',
            dataType: '',
            displayType: '',
          },
          {
            fieldName: 'bankAccountNumber',
            displayName: 'Số tài khoản',
            dataType: '',
            displayType: '',
          },
          {
            fieldName: 'bankName',
            displayName: 'Tên ngân hàng',
            dataType: '',
            displayType: '',
          },
          {
            fieldName: 'bankBranchName',
            displayName: 'Chi nhánh tk ngân hàng',
            dataType: '',
            displayType: '',
          },
        ],
        data: [],
      },

      //Dữ liệu lọc
      filterString: '',
    };
  },
  created() {
    /**
     * Làm mới bảng
     * DVHAI 07/07/2021
     */
    this.refreshGrid();
  },

  watch: {},

  methods: {
      /**
     * Gọi form chi tiết lưu dữ liệu
     * DVHAI 07/07/2021
     */
    saveData() {
      this.$refs.formEmployeeDetail.saveAndClose()
    },

    /**
     * Thay mở form lỗi
     * DVHAI 07/07/2021
     */
    openFormError(data) {
      this.$refs.formError.openPopup(data);
    },

    /**
     * Thay mở form cảnh báo
     * DVHAI 07/07/2021
     */
    openFormWarning(data) {
      this.$refs.formWarning.openPopup(data);
    },

    /**
     * Thay đổi giá trị lọc
     * DVHAI 07/07/2021
     */
    changeValueFilterString(value) {
      this.filterString = value;
    },

    /**
     * Cấu hình dữ liệu phân trang
     * DVHAI 21/06/2021
     */
    configDataPaging() {},

    /**
     * Lấy data từ sever
     * DVHAI 13/06/2021
     */
    getDataGrid() {
      this.$store.commit('SET_LOADER', true);
      EmployeeAPI.getAll()
        .then((response) => {
          this.gridDataTable.data = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit('openToast', {
            type: 'toast--error',
            text: Resource.MsgReponse.MisaMsgError,
          });
        })
        .finally(() => {
          this.$store.commit('SET_LOADER', false);
        });
    },

    /**
     * Lọc
     * DVHAI 21/06/2021
     */
    filterTable() {
      //Lấy danh sách lọc + phân trang
      EmployeeAPI.getEmployeesFilterPaging(
        this.pageSize,
        this.pageNumber,
        this.filterString
      )
        .then((response) => {
          // debugger; // eslint-disable-line no-debugger
          this.gridDataTable.data = response.data.data.data;
          this.$store.commit('SET_TOTALPAGE', response.data.data.totalPage);
          this.$store.commit('SET_TOTALRECORD', response.data.data.totalRecord);
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit('openToast', {
            type: 'toast--error',
            text: Resource.MsgReponse.MisaMsgError,
          });
        })
        .finally(() => {
          this.$store.commit('SET_LOADER', false);
        });
    },

    /**
     * Mở form chi tiết
     * DVHAI 07/07/2021
     */
    openFormEmployeeDetail(item) {
      this.$refs.formEmployeeDetail.openForm(item);
    },

    /**
     * Đóng form chi tiết
     * DVHAI 07/07/2021
     */
    closeFormEmployeeDetail() {
      this.$refs.formEmployeeDetail.closeForm();
    },

    /**
     * Làm mới bảng
     * DVHAI 07/07/2021
     */
    refreshGrid() {
      // this.getDataGrid();
      this.filterTable();
    },

    /**
     * Mở popup xác nhận xóa
     * DVHAI 07/07/2021
     */
    openConfirmDelete(item) {
      this.$refs.confirmDialogDel.openPopup(this.entity.entityName, item.employeeCode,);
    },

    /**
     * Xóa bản ghi
     * DVHAI 07/07/2021
     */
    deleteRecord() {
      //Lấy thực thể cần xóa từ store
      let entity = this.$store.state.entity;

      //Nếu khác null chứng tỏ tồn tại cần xóa
      if (entity != null) {
        let id = entity.employeeId;
        
        this.$store.commit('SET_LOADER', true);

        EmployeeAPI.delete(id)
          .then((response) => {
            console.log(response);

            this.$bus.emit('openToast', {
              type: Resource.ToastType.ToastSuccess,
              text:  Resource.MsgReponse.DeleteMsgSuccess.format(this.entity.entityName),
            });

            //Gán lại thực thể trong store bằng null
            this.$store.commit('SET_ENTITY', null);
            this.refreshGrid();
          })
          .catch((error) => {
            console.log(error);
            this.$bus.emit('openToast', {
              type: Resource.ToastType.ToastError,
              text: Resource.MsgReponse.MisaMsgError,
            });
          });
      }
    },

    /**
     * Mở form cảnh báo thay đổi dữ liệu
     * DVHAI 07/07/2021
     */
    openDialogConfirmStoptyping() {
      this.$refs.confirmDialogStop.openPopup();
    },
  },

  computed: {
    //Số bản ghi trên 1 trang
    pageSize() {
      return this.$store.state.pagination.pageSize;
    },

    //Trang hiện tại
    pageNumber() {
      return this.$store.state.pagination.pageNumber;
    },

    //Giá trị lọc
    filterValue() {
      return this.$store.state.pagination.filterValue;
    },
  },
};
</script>

<style scoped>
@import url('../../../assets/css/common/main.css');
</style>
