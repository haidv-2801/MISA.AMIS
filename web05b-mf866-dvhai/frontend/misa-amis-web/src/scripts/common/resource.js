//Resource dùng chung cho toàn chương trình
var Resource = Resource || {};

//Thông báo trả về
Resource.MsgReponse = {
  MisaMsgError: "Lỗi, vui lòng liên hệ MISA",
  EditMsgSuccess: "Sửa {0} thành công",
  AddMsgSuccess: "Thêm {0} thành công",
  DeleteMsgSuccess: "Xóa {0} thành công",
  GenerationError: "Không thể tạo mã",
  DuplicateMsgError: "{0} {1} đã tồn tại trong hệ thống, vui lòng kiểm tra lại",
};

Resource.MsgQuestion = {
    MsgConfirmDelete: "Bạn có thực sự muốn xóa {0} {1} không?",
}

//Kiểu toast
Resource.ToastType = {
  ToastInfo: 'toast--info',
  ToastError: 'toast--error',
  ToastSuccess: 'toast--success',
};

Resource.DataTypeColumn = {
  Number: 'Number',
  Date: 'Date',
  Enum: 'Enum',
};

//Các method khi gọi ajax
Resource.Method = {
  Get: 'Get',
  Post: 'Post',
  Put: 'Put',
  Delete: 'Delete',
};

//Giới tính
Resource.Gender = {
  Female: 'Nữ',
  Male: 'Nam',
  Other: 'Khác',
};

//Tinh trang
Resource.WorkStatus = {
  Active: 'Đang làm việc', //Dang lam viec
  Intern: 'Đang thử việc', //Dang thu viec
  Retired: 'Đã nghỉ việc', //Nghi viec
};

//Các comandtype của toolbar
Resource.CommandType = {
  Add: 'Add',
  Edit: 'Edit',
  Delete: 'Delete',
  Refresh: 'Refresh',
  Import: 'Import',
  Export: 'Export',
  SlideToggle: 'SlideToggle',
};

//Các commandform của toolbar
Resource.CommandForm = {
  Save: 'Save',
  Cancel: 'Cancel',
};

export default Resource;
