//các eum dùng chung
var Enumeration = Enumeration || {};

//Status code
Enumeration.HttpStatusCode = {
    NoContent: 204,
    NotFound: 404,
};


//Các mode formdetail
Enumeration.FormMode = {
    Add: 1,
    Edit: 2,
    Delete: 3,
    Duplicate: 4
};

//Giới tính
Enumeration.Gender = {
    Female: 1, //Nữ
    Male: 0,    //Nam
    Other: 2,   //Khác
};

//Tinh trang
Enumeration.WorkStatus = {
    Active: 0, //Dang lam viec
    Intern: 1,    //Dang thu viec
    Retired: 2,   //Nghi viec
};


//Giới tính
Enumeration.Keyboard = {
    Enter: 13,
    Esc: 27,
    ArrawUp: 38,
    ArrawDown: 40
};

//Mã lỗi
Enumeration.ErrorCode = {
    Valid: 3,   // Dữ liệ hợp lệ
    InValid: 0, // Dũ liệu không hợp lệ
    IncorrectFormat: 1, // Không đúng định dạng
    Empty: 2,   // Rỗng
    Duplicate: 4 // Trùng
};


export default Enumeration

