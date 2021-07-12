
import Resource from '../../scripts/common/resource.js'
import Enumeration from '../../scripts/common/enumeration.js'

var CommonFn = CommonFn || {}; 

//Băm giá trị
CommonFn.hash = (value) => {
    value = value || '';
    return value.toString().hashCode();
}

// Hàm format số tiền
CommonFn.formatMoney = money => {
    if(money && !isNaN(money)){
        return money.toString().replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1.");
    }else{
        return money;
    }
}

CommonFn.formatMoneyVer2 = money => {
    if(money && !isNaN(money)){
        let ans = money.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        return ans;
    }else{
        return money;
    }
}

// Format ngày tháng
CommonFn.formatDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${day}/${month}/${year}`;
}

// Kiểm tra xem có phải dạng date không
CommonFn.isDateFormat = (date) => {
    let regex = new RegExp("([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})");
    
    return regex.test(date);
}

// Format ngày tháng
CommonFn.convertDate = dateSrc => {
    let date = new Date(dateSrc),
        year = date.getFullYear().toString(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

//Lấy value từ enum
CommonFn.getValueEnum = (data, enumName) => {
    let enumeration = Enumeration[enumName],
        resource  = Resource[enumName];

    for(let propName in enumeration) {
        if(enumeration[propName] == data) {
            data = resource[propName];
        }
    }

    return data;
}

/**
 * Hàm chuẩn hóa tên
 * Chữ cái đầu viết hoa, xóa khoảng trắng không cần thiết
 * DVHAI 04/06/2021 
 */
CommonFn.formatName = (data) => {
    return data.trim().replace(/\b\w/g, c => c.toUpperCase()).replace(/\s+/g, ' ');
}

/**
 * Hàm validate email
 * DVHAI 04/06/2021 
 */

 CommonFn.validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

/**
 * Hàm validate phone number
 * DVHAI 05/06/2021 
 */

 CommonFn.validatePhone = (phone) => {
    var re = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return re.test(phone);
}
/**
 * Hàm xóa các kí tự không phải số và chữ
 * DVHAI 05/06/2021 
 */
CommonFn.removeSymbol = (value) => {
    return value.replace(/[^\w\s]/gi, '');
}

/**
 * Hàm xóa các kí tự không phải số 
 * DVHAI 05/06/2021 
 */
 CommonFn.onlyNumber = (value) => {
    return value.toString().replace(/[^\d]/gi, '');
}

export default CommonFn
