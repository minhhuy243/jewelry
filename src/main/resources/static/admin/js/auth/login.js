document.getElementById("formLogin").addEventListener('submit', login);

async function login(e) {
    e.preventDefault();
    const borderError = "solid 1px red";
    const borderNoError = "solid 1px #E6E6E6";

    const email = document.getElementById("email");
    const errorEmail = document.getElementById("errorEmail");
    const errorRole = document.getElementById("errorRole");
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value.trim() === "") {
        email.style.border = borderError;
        errorEmail.innerHTML = "Nhập email !";
    } else if (!email.value.match(regexEmail) || email.value.length > 200) {
        email.style.border = borderError;
        errorEmail.innerHTML = "Email không đúng định dạng !";
    } else {
        email.style.border = borderNoError;
        errorEmail.innerHTML = "";
    }

    const password = document.getElementById("password");
    const errorPassword = document.getElementById("errorPassword");

    if (password.value.trim() === "") {
        password.style.border = borderError;
        errorPassword.innerHTML = "Nhập mật khẩu !";
    } else if (password.value.trim().length < 8 || password.value.trim().length > 30) {
        password.style.border = borderError;
        errorPassword.innerHTML = "Mật khẩu từ 8 - 30 ký tự !";
    } else {
        password.style.border = borderNoError;
        errorPassword.innerHTML = "";
    }

    /**
     * Call API after validation form success
     * */
    if (errorEmail.innerHTML === "" && errorPassword.innerHTML === "") {
        const url = "http://localhost:8089/api/auth/login";
        await axios.post(url, {
            email: email.value,
            password: password.value
        })
        .then((res) => {
            window.localStorage.setItem('access_token', res.data.accessToken);
            window.localStorage.setItem('refresh_token', res.data.refreshToken);

            const { roles } = res.data;
            let isAdmin = false;
            roles.forEach((role) => {
               if(role === "ROLE_ADMIN")
                   isAdmin = true;
            });
            if(isAdmin) {
                window.location = "/admin/products";
            } else {
                errorRole.innerHTML = "Tài khoản của bạn không có quyền truy tập trang Admin!";
            }
        })
        .catch((error) => {
            if(error.response.status === 401) {
                email.style.border = borderError;
                errorEmail.innerHTML = "Vui lòng kiểm tra lại Email hoặc mật khẩu!";
            }
        });
    } else {
        if (errorEmail.innerHTML === "") {
            email.style.border = borderNoError;
            errorEmail.innerHTML = "";
        }
        if (errorPassword.innerHTML === "") {
            password.style.border = borderNoError;
            errorPassword.innerHTML = "";
        }
    }
}

$(async function () {
    if(getLocalAccessToken() !== null) {
        window.location = "/admin/products";
    }

});


