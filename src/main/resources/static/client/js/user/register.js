document.getElementById("registerForm").addEventListener('submit', register);

async function register(e) {
    e.preventDefault();
    const borderError = "solid 1px red";
    const borderNoError = "solid 1px #E6E6E6";

    // --- Full name ---
    const registerFullName = document.getElementById("registerFullName");
    const errorRegisterFullName = document.getElementById("errorRegisterFullName");

    if (registerFullName.value.trim() === "") {
        registerFullName.style.border = borderError;
        errorRegisterFullName.innerHTML = "Nhập họ và tên !";
    } else if (registerFullName.value.trim().length < 3 || registerFullName.value.trim().length > 50) {
        registerFullName.style.border = borderError;
        errorRegisterFullName.innerHTML = "Nhập họ và tên từ 3 - 50 ký tự !";
    } else {
        registerFullName.style.border = borderNoError;
        errorRegisterFullName.innerHTML = "";
    }


    // --- Email ---
    const registerEmail = document.getElementById("registerEmail");
    const errorRegisterEmail = document.getElementById("errorRegisterEmail");
    const email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (registerEmail.value.trim() === "") {
        registerEmail.style.border = borderError;
        errorRegisterEmail.innerHTML = "Nhập email !";
    } else if (!registerEmail.value.match(email) || registerEmail.value.length > 200) {
        registerEmail.style.border = borderError;
        errorRegisterEmail.innerHTML = "Email không đúng định dạng !";
    } else {
        registerEmail.style.border = borderNoError;
        errorRegisterEmail.innerHTML = "";
    }


    // --- Password ---
    const registerPassword = document.getElementById("registerPassword");
    const errorRegisterPassword = document.getElementById("errorRegisterPassword");
    const registerRePassword = document.getElementById("registerRePassword");
    const errorRegisterRePassword = document.getElementById("errorRegisterRePassword");

    if (registerPassword.value.trim() === "") {
        registerPassword.style.border = borderError;
        errorRegisterPassword.innerHTML = "Nhập mật khẩu !";
    } else if (registerPassword.value.trim().length < 8 || registerPassword.value.trim().length > 30) {
        registerPassword.style.border = borderError;
        errorRegisterPassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự !";
    } else {
        registerPassword.style.border = borderNoError;
        errorRegisterPassword.innerHTML = "";
    }
    // -- Re Password --
    if (registerPassword.value !== "" && registerPassword.value !== registerRePassword.value) {
        registerRePassword.style.border = borderError;
        errorRegisterRePassword.innerHTML = "Mật khẩu nhập lại không chính xác !";
    } else {
        registerRePassword.style.border = borderNoError;
        errorRegisterRePassword.innerHTML = "";
    }

    // --- Phone number ---
    const phoneNumber = /^((?=(0))[0-9]{10})$/;
    const registerPhoneNumber = document.getElementById("registerPhoneNumber");
    const errorRegisterPhoneNumber = document.getElementById("errorRegisterPhoneNumber");

    if (!registerPhoneNumber.value.match(phoneNumber)) {
        registerPhoneNumber.style.border = borderError;
        errorRegisterPhoneNumber.innerHTML = "Số điện thoại không đúng định dạng !";
    } else {
        registerPhoneNumber.style.border = borderNoError;
        errorRegisterPhoneNumber.innerHTML = "";
    }

    // --- Address ---
    const registerAddress = document.getElementById("registerAddress");
    const errorRegisterAddress = document.getElementById("errorRegisterAddress");

    if (registerAddress.value.trim().length < 20 || registerAddress.value.trim().length > 100) {
        registerAddress.style.border = borderError;
        errorRegisterAddress.innerHTML = "Địa chỉ từ 20 - 100 ký tự !";
    } else {
        registerAddress.style.border = borderNoError;
        errorRegisterAddress.innerHTML = "";
    }

    // --- Birthday ---
    const registerBirthday = document.getElementById("registerBirthday");
    const errorRegisterBirthday = document.getElementById("errorRegisterBirthday");

    if (registerBirthday.value === null || registerBirthday.value.trim() === "") {
        registerBirthday.style.border = borderError;
        errorRegisterBirthday.innerHTML = "Nhập sinh nhật !";
    } else {
        registerBirthday.style.border = borderNoError;
        errorRegisterBirthday.innerHTML = "";
    }

    /**
     Call API after validation form success
     */
    if (errorRegisterFullName.innerHTML === "" && errorRegisterEmail.innerHTML === ""
        && errorRegisterPassword.innerHTML === "" && errorRegisterRePassword.innerHTML === ""
        && errorRegisterPhoneNumber.innerHTML === "" && errorRegisterAddress.innerHTML === "" && errorRegisterBirthday.innerHTML === "") {

        // Reverse date YYYY-MM-DD ==> DD-MM-YYYY
        const splitBirthday = registerBirthday.value.split("-");
        const reverseArray = splitBirthday.reverse();
        const birthdayJoinArray = reverseArray.join("-");

        const gender = document.getElementById("registerGender").value;

        await axios.post(baseUrl + "/user/register", {

            fullName: $('#registerFullName').val(),
            email: $('#registerEmail').val(),
            password: $('#registerPassword').val(),
            rePassword: $('#registerRePassword').val(),
            gender: gender,
            birthday: birthdayJoinArray,
            phoneNumber: $('#registerPhoneNumber').val(),
            address: $('#registerAddress').val()

        }).then(function () {
            alert("Đăng ký thành công!");
            window.location = "/login";
        }).catch(function (error) {
            if (error.response.status === 400) {
                const iterator = error.response.data;
                for (let element of iterator) {
                    if (element.includes("Email")) {
                        registerEmail.style.border = borderError;
                        errorRegisterEmail.innerHTML = "Email đã được sử dụng !";
                    }
                    if (element.includes("Số điện thoại")) {
                        registerPhoneNumber.style.border = borderError;
                        errorRegisterPhoneNumber.innerHTML = "Số điện thoại đã được sử dụng !";
                    }
                }
            }
        });
    } else {
        if (errorRegisterEmail.innerHTML === "") {
            registerEmail.style.border = borderNoError;
            errorRegisterEmail.innerHTML = "";
        }
        if (registerPhoneNumber.style.border === "") {
            registerPhoneNumber.style.border = borderNoError;
            errorRegisterPhoneNumber.innerHTML = "";
        }
    }
}
