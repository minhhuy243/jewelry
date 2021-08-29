// document.getElementById("adminLogout").addEventListener('click', adminLogout);

function adminLogout() {
    if (confirm('Bạn có muốn đăng xuất ?')) {
        var accessToken = window.localStorage.getItem('access_token');
        var data = JSON.stringify({
            "deviceInfo": {
                "deviceId": "string",
                "deviceType": "string"
            },
            "token": accessToken
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                console.log(this.responseText);
            }
        });

        xhr.open("PUT", "http://localhost:8089/api/auth/logout");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

        localStorage.clear();
        window.location = "/admin/login";
    }
}