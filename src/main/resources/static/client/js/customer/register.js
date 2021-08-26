document.getElementById("registerForm").addEventListener('submit', register);

function register(event) {

    // --- Full name ---
    var registerFullName = document.getElementById("registerFullName");
    var errorRegisterFullName = document.getElementById("errorRegisterFullName");

    if (registerFullName.value.trim() === "") {
        registerFullName.style.border = "solid 1px red";
        errorRegisterFullName.innerHTML = "Nhập họ và tên !";
    } else if (registerFullName.value.trim().length < 3 || registerFullName.value.trim().length > 50) {
        registerFullName.style.border = "solid 1px red";
        errorRegisterFullName.innerHTML = "Nhập họ và tên từ 3 - 50 ký tự !";
    } else {
        registerFullName.style.border = "solid 1px #E6E6E6";
        errorRegisterFullName.innerHTML = "";
    }


    // --- Email ---
    var registerEmail = document.getElementById("registerEmail");
    var errorRegisterEmail = document.getElementById("errorRegisterEmail");
    var email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (registerEmail.value.trim() === "") {
        registerEmail.style.border = "solid 1px red";
        errorRegisterEmail.innerHTML = "Nhập email !";
    } else if (!registerEmail.value.match(email) || registerEmail.value.length > 200) {
        registerEmail.style.border = "solid 1px red";
        errorRegisterEmail.innerHTML = "Email không đúng định dạng !";
    } else {
        registerEmail.style.border = "solid 1px #E6E6E6";
        errorRegisterEmail.innerHTML = "";
    }


    // --- Password ---
    var registerPassword = document.getElementById("registerPassword");
    var errorRegisterPassword = document.getElementById("errorRegisterPassword");
    var registerRePassword = document.getElementById("registerRePassword");
    var errorRegisterRePassword = document.getElementById("errorRegisterRePassword");

    if (registerPassword.value.trim() === "") {
        registerPassword.style.border = "solid 1px red";
        errorRegisterPassword.innerHTML = "Nhập mật khẩu !";
    } else if (registerPassword.value.trim().length < 8 || registerPassword.value.trim().length > 30) {
        registerPassword.style.border = "solid 1px red";
        errorRegisterPassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự !";
    } else {
        registerPassword.style.border = "solid 1px #E6E6E6";
        errorRegisterPassword.innerHTML = "";
    }
    // -- Re Password --
    if (registerPassword.value !== "" && registerPassword.value !== registerRePassword.value) {
        registerRePassword.style.border = "solid 1px red";
        errorRegisterRePassword.innerHTML = "Mật khẩu nhập lại không chính xác !";
    } else {
        registerRePassword.style.border = "solid 1px #E6E6E6";
        errorRegisterRePassword.innerHTML = "";
    }

    // --- Phone number ---
    var phoneNumber = /^((?=(0))[0-9]{10})$/;
    var registerPhoneNumber = document.getElementById("registerPhoneNumber");
    var errorRegisterPhoneNumber = document.getElementById("errorRegisterPhoneNumber");

    if (!registerPhoneNumber.value.match(phoneNumber)) {
        registerPhoneNumber.style.border = "solid 1px red";
        errorRegisterPhoneNumber.innerHTML = "Số điện thoại không đúng định dạng !";
    } else {
        registerPhoneNumber.style.border = "solid 1px #E6E6E6";
        errorRegisterPhoneNumber.innerHTML = "";
    }

    // --- Address ---
    var registerAddress = document.getElementById("registerAddress");
    var errorRegisterAddress = document.getElementById("errorRegisterAddress");

    if (registerAddress.value.trim().length < 20 || registerAddress.value.trim().length > 100) {
        registerAddress.style.border = "solid 1px red";
        errorRegisterAddress.innerHTML = "Địa chỉ từ 20 - 100 ký tự !";
    } else {
        registerAddress.style.border = "solid 1px #E6E6E6";
        errorRegisterAddress.innerHTML = "";
    }

    /**
     Call API after validation form success
     */
    if (errorRegisterFullName.innerHTML === "" && errorRegisterEmail.innerHTML === ""
        && errorRegisterPassword.innerHTML === "" && errorRegisterRePassword.innerHTML === ""
        && errorRegisterPhoneNumber.innerHTML === "" && errorRegisterAddress.innerHTML === "") {

        // Reverse date YYYY-MM-DD ==> DD-MM-YYYY
        var splitBirthday = registerBirthday.value.split("-");
        var reverseArray = splitBirthday.reverse();
        var birthdayJoinArray = reverseArray.join("-");

        var gender = document.getElementById("registerGender").value;

        axios.post(baseUrl + "/customer/register", {

            fullName: $('#registerFullName').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val(),
            confirmPassword: $('#registerRePassword').val(),
            gender: gender,
            birthday: birthdayJoinArray,
            phoneNumber: $('#registerPhoneNumber').val(),
            address: $('#registerAddress').val()

        }).then(function () {
            alert("Đăng ký thành công");
            window.location = "/login";
        }).catch(function (error) {
            if (error.response.status === 400) {
                var iterator = error.response.data.message.values();
                for (let element of iterator) {
                    if (element.includes("Email")) {
                        registerEmail.style.border = "solid 1px red";
                        errorRegisterEmail.innerHTML = "Email đã được sử dụng !";
                    }
                    if (element.includes("Số điện thoại")) {
                        registerPhoneNumber.style.border = "solid 1px red";
                        errorRegisterPhoneNumber.innerHTML = "Số điện thoại đã được sử dụng !";
                    }
                }
            }
        });
    } else {
        if (errorRegisterEmail.innerHTML === "") {
            registerEmail.style.border = "solid 1px #E6E6E6";
            errorRegisterEmail.innerHTML = "";
        }
        if (registerPhoneNumber.style.border === "") {
            registerPhoneNumber.style.border = "solid 1px #E6E6E6";
            errorRegisterPhoneNumber.innerHTML = "";
        }
    }

    event.preventDefault();
}
