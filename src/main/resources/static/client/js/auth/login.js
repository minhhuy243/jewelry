document.getElementById("loginForm").addEventListener('submit', login);

function login(e) {

    axios.post("http://localhost:8089/auth/login", {
        deviceInfoDto: {
            deviceId: "string",
            deviceType: "string"
        },
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val(),
    })
        .then(function (response) {
            window.localStorage.setItem('access_token', response.data.content.accessToken);
            window.localStorage.setItem('refresh_token', response.data.content.refreshToken);
            axios.get("http://localhost:8089/api/customer/me", {
                headers: {
                    Authorization: "Bearer " + window.localStorage.getItem('access_token')
                }

            })
            console.log(response);
            window.location = "http://localhost:8088/me";

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




