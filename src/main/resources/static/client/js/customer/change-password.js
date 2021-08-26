document.getElementById("formChangePassword").addEventListener('submit', update);

function update(e) {
    var profilePassword = document.getElementById("profilePassword");
    var errorProfilePassword = document.getElementById("errorProfilePassword");
    var profileRePassword = document.getElementById("profileRePassword");
    var errorProfileRePassword = document.getElementById("errorProfileRePassword");

    if (profilePassword.value.trim() === "") {
        profilePassword.style.border = "solid 1px red";
        errorProfilePassword.innerHTML = "Nhập mật khẩu !";
    } else if (profilePassword.value.trim().length < 8 || profilePassword.value.trim().length > 30) {
        profilePassword.style.border = "solid 1px red";
        errorProfilePassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự !";
    } else {
        profilePassword.style.border = "solid 1px #E6E6E6";
        errorProfilePassword.innerHTML = "";
    }
    // -- Re Password --
    if (profilePassword.value !== "" && profilePassword.value !== profileRePassword.value) {
        profileRePassword.style.border = "solid 1px red";
        errorProfileRePassword.innerHTML = "Mật khẩu nhập lại không chính xác !";
    } else {
        profileRePassword.style.border = "solid 1px #E6E6E6";
        errorProfileRePassword.innerHTML = "";
    }

    /**
     Call API after validation form success
     */
    if(errorProfilePassword.innerHTML === "" && errorProfileRePassword.innerHTML === "") {
        const accessToken = sessionStorage.getItem("access_token");
        var data = JSON.stringify({
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
                console.log(this.responseText);
            }
        });

        xhr.open("PUT", "http://localhost:8089/api/customer/update/change-password");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);
    }

    e.preventDefault();
}