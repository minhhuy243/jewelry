document.getElementById("registerForm").addEventListener('submit', validation);

function validation(event) {

    // --- Full name ---
    var registerFullName = document.getElementById("registerFullName");
    var errorRegisterFullName = document.getElementById("errorRegisterFullName");

    if (registerFullName.value.trim() === "") {
        console.log(registerFullName.value);
        registerFullName.style.border = "solid 2px red";
        errorRegisterFullName.innerHTML = "Nhập họ và tên !";
    } else if (registerFullName.value.trim().length < 3 || registerFullName.value.trim().length > 50) {
        registerFullName.style.border = "solid 2px red";
        errorRegisterFullName.innerHTML = "Nhập họ và tên từ 3 - 50 ký tự !";
    } else {
        registerFullName.style.border = "solid 2px green";
        errorRegisterFullName.innerHTML = "";
    }


    // --- Email ---
    var registerEmail = document.getElementById("registerEmail");
    var errorRegisterEmail = document.getElementById("errorRegisterEmail");
    var email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (registerEmail.value.trim() === "") {
        registerEmail.style.border = "solid 2px red";
        errorRegisterEmail.innerHTML = "Nhập email !";
    } else if (!registerEmail.value.match(email) || registerEmail.value.length > 200) {
        registerEmail.style.border = "solid 2px red";
        errorRegisterEmail.innerHTML = "Email không đúng định dạng !";
    } else {
        registerEmail.style.border = "solid 2px green";
        errorRegisterEmail.innerHTML = "";
    }


    // --- Password ---
    var registerPassword = document.getElementById("registerPassword");
    var errorRegisterPassword = document.getElementById("errorRegisterPassword");
    var registerRePassword = document.getElementById("registerRePassword");
    var errorRegisterRePassword = document.getElementById("errorRegisterRePassword");

    if (registerPassword.value.trim() === "") {
        registerPassword.style.border = "solid 2px red";
        errorRegisterPassword.innerHTML = "Nhập mật khẩu !";
    } else if (registerPassword.value.trim().length < 8 || registerPassword.value.trim().length > 30) {
        registerPassword.style.border = "solid 2px red";
        errorRegisterPassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự !";
    } else {
        registerPassword.style.border = "solid 2px green";
        errorRegisterPassword.innerHTML = "";
    }
    // -- Re Password --
    if (registerPassword.value !== "" && registerPassword.value !== registerRePassword.value) {
        registerRePassword.style.border = "solid 2px red";
        errorRegisterRePassword.innerHTML = "Mật khẩu nhập lại không chính xác !";
    } else {
        registerRePassword.style.border = "solid 2px green";
        errorRegisterRePassword.innerHTML = "";
    }


    // --- Birthday ---
    var birthday = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;   // FORMAT : YYYY-MM-DD
    var registerBirthday = document.getElementById("registerBirthday");
    var errorRegisterBirthday = document.getElementById("errorRegisterBirthday");

    if (!registerBirthday.value.match(birthday)) {
        registerBirthday.style.border = "solid 2px red";
        errorRegisterBirthday.innerHTML = "Sinh nhật không đúng định dạng !";
    } else {
        registerBirthday.style.border = "solid 2px green";
        errorRegisterBirthday.innerHTML = "";
    }

    // --- Phone number ---
    var phoneNumber = /^((?=(0))[0-9]{10})$/;
    var registerPhoneNumber = document.getElementById("registerPhoneNumber");
    var errorRegisterPhoneNumber = document.getElementById("errorRegisterPhoneNumber");

    if (!registerPhoneNumber.value.match(phoneNumber)) {
        registerPhoneNumber.style.border = "solid 2px red";
        errorRegisterPhoneNumber.innerHTML = "Số điện thoại không đúng định dạng !";
    } else {
        registerPhoneNumber.style.border = "solid 2px green";
        errorRegisterPhoneNumber.innerHTML = "";
    }

    // --- Address ---
    var registerAddress = document.getElementById("registerAddress");
    var errorRegisterAddress = document.getElementById("errorRegisterAddress");

    if (registerAddress.value.trim().length < 20 || registerAddress.value.trim().length > 100) {
        registerAddress.style.border = "solid 2px red";
        errorRegisterAddress.innerHTML = "Địa chỉ từ 20 - 100 ký tự!";
    } else {
        registerAddress.style.border = "solid 2px green";
        errorRegisterAddress.innerHTML = "";
    }


    if(errorRegisterFullName.innerHTML === ""){
        console.log("Tao da thanh cong");
    }

    /**
     Call API after valid form success
     */
    if(errorRegisterFullName.innerHTML === "" && errorRegisterEmail.innerHTML === "" && errorRegisterPassword.innerHTML === ""
        && errorRegisterRePassword.innerHTML === "" && errorRegisterBirthday.innerHTML === ""
        && errorRegisterPhoneNumber.innerHTML === "" && errorRegisterAddress.innerHTML === "") {
        console.log("ksfksfsdfk asdfksd kskasdfk sdf");

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

        }).then(function (response) {
            console.log(response);
            window.location = "/login";
        })
            .catch(function (error) {
                console.log(error);
                if (error.response.status === 404) {
                    console.log(error);
                }
                if (error.response.status === 400) {
                    console.log(error);
                }
            });

    }

    event.preventDefault();
}