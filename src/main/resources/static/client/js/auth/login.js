document.getElementById("loginForm").addEventListener('submit', login);

function login(e) {

    axios.post(baseUrl + "/auth/login", {
        deviceInfoDto: {
            deviceId: "string",
            deviceType: "string"
        },
        email: $('#loginEmailId').val(),
        password: $('#loginPasswordId').val(),
    })
        .then(function (response) {
            window.localStorage.setItem('access_token', response.data.content.accessToken);
            window.localStorage.setItem('refresh_token', response.data.content.refreshToken);
            console.log(response);
            window.location = "/customer/me";
        })
        .catch(function (error) {
            // console.log(error.response.data.message);
            console.log(error.response);
            var hMessage = document.getElementById("loginMessage");
            if (error.response.status === 404) {
                hMessage.innerHTML = error.response.data.message;
            }
            if (error.response.status === 400) {
                hMessage.innerHTML = error.response.data.message;
            }

        });
    e.preventDefault();
}




