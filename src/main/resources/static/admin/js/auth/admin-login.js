document.getElementById("formLoginAdmin").addEventListener('submit', adminLogin);

function adminLogin(e) {

    var loginAdminEmail = document.getElementById("loginAdminEmail");
    var errorLoginAdminEmail = document.getElementById("errorLoginAdminEmail");
    var email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (loginAdminEmail.value.trim() === "") {
        loginAdminEmail.style.border = "solid 1px red";
        errorLoginAdminEmail.innerHTML = "Nhập email !";
    } else if (!loginAdminEmail.value.match(email) || loginAdminEmail.value.length > 200) {
        loginAdminEmail.style.border = "solid 1px red";
        errorLoginAdminEmail.innerHTML = "Email không đúng định dạng !";
    } else {
        loginAdminEmail.style.border = "solid 1px #E6E6E6";
        errorLoginAdminEmail.innerHTML = "";
    }

    var loginAdminPassword = document.getElementById("loginAdminPassword");
    var errorLoginAdminPassword = document.getElementById("errorLoginAdminPassword");

    if (loginAdminPassword.value.trim() === "") {
        loginAdminPassword.style.border = "solid 1px red";
        errorLoginAdminPassword.innerHTML = "Nhập mật khẩu !";
    } else if (loginAdminPassword.value.trim().length < 8 || loginAdminPassword.value.trim().length > 30) {
        loginAdminPassword.style.border = "solid 1px red";
        errorLoginAdminPassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự !";
    } else {
        loginAdminPassword.style.border = "solid 1px #E6E6E6";
        errorLoginAdminPassword.innerHTML = "";
    }

    /**
     * Call API after validation form success
     * */
    if (errorLoginAdminEmail.innerHTML === "" && errorLoginAdminPassword.innerHTML === "") {
        axios.post("http://localhost:8089/api/auth/login", {
            deviceInfoDto: {
                deviceId: "string",
                deviceType: "string"
            },
            email: loginAdminEmail.value,
            password: loginAdminPassword.value

        })
            .then(function (response) {
                window.localStorage.setItem('access_token', response.data.content.accessToken);
                window.localStorage.setItem('refresh_token', response.data.content.refreshToken);

                const token = window.localStorage.getItem('access_token');
                const api = "http://localhost:8089/api/customer/me";

                axios.get(api, {headers: {"Authorization": `Bearer ${token}`}})
                    .then((res) => {
                        var iterator = res.data.content.roles;

                        for (var i in iterator) {
                            if (iterator[i].roleName === "ROLE_ADMIN") {
                                window.location = "/admin";
                            } else {
                                localStorage.clear();
                                alert('Tài khoản không hợp lệ !');
                                window.location = "/admin/login";
                            }
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            })
            .catch(function (error) {
                console.log(error);
                if (error.response.status === 404) {
                    loginAdminEmail.style.border = "solid 1px red";
                    errorLoginAdminEmail.innerHTML = "Email không tồn tại !";
                }
                if (error.response.status === 400) {
                    loginAdminPassword.style.border = "solid 1px red";
                    errorLoginAdminPassword.innerHTML = "Mật khẩu không chính xác !";
                }
            });
    } else {
        if (errorLoginAdminEmail.innerHTML === "") {
            loginAdminEmail.style.border = "solid 1px #E6E6E6";
            errorLoginAdminEmail.innerHTML = "";
        }
        if (errorLoginAdminPassword.innerHTML === "") {
            loginAdminPassword.style.border = "solid 1px #E6E6E6";
            errorLoginAdminPassword.innerHTML = "";
        }
    }
    e.preventDefault();
}





