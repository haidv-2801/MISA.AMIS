<template>
  <div
    :tooltiptext="validation.error"
    :style="{ '--isVisible': [validation.isValid ? 'hidden' : 'visible'] }"
    class="row__item tooltip"
  >
    <label :for="data.inputId" v-if="data.isRequired"
      >{{ data.labelText }}<span class="color-red"> *</span></label
    >
    <label v-else>{{ data.labelText }}</label>

    <DxDateBox
      class="focus"
      :displayFormat="'dd/MM/yyyy'"
      :placeholder="'DD/MM/YYYY'"
      :useMaskBehavior="true"
      :min="'01/01/1900'"
      :height="32"
      :width="180"
      :onFocusIn="focus"
      v-model="cloneModel"
      v-if="data.inputType == 'date'"
    />

    <!-- no money mask -->
    <input
      v-else
      tabindex="0"
      class="focus"
      :id="data.inputId"
      :type="data.inputType"
      :style="styleObject"
      :class="{
        notValidControl: !validation.isValid,
      }"
      :placeholder="data.mask"
      @focus="focus"
      @blur="blur"
      @input="canValidate = true"
      v-model="cloneModel"
      v-mask="data.mask"
    />
  </div>
</template>

<script>
import validate from '../../../scripts/common/validator.js';
import CommonFn from '../../../scripts/common/common.js';

// dx datebox
import 'devextreme/dist/css/dx.light.css';
import DxDateBox from 'devextreme-vue/date-box';
import Enumeration from '../../../scripts/common/enumeration.js';

export default {
  name: 'InputLabel',
  components: {
    DxDateBox,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    model: {
      default: null,
    },
    styleObject: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.cloneModel = JSON.parse(JSON.stringify(this.model));
  },
  data() {
    return {
      //Chỉ cần focus lần đầu là true
      visited: false,

      //Giá trị ban đầu được bind lên
      originData: null,

      //(1-hiển thị lỗi tooltip, 0-hiển thị lỗi tooltip)
      tooltipScale: 1,

      //Trạng thái validate
      validation: {
        isValid: true,
        error: '',
        errCode: Enumeration.ErrorCode.Valid,
      },

      //Sao chép model sang một biến mới
      cloneModel: JSON.parse(JSON.stringify(this.model)),

      //Định dạng tiền
      money: {
        decimal: '',
        thousands: '.',
        prefix: '',
        suffix: ' (VNĐ)',
        precision: 0,
        masked: false,
      },

      //Có thể validate khôgn
      canValidate: false,
    };
  },
  methods: {
    /**
     * Hiển thị lỗi khi hover
     * DVHAI 06/07/2021
     */
    mouseOver() {
      this.tooltipScale = 1;
    },

    mouseLeave() {
      this.tooltipScale = 0;
    },

    /**
     * Focus vào input
     * DVHAI 06/07/2021
     */
    focus() {
      //Lấy origindata
      if (this.visited == false) {
        this.visited = true;
        this.$bus.emit('updateOriginModel', this.data.inputId, CommonFn.hash(this.cloneModel));
      }

      //Ẩn tooltip
      this.tooltipScale = 0;
      // this.changeUniqueState(true);
    },

    /**
     * Blur input
     * DVHAI 06/07/2021
     */
    blur() {
      //validate tùy chỉnh
      if (this.hasValidate) this.validate();
    },

    /**
     * Validate duy nhất
     * DVHAI 06/07/2021
     */
    validateUnique(key, value) {
      this.$emit('checkUnique', key, value);
    },

    /**
     * Validate tùy chỉnh
     * DVHAI 06/07/2021
     */
    validate() {
      this.canValidate = false;
      for (const x of this.data.validation) {
        var cons = x.split(':'),
          validateResult =
            cons.length > 1
              ? validate[cons[0]](this.cloneModel)(cons[1])
              : validate[x](this.cloneModel);

        let errMsg = this.data.labelText + ' ' + validateResult.msg;

        //raise error
        this.setValidateError(
          validateResult.isValid,
          errMsg,
          validateResult.errCode
        );

        //error fire
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
  computed: {
    hasValidate() {
      //Nếu kích hoạt validate tất cả bằng false thì phụ thuộc vào chính nó
      //ngược lại phụ thuộc vào chính nó
      return this.$store.state.hasValidate;
    },
  },
  watch: {
    /**
     * Thay đổi giá trị model thật bên ngoài component
     * DVHAI 06/07/2021
     */
    cloneModel() {
      if (this.canValidate) this.validate();

      //Nếu là tiền thì format
      let moneyNumber = this.cloneModel || '';

      if (this.data.dataType == 'money')
        moneyNumber = CommonFn.onlyNumber(moneyNumber);

      //Thay đổi giá trị model thật bên ngoài component
      this.$emit('changeValueInput', this.data.inputId, moneyNumber);
    },

    /**
     * Sao chép dữ liệu
     * DVHAI 06/07/2021
     */
    model: {
      deep: true,
      immediate: true,
      handler: function(value) {
        this.cloneModel = JSON.parse(JSON.stringify(value));
      },
    },
  },
};
</script>

<style scoped>
@import url('../../../assets/css/common/tooltip.css');

input {
  width: 100%;
  border: 1px solid #babec5;
  border-radius: 2px;
  height: 32px;
  padding: 6px 10px;
  outline: none;
}

.row__item label {
  width: fit-content;
}
</style>
