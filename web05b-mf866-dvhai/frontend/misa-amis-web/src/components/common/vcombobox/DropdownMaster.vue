<template>
 <DxSelectBox
    class="m-select-box focus tooltip"
    :style="[!validation.isValid ? { '--color-border-input': 'red' } : {}]"
    :placeholder="cloneDataSource.placeHolder"
    :noDataText="'Không có dữ liệu cần tìm'"
    :searchEnabled="true"
    :showClearButton="false"
    :searchTimeout="0"
    :width="cloneDataSource.style.width"
    :height="cloneDataSource.style.height"
    :data-source="cloneDataSource.data.value"
    :onFocusIn="focus"
    :onFocusOut="blur"
    v-model="cloneModel"
  />

</template>

<script>
import DxSelectBox from 'devextreme-vue/select-box';
import validate from '../../../scripts/common/validator.js';
import Enumeration from '../../../scripts/common/enumeration';
import CommonFn from '../../../scripts/common/common.js';
export default {
  name: 'DropdownMaster',
  components: {
    DxSelectBox,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    model: {
      type: String,
      default: '',
    },
  },
  created() {
    //Sao chép model sang một biến mới
    this.cloneModel = JSON.parse(JSON.stringify(this.model));
    //Sao chép datasource sang một biến mới
    this.cloneDataSource = JSON.parse(JSON.stringify(this.data));
  },
  data() {
    return {
      //Có thể validate không
      canValidate: false,

      //Đánh dấu lấy dữ liệu ban đầu
      visited: false,

      //Sao chép model sang một biến mới
      cloneModel: JSON.parse(JSON.stringify(this.model)),
      //Sao chép datasource sang một biến mới
      cloneDataSource: JSON.parse(JSON.stringify(this.data)),

      //Trạng thái validate
      validation: {
        isValid: true,
        error: '',
        errCode: Enumeration.ErrorCode.Valid,
      },
    };
  },

  methods: {
    /**
     * DVHAI 06/07/2021
     */
    focus() {
      //Khi focus lần đầu sẽ lấy giá trị ban đầu ra ngoài để check thay đổi dữ liệu
      if (this.visited == false) {
        this.visited = true;

        //Chuyển sang kiểu lưu trữ
        let index = this.cloneDataSource.data.value.indexOf(this.cloneModel),
          value = this.cloneDataSource.data.key[index];

        this.$bus.emit(
          'updateOriginModel',
          this.data.data.inputId,
          CommonFn.hash(value)
        );
      }
      this.validation.isValid = true;
    },


    /**
     * Blur input
     * DVHAI 06/07/2021
     */
    blur() {
      //validate tùy chỉnh
        this.validate();
    },

    /**
     * Validate tùy chỉnh
     * DVHAI 06/07/2021
     */
    validate() {
      //Duyệt trên mảng validation có cac thuộc tính validate như required..
      for (const x of this.data.validation) {
        var cons = x.split(':'),
          validateResult =
            cons.length > 1
              ? validate[cons[0]](this.cloneModel)(cons[1])
              : validate[x](this.cloneModel);

        let errMsg = validateResult.msg.format(this.data.data.labelText);

        //Cài đặt lỗi
        this.setValidateError(
          validateResult.isValid,
          errMsg,
          validateResult.errCode
        );

        //Nếu có lỗi thêm kết quả lỗi bên component cha
        if (!validateResult.isValid) {
          this.$bus.emit('validateResult', this.validation);
          break;
        }
      }
    },

    /**
     * Cài đặt lỗi validate
     * DVHAI 06/07/2021
     */
    setValidateError(isValid, errorMsg, errCode) {
      this.validation.isValid = isValid;
      this.validation.error = errorMsg;
      this.validation.errCode = errCode;
    },
  },

  watch: {
    
    /**
     *Theo dõi giá trị của bản sao và thay đổi bản gốc bên ngoài component
     * DVHAI 07/07/2021
     */
    cloneModel() {
      //Ánh xạ dữ liệu hiển thị sang dữ liệu lưu trữ
      let index = this.cloneDataSource.data.value.indexOf(this.cloneModel),
        value = this.cloneDataSource.data.key[index];

      this.$emit('changeValueInput', this.cloneDataSource.data.inputId, value);
    },

    /**
     *Theo dõi model và tạo ra một bản sao mới bên trong này
     * DVHAI 07/07/2021
     */
    model() {
      this.cloneModel = JSON.parse(JSON.stringify(this.model));
    },

    /**
     * Theo dõi dữ liệu trong prop và sao chép
     * sang một biến mới
     * DVHAI 07/07/2021
     */
    data: {
      deep: true,
      handler: function(value) {
        if (value) {
          this.cloneDataSource = JSON.parse(JSON.stringify(value));

          //Lấy vị trí của bên hiển thị và ánh xạ sang mã
          let index = value.data.value.indexOf(this.cloneModel),
            val = value.data.key[index];

          //Thay đổi giá trị model bên component cha
          this.$emit('changeValueInput', value.data.inputId, val);
        }
      },
    },
  },
  computed: {
  },
};
</script>

<style>
/* @import url('../../../assets/css/common/tooltip.css'); */
.dx-widget {
  font-size: 13px;
}
.m-select-box .dx-texteditor-input {
  padding: 6px 10px;
}

.dx-texteditor.dx-editor-outlined {
  border-radius: 2px;
}

.dx-dropdowneditor-icon {
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
}

.m-select-box .dx-state-hover {
  background-color: #e0e0e0;
}

.dx-list-item.dx-state-active {
  background-color: transparent !important;
  color: inherit !important;
}

.dx-dropdowneditor-button.dx-state-active .dx-dropdowneditor-icon,
.dx-dropdowneditor.dx-dropdowneditor-active .dx-dropdowneditor-icon {
  background-color: transparent;
}

.dx-texteditor.dx-editor-outlined {
  border: 1px solid #babec5;
}

.m-select-box.dx-texteditor.dx-editor-outlined {
  border: 1px solid var(--color-border-input);
  /* border: 1px solid red; */
}

/* toan */
.dx-selectbox-popup-wrapper
  .dx-item.dx-list-item.dx-state-active
  .dx-item-content.dx-list-item-content,
.dx-selectbox-popup-wrapper
  .dx-item.dx-list-item.dx-list-item-selected
  .dx-item-content.dx-list-item-content {
  color: #35bf22 !important;
  background-color: #ebedf0;
  border: 0;
}
.dx-selectbox-popup-wrapper
  .dx-item.dx-list-item.dx-state-hover
  .dx-item-content.dx-list-item-content {
  background-color: #ebedf0;
  border: 0;
}

.dx-selectbox-popup-wrapper .dx-state-focused {
  border: none !important;
  outline: none !important;
  background-color: #ebedf0 !important;
  color: inherit !important;
}
</style>
