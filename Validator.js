
// Đối tượng `Validator`
function Validator(options) {

    var selectorRules = {};
    // Hàm thực hiện validate
    function validate(inputElement,rule) {
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorMessage);
                    if(errorMessage) {
                        errorElement.innerText = errorMessage;
                        inputElement.parentElement.classList.add('invalid')
                    } else {
                        errorElement.innerText = '';
                        inputElement.parentElement.classList.remove('invalid')
                    }
    }

    // Lấy element của form cần validate
    var formElement = document.querySelector(options.form)
    if (formElement) {
        options.rules.forEach(function (rule) { 

            // Lưu lại các rules cho mỗi input
            if(Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            
            var inputElement = formElement.querySelector(rule.selector);
            
            if (inputElement) {
                // Xử lý trường hợp blur khỏi input
                inputElement.onblur = function () {
                    // value: input Element.value
                    // test func: rule.test
                    validate(inputElement,rule)
                }
                
                // Xử lý  mỗi khi người dùng nhập input
                inputElement.oninput = function () {
                    var errorElement = inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }
    console.log(selectorRules)
}

// Định nghĩa Rules
// Nguyên tắc cảu cá rules:
// 1. Khi có lỗi => Trả ra message lỗi
// 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
Validator.isRequired = function (selector, message) {
    return {
        selector:selector,
        test: function (value) {
            return value.trim() ? undefined : message || 'Vui lòng nhập trường này'
        }
    }
    
}

Validator.isEmail = function (selector, message) {
   return {
        selector:selector,
        test: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || 'Trường này phải là email'
        }
    }
}
Validator.minLength = function (selector, min, message) {
    return {
         selector:selector,
         test: function (value) {
             return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} ký tự`
         }
     }
 }
 
Validator.isConfirmed = function (selector, getConfirmValue, message) {
    return {
        selector:selector,
        test: function (value) {
            return value === getConfirmValue() ? undefined :  message ||'Giá trị nhập vào không chính xác'
        }
    }
}