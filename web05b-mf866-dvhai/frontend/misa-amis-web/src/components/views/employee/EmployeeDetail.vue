<template>
  <transition name="slide">
    <div ref="formGroup" v-if="isOpen" class="popup__form">
      <div class="form__head">
        <div class="head__left">
          <div class="head__title">Thông tin nhân viên</div>
          <div class="checkbox-option">
            <div class="tick-box icon-18 icon-src"></div>
            <span class="checkbox-text">Là khách hàng</span>
          </div>
          <div class="checkbox-option">
            <div class="tick-box icon-18 icon-src"></div>
            <span class="checkbox-text">Là nhà cung cấp</span>
          </div>
        </div>

        <div class="head__right">
          <div
            tooltiptext="Hỗ trợ (F1)"
            class="icon-src icon-24 icon-help mg-r-6-px tooltip"
          ></div>
          <div
            tooltiptext="Đóng (ESC)"
            @click="openDialogConfirmStoptyping()"
            class="icon-src icon-24 icon-close tooltip"
          ></div>
        </div>
      </div>
      <div class="form__body">
        <div class="body__top">
          <div class="body__topleft">
            <div class="body-row">
              <InputLabel
                id="first-focus"
                class="mg-r-6-px"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                @checkUnique="checkUnique"
                :model="employeeModel.employeeCode"
                :data="employeeCodeInput"
                :ref="employeeCodeInput.inputId"
                :styleObject="{ width: '155px' }"
                :key="key"
              />

              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.employeeName"
                :data="employeeNameInput"
                :styleObject="{}"
              />
            </div>

            <div class="body-row">
              <div class="row__item flex-1">
                <label for="">Đơn vị <span class="color-red">*</span> </label>
                <div Mustvalidate="true">
                  <DropdownMaster
                    @changeValueInput="changeValueInput"
                    :data="dropdownDepartment"
                    :model="employeeModel.departmentName"
                    tabindex="0"
                  />
                </div>
              </div>
            </div>

            <div class="body-row">
              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.employeePosition"
                :data="employeePositionInput"
                :styleObject="{ width: '100%' }"
              />
            </div>
          </div>
          <div class="body__topright">
            <div class="body-row">
              <InputLabel
                class="mg-r-6-px"
                @changeValueInput="changeValueInput"
                :model="employeeModel.dateOfBirth"
                :data="dateOfBirthInput"
              />

              <!-- Giới tính -->
              <div class="row__item flex-1 padding-left-10">
                <label for="">Giới tính</label>
                <RadioButtonMaster
                  @changeValueInput="changeValueInput"
                  :model="employeeModel.gender"
                  :data="radioButtonGender"
                />
              </div>
              <!-- end -->
            </div>

            <div class="body-row">
              <InputLabel
                class="flex-1 mg-r-6-px"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.identityNumber"
                :data="identityNumberInput"
              />

              <InputLabel
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.identityDate"
                :data="identityDateInput"
              />
            </div>

            <div class="body-row">
              <InputLabel
                class="flex-1"
                MustValidate="true"
                @changeValueInput="changeValueInput"
                :model="employeeModel.identityPlace"
                :data="identityPlaceInput"
              />
            </div>
          </div>
        </div>
        <div class="body__bottom">
          <div class="body-row">
            <InputLabel
              class="width-100pt"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.address"
              :data="addressInput"
              :ref="addressInput.inputId"
              :styleObject="{ width: '100%' }"
            />
          </div>
          <div class="body-row">
            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.phoneNumber"
              :data="phoneNumberInput"
              :ref="phoneNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.telephoneNumber"
              :data="telephoneNumberInput"
              :ref="telephoneNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.email"
              :data="emailInput"
              :ref="emailInput.inputId"
              :styleObject="{ width: '197px' }"
            />
          </div>

          <div class="body-row">
            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.bankAccountNumber"
              :data="bankAccountNumberInput"
              :ref="bankAccountNumberInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              class="mg-r-6-px"
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.bankName"
              :data="bankNameInput"
              :ref="bankNameInput.inputId"
              :styleObject="{ width: '197px' }"
            />

            <InputLabel
              MustValidate="true"
              @changeValueInput="changeValueInput"
              @checkUnique="checkUnique"
              :model="employeeModel.bankBranchName"
              :data="bankBranchNameInput"
              :ref="bankBranchNameInput.inputId"
              :styleObject="{ width: '197px' }"
            />
          </div>
        </div>
        <div class="separate"></div>
      </div>
      <div class="form__bottom">
        <div class="group__button--left">
          <button
            tooltiptext="Hủy"
            @click="closeForm()"
            class="btn bgcolor-fff btn-cancel btn-size-default btn-border-default btn-h-36 tooltip"
          >
            Hủy
          </button>
        </div>
        <div class="group__button--rigth">
          <button
            tooltiptext="Cất (Ctrl + s)"
            @click="saveAndClose()"
            class="btn bgcolor-fff btn-size-default btn-border-default btn-h-36 btn-save tooltip"
          >
            Cất
          </button>
          <button
            tooltiptext="Cất và thêm (Ctrl + Shift + s)"
            @click="saveAndClear()"
            class="btn btn-save-add btn-h-36 btn-green tooltip"
          >
            Cất và thêm
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import InputLabel from '../../common/vinput/InputLabel.vue';
import DropdownMaster from '../../common/vcombobox/DropdownMaster';
import EmployeeAPI from '../../../api/coponents/EmployeeAPI';
import DepartmentAPI from '../../../api/coponents/DepartmentAPI';
import RadioButtonMaster from '../../common/vradiobutton/RadioButtonMaster.vue';
import Enumeration from '../../../scripts/common/enumeration';
import Resource from '../../../scripts/common/resource';
import CommonFn from '../../../scripts/common/common';

