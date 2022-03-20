document.getElementById("formChangePassword").addEventListener('submit', update);

async function update(e) {

    e.preventDefault();

    const borderError = "solid 1px red";
    const borderNoError = "solid 1px #E6E6E6";

    const oldPassword = document.getElementById("oldPassword");
    const errorOldPassword = document.getElementById("errorOldPassword");
    const profilePassword = document.getElementById("profilePassword");
    const errorProfilePassword = document.getElementById("errorProfilePassword");
    const profileRePassword = document.getElementById("profileRePassword");
    const errorProfileRePassword = document.getElementById("errorProfileRePassword");

    if (oldPassword.value.trim() === "") {
        oldPassword.style.border = borderError;
        errorOldPassword.innerHTML = "Vui lòng nhập mật khẩu cũ!";
    } else {
        oldPassword.style.border = borderNoError;
        errorOldPassword.innerHTML = "";
    }

    if (profilePassword.value.trim() === "") {
        profilePassword.style.border = borderError;
        errorProfilePassword.innerHTML = "Vui lòng nhập mật khẩu mới!";
    } else if (profilePassword.value.trim().length < 8 || profilePassword.value.trim().length > 30) {
        profilePassword.style.border = borderError;
        errorProfilePassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự!";
    } else {
        profilePassword.style.border = borderNoError;
        errorProfilePassword.innerHTML = "";
    }
    // -- Re Password --
    if (profilePassword.value !== "" && profilePassword.value !== profileRePassword.value) {
        profileRePassword.style.border = borderError;
        errorProfileRePassword.innerHTML = "Mật khẩu mới nhập lại không chính xác!";
    } else {
        profileRePassword.style.border = borderNoError;
        errorProfileRePassword.innerHTML = "";
    }

    /**
     Call API after validation form success
     */
    if(errorProfilePassword.innerHTML === "" && errorProfileRePassword.innerHTML === "" && errorOldPassword.innerHTML === "") {

        await instance.put("/user/update/change-password", {
            oldPassword: oldPassword.value,
            newPassword: profilePassword.value,
            reNewPassword: profileRePassword.value
        }).then((res) => {
            if(res.status === 200) {
                alert("Đổi mật khẩu thành công!");
                window.location = "/user/me";
            }
        })
    }

}