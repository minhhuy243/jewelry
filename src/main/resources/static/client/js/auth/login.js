document.getElementById("loginForm").addEventListener('submit', login);

function login(e) {

    var loginEmail = document.getElementById("loginEmail");
    var errorLoginEmail = document.getElementById("errorLoginEmail");
    var email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (loginEmail.value.trim() === "") {
        loginEmail.style.border = "solid 1px red";
        errorLoginEmail.innerHTML = "Nhập email !";
    } else if (!loginEmail.value.match(email) || loginEmail.value.length > 200) {
        loginEmail.style.border = "solid 1px red";
        errorLoginEmail.innerHTML = "Email không đúng định dạng !";
    } else {
        loginEmail.style.border = "solid 1px #E6E6E6";
        errorLoginEmail.innerHTML = "";
    }

    var loginPassword = document.getElementById("loginPassword");
    var errorLoginPassword = document.getElementById("errorLoginPassword");

    if (loginPassword.value.trim() === "") {
        loginPassword.style.border = "solid 1px red";
        errorLoginPassword.innerHTML = "Nhập mật khẩu !";
    } else if (loginPassword.value.trim().length < 8 || loginPassword.value.trim().length > 30) {
        loginPassword.style.border = "solid 1px red";
        errorLoginPassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự !";
    } else {
        loginPassword.style.border = "solid 1px #E6E6E6";
        errorLoginPassword.innerHTML = "";
    }

    /**
     * Call API after validation form success
     * */
    if (errorLoginEmail.innerHTML === "" && errorLoginPassword.innerHTML === "") {
        axios.post(baseUrl + "/auth/login", {
            deviceInfoDto: {
                deviceId: "string",
                deviceType: "string"
            },
            email: $('#loginEmail').val(),
            password: $('#loginPassword').val(),
        })
            .then(function (response) {
                window.localStorage.setItem('access_token', response.data.content.accessToken);
                window.localStorage.setItem('refresh_token', response.data.content.refreshToken);
                window.location = "/";
            })
            .catch(function (error) {
                if (error.response.status === 404) {
                    loginEmail.style.border = "solid 1px red";
                    errorLoginEmail.innerHTML = "Email không tồn tại !";
                }
                if (error.response.status === 400) {
                    loginPassword.style.border = "solid 1px red";
                    errorLoginPassword.innerHTML = "Mật khẩu không chính xác !";
                }
                if (error.response.status === 401) {
                    alert("Tài khoản đã bị khóa!")
                    window.location = "/login"
                }
            });
    } else {
        if(errorLoginEmail.innerHTML === "") {
            loginEmail.style.border = "solid 1px #E6E6E6";
            errorLoginEmail.innerHTML = "";
        }
        if(errorLoginPassword.innerHTML === "") {
            loginPassword.style.border = "solid 1px #E6E6E6";
            errorLoginPassword.innerHTML = "";
        }
    }

    e.preventDefault();
}