//Khởi tạo trạng thái ban đầu
function initState() {
  return {
    //Nếu validate client bị bỏ qua, thằng này sẽ sử lý
    validateAddServer: true,

    //Dùng theo màn hình
    entityName: 'nhân viên',

    //Model của nhân viên
    employeeModel: {},

    //Danh sách các lỗi để thông báo
    validateResult: [],

    //Phục vụ cho refresh một số component như mã nhân viên
    key: 0,

    //Dữ liệu sao chép từ employee model để so sánh thay đổi
    employeeOrigin: {},

    //trạng thái của form
    isOpen: false,

    // data form
    dropdownDepartment: {
      data: {
        inputId: 'departmentId',
        placeHolder: '',
        labelText: 'Vị trí',
        key: [],
        value: [],
      },
      validation: ['required'],
      style: {
        width: '100%',
        height: '32px',
      },
    },

    dropdownPosition: {
      data: {
        inputId: 'EmployeePosition',
        placeHolder: '',
        items: ['Giám đốc', 'Fresher Web', 'DepOops', 'BA'],
        // dataType: "Enum",
        // enumName: "Gender",
      },
      style: {
        width: '100%',
        height: '32',
      },
    },

    radioButtonGender: {
      data: {
        inputId: 'gender',
        placeHolder: '',
        items: ['Nam', 'Nữ', 'Khác'],
        dataType: 'Enum',
        enumName: 'Gender',
      },
      style: {
        width: '100%',
        height: '32px',
      },
    },

    //input
    employeeCodeInput: {
      inputId: 'employeeCode',
      labelText: 'Mã',
      isRequired: true,
      inputType: 'text',
      validation: ['required', 'maxLength:20'],
      mask: '',
      isUnique: true,
    },

    employeeNameInput: {
      inputId: 'employeeName',
      labelText: 'Tên',
      isRequired: true,
      inputType: 'text',
      validation: ['required'],
      mask: '',
    },

    addressInput: {
      inputId: 'address',
      labelText: 'Địa chỉ',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    dateOfBirthInput: {
      inputId: 'dateOfBirth',
      labelText: 'Ngày sinh',
      inputType: 'date',
      dataType: 'Date',
      validation: [],
      mask: '',
    },

    identityNumberInput: {
      inputId: 'identityNumber',
      labelText: 'Số CMND',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    identityDateInput: {
      inputId: 'identityDate',
      labelText: 'Ngày cấp',
      inputType: 'date',
      dataType: 'Date',
      validation: [],
      mask: '',
    },

    identityPlaceInput: {
      inputId: 'identityPlace',
      labelText: 'Nơi cấp',
      inputType: 'text',
      validation: [],
      mask: '',
    },

    employeePositionInput: {
      inputId: 'employeePosition',
      labelText: 'Chức danh',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    emailInput: {
      inputId: 'email',
      labelText: 'Email',
      isRequired: false,
      inputType: 'text',
      validation: ['email'],
      mask: '',
      dataType: 'Email',
    },

    phoneNumberInput: {
      inputId: 'phoneNumber',
      labelText: 'Điện thoại di động',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    telephoneNumberInput: {
      inputId: 'telephoneNumber',
      labelText: 'Điện thoại cố định',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    bankAccountNumberInput: {
      inputId: 'bankAccountNumber',
      labelText: 'Tài khoản ngân hàng',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    bankNameInput: {
      inputId: 'bankName',
      labelText: 'Tên ngân hàng',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },

    bankBranchNameInput: {
      inputId: 'bankBranchName',
      labelText: 'Chi nhánh',
      isRequired: false,
      inputType: 'text',
      validation: [],
      mask: '',
    },
  };
}

export default {
  name: 'EmployeeDetail',
  components: {
    InputLabel,
    DropdownMaster,
    RadioButtonMaster,
  },
  props: {},
  data() {
    return initState();
  },
  created() {
    //Thay cập nhập giá trị cho originmodel để kiểm tra form đã thay đổi chưa
    this.$bus.on('updateOriginModel', (key, value) => {
      this.employeeOrigin[key] = value;
    });

    //Lắng nghe sự kiện xem tất cả các trường validate thế nào
    this.$bus.on('validateResult', (value) => {
      this.validateResult.push(value);
    });
  },
  methods: {
    /**
     * Dữ liệu ban đầu khi mở form
     * DVHAI 08/07/2021
     */
    // updateOriginModel(key, value) {
    //   this.employeeOrigin[key] = value;
    //   console.log(value)
    // },

    /**
     * Mở form xác nhận thay đổi dữ liệu
     * DVHAI 08/07/2021
     */
    openDialogConfirmStoptyping() {
      let isChange = this.checkValueFormChange();
      if (isChange) this.$emit('openDialogConfirmStoptyping');
      else this.closeForm();
    },

    /**
     * Láy tất cả phòng ban
     * DVHAI 08/07/2021
     */
    getAllDepartments() {
      DepartmentAPI.getAll()
        .then((response) => {
          this.dropdownDepartment.data.key = response.data.map(
            (x) => x.departmentId
          );
          this.dropdownDepartment.data.value = response.data.map(
            (x) => x.departmentName
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /**
     * Làm mới tất cả các ô dữ liệu
     * DVHAI 08/07/2021
     */
    resetWindow() {
      Object.assign(this.$data, initState());
    },

    /**
     * Đóng form
     * DVHAI 08/07/2021
     */
    closeForm() {
      this.isOpen = false;
      this.invokeOverlay();
    },

    /**
     * Mở lớp phủ
     * DVHAI 08/07/2021
     */
    invokeOverlay() {
      this.$bus.emit('invokeOverlay');
    },

    /**
     * Mở form
     * DVHAI 08/07/2021
     */
    async openForm(item) {
      let cloneItem = null;
      if (item) cloneItem = JSON.parse(JSON.stringify(item));

      //Làm mới dữ liệu
      this.resetWindow();

      //Lấy dữ liệu phòng ban
      this.getAllDepartments();

      //Mở overlay
      this.invokeOverlay();

      this.isOpen = true;

      if (this.formMode == Enumeration.FormMode.Edit) {
        await this.bindDataForm(cloneItem);
      } else if (this.formMode == Enumeration.FormMode.Add) {
        await this.getNewEmployeeCode();
        this.key += 1;
      } else if (this.formMode == Enumeration.FormMode.Duplicate) {
        await this.bindDataForm(cloneItem);
        await this.getNewEmployeeCode();
      } else {
        //
      }

      //Tự động focus ô đầu
      this.focusField();

      // //Tạo bản sao dữ liệu để so sánh thay đổi
      // this.employeeOrigin = await JSON.parse(
      //   JSON.stringify(this.employeeModel)
      // );
    },

    /**
     * Focus ô đầu tiên
     * DVHAI 10/07/2021
     */
    focusField() {
      setTimeout(() => {
        document
          .getElementById('first-focus')
          .querySelector('input')
          .focus();
      }, 0);
    },

    /**
     * Lấy mã nhân viên mới
     * DVHAI 08/07/2021
     */
    async getNewEmployeeCode() {
      await EmployeeAPI.getNextEmployeeCode()
        .then((response) => {
          this.employeeModel.employeeCode = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit('openToast', {
            type: Resource.ToastType.ToastInfo,
            text: Resource.MsgReponse.GenerationError,
          });
        });
    },

    /**
     * Đẩy dữ liệu lên form
     * DVHAI 08/07/2021
     */
    async bindDataForm(item) {
      this.employeeModel = await this.getEmployeeById(item.employeeId);
    },

    /**
     * Lấy bản ghi theo id
     * DVHAI 08/07/2021
     */
    async getEmployeeById(id) {
      let emp = null;
      this.$store.commit('SET_LOADER', true);
      await EmployeeAPI.getById(id)
        .then((response) => {
          emp = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.$bus.emit('openToast', {
            type: Resource.ToastType.ToastError,
            text: Resource.MsgReponse.MisaMsgError,
          });
        })
        .finally(() => {
          this.$store.commit('SET_LOADER', false);
        });

      return emp;
    },

    /**
     * Lưu dữ liệu
     * DVHAI 08/07/2021
     */
    async saveAndClose() {
      try {
        await this.save();
        //Nếu không có lỗi thì đóng form
        if (this.validateResult.length == 0 && this.validateAddServer == true) {
          this.closeForm();
          this.validateAddServer = false;
        }
      } catch (e) {
        this.openFormError({ error: Resource.MsgReponse.MisaMsgError });
      }
    },

    /**
     * Cất và làm sạch
     * DVHAI 08/07/2021
     */
    async saveAndClear() {
      try {
        await this.save();
        if (this.validateResult.length == 0 && this.validateAddServer == true) {
          this.validateAddServer = false;
          this.employeeModel = {};
          await this.getNewEmployeeCode();
        }
      } catch (e) {
        this.openFormError({ error: Resource.MsgReponse.MisaMsgError });
      }
    },

    /**
     * Lưu dữ liệu
     * DVHAI 08/07/2021
     */
    async save() {
      //validate tất cả các trường
      await this.validateAll();

      //Nếu không có lỗi
      if (this.validateResult.length == 0) {
        this.$store.commit('SET_LOADER', true);
        if (
          this.formMode == Enumeration.FormMode.Add ||
          this.formMode == Enumeration.FormMode.Duplicate
        ) {
          //Thêm dữ liệu
          await this.add();
        } else if (this.formMode == Enumeration.FormMode.Edit) {
          //Sửa dữ liệu
          await this.edit();
        }
      } else {
        //Mở form lỗi
        let err = this.validateResult[0];
        if (err.errCode == Enumeration.ErrorCode.Empty) {
          this.openFormError(err);
          //Focus và ô lỗi
        } else {
          this.openFormWarning(err);
        }
      }
    },

    /**
     * Thêm bản ghi
     * DVHAI 08/07/2021
     */
    async add() {
      await EmployeeAPI.insert(this.employeeModel)
        .then((response) => {
          this.validateAddServer = true;
          console.log(response);

          //Làm mới dữ liệu
          this.refreshGrid();

          //Mở  toast message thành công
          this.$bus.emit('openToast', {
            type: Resource.ToastType.ToastSuccess,
            text: Resource.MsgReponse.AddMsgSuccess.format(this.entityName),
          });
        })
        .catch((error) => {
          console.log(error);
          //Validate trên server
          this.validateAddServer = false;

          if (error.response.status == Enumeration.HttpStatusCode.BadRequest) {
            this.openFormWarning({ error: error.response.data.data });
          } else {
            //Mở message thất bại
            this.openFormError({ error: Resource.MsgReponse.MisaMsgError });
          }
        })
        .finally(() => {
          //Đóng loader
          this.$store.commit('SET_LOADER', false);

          //Đóng validate all
          this.$store.commit('SET_HASVALIDATE', false);
        });
    },

    /**
     * Sửa bản ghi
     * DVHAI 08/07/2021
     */
    async edit() {
      await EmployeeAPI.update(
        this.employeeModel.employeeId,
        this.employeeModel
      )
        .then((response) => {
          console.log(response);
          this.validateAddServer = true;
          this.refreshGrid();
          //Mở  toast message thành công
          this.$bus.emit('openToast', {
            type: Resource.ToastType.ToastSuccess,
            text: Resource.MsgReponse.EditMsgSuccess.format(this.entityName),
          });
        })
        .catch((error) => {
          console.log(error);
           this.validateAddServer = false;
          if (error.response.status == Enumeration.HttpStatusCode.BadRequest) {
            this.openFormWarning({ error: error.response.data.data });
          } else {
            //Mở message thất bại
            this.openFormError({ error: Resource.MsgReponse.MisaMsgError });
          }
        })
        .finally(() => {
          this.$store.commit('SET_LOADER', false);
          this.$store.commit('SET_HASVALIDATE', false);
        });
    },

    /**
     * Focus vào ô lỗi
     * DVHAI 08/07/2021
     */
    focusErrorField() {
      let errorFields = document.querySelectorAll('.notValidControl');
      if (errorFields.length > 0) {
        errorFields[0].focus();
      }
    },

    /**
     * Mở form lỗi
     * DVHAI 08/07/2021
     */
    openFormError(data) {
      this.$emit('openFormError', data);
    },

    /**
     * Mở form cảnh báo
     * DVHAI 08/07/2021
     */
    openFormWarning(data) {
      this.$emit('openFormWarning', data);
    },

    /**
     * Làm mới dữ liệu
     * DVHAI 08/07/2021
     */
    refreshGrid() {
      this.$emit('refreshGrid');
    },

    /**
     * Thay đổi dữ liệu model được gọi bởi các thành phần con
     * DVHAI 08/07/2021
     */
    changeValueInput(key, value) {
      this.$set(this.employeeModel, key, value);
    },

    /**
     * Kiểm tra tất cả các input
     * DVHAI 08/07/2021
     */
    async validateAll() {
      //Khi bấm nút thêm hoặc sửa cho phép validate tất cả
      this.validateAddServer = true;

      this.$store.commit('SET_HASVALIDATE', true);
      this.validateResult = [];
      var elValidate = this.$refs.formGroup.querySelectorAll('[MustValidate]');
      for (const el of elValidate) {
        await el.querySelector('.focus').focus();
        await el.querySelector('.focus').blur();
      }
      if (this.validateResult.length == 0) {
        await this.checkUnique(this.employeeModel);
      }
    },

    /**
     * Kiểm tra giá trị duy nhất
     * DVHAI 08/07/2021
     */
    async checkUnique(value) {
      //Kiểm tra unique ở đây
      await EmployeeAPI.getEmployeeBycode(value.employeeCode).then(
        (response) => {
          console.log(response);
          if (response.status != Enumeration.HttpStatusCode.NoContent) {
            if (this.formMode == Enumeration.FormMode.Edit) {
              if (response.data.employeeId != value.employeeId) {
                this.validateResult.push({
                  isValid: false,
                  error: `Mã nhân viên <${value.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`,
                  errCode: Enumeration.ErrorCode.Duplicate,
                });
              }
            } else {
              this.validateResult.push({
                isValid: false,
                error: `Mã nhân viên <${value.employeeCode}> đã tồn tại trong hệ thống, vui lòng kiểm tra lại.`,
                errCode: Enumeration.ErrorCode.Duplicate,
              });
            }
          }
        }
      );
    },

    /**
     * Kiểm tra giá trị model bên form đã thay đổi chưa để đưa ra cảnh
     * báo đóng form (employeeOrigin, employeeModel)
     * DVHAI 08/07/2021
     */
    checkValueFormChange() {
      let isDiff = false;
      try {
        for (const property in this.employeeOrigin) {
          if (
            this.employeeOrigin[property] !=
            CommonFn.hash(this.employeeModel[property])
          ) {
            isDiff = true;
            break;
          }
        }
      } catch (e) {
        isDiff = true;
      }
      return isDiff;
    },
  },
  computed: {
    formMode() {
      return this.$store.state.formMode;
    },
  },
};
</script>

<style scoped>
@import url('../../../assets/css/views/employee/EmployeeDetail.css');
</style>
