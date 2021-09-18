function Validator(formselector) {
    var formRules = {};

    /**
        * Quy ước tạo rule:
        * - Nếu có lỗi thì return ` error message`
        * - Nếu không có lỗi thì return `undefined`
     */
    var validatoRules = {
        required: function (value) {
            return value ? undefined : ' Vui lòng nhập trường này'
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : ' Vui lòng nhập email'
        },
        min: function (min) {
            return function(value) {
                return value.lenght >= min ? undefined : `Vui lòng nhập tối thiểu ${min} ksy tự`
            }
        },
        max: function (max) {
            return function(value) {
                return value.lenght <= max ? undefined : `Vui lòng nhập tối đa ${max} ksy tự`
            }
        }
    };
    // Lấy ra form elenment trong DOM theo `formSelector`
    var formElement = document.querySelector(formselector)
    
    //  Chỉ xử lý khi có element trong DOm 
    if(formElement) {
        
        var inputs = formElement.querySelectorAll('[name][rules]') 
        for(var input of inputs) {

            var rules = input.getAttribute('rules').split('|');
            for( var rule of rules) {
                console.log(rule)
            }
            formRules[input.name] = input.getAttribute('rules')
            // console.log(input.getAttribute('rules'))
        }
        // console.log(formRules)
    }
}