document.getElementById("formChangePassword").addEventListener('submit', update);

function update(e) {

    const borderError = "solid 1px red";
    const borderNoError = "solid 1px #E6E6E6";

    const profilePassword = document.getElementById("profilePassword");
    const errorProfilePassword = document.getElementById("errorProfilePassword");
    const profileRePassword = document.getElementById("profileRePassword");
    const errorProfileRePassword = document.getElementById("errorProfileRePassword");

    if (profilePassword.value.trim() === "") {
        profilePassword.style.border = borderError;
        errorProfilePassword.innerHTML = "Nhập mật khẩu !";
    } else if (profilePassword.value.trim().length < 8 || profilePassword.value.trim().length > 30) {
        profilePassword.style.border = borderError;
        errorProfilePassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự !";
    } else {
        profilePassword.style.border = borderNoError;
        errorProfilePassword.innerHTML = "";
    }
    // -- Re Password --
    if (profilePassword.value !== "" && profilePassword.value !== profileRePassword.value) {
        profileRePassword.style.border = borderError;
        errorProfileRePassword.innerHTML = "Mật khẩu nhập lại không chính xác !";
    } else {
        profileRePassword.style.border = borderNoError;
        errorProfileRePassword.innerHTML = "";
    }

    /**
     Call API after validation form success
     */
    if(errorProfilePassword.innerHTML === "" && errorProfileRePassword.innerHTML === "") {
        const accessToken = localStorage.getItem("access_token");
        const data = JSON.stringify({
            "password": profilePassword.value,
            "confirmPassword": profileRePassword.value

        });
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                if(xhr.status === 200) {
                    alert("Cập nhật thành công");
                    window.location = "/customer/me"
                }
            }
        });

        xhr.open("PUT", "http://localhost:8089/api/customer/update/change-password");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    e.preventDefault();
}