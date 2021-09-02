const url = "http://localhost:8089/api/customer/me";
const token = localStorage.getItem("access_token");

if (token === null || token === "") {
    window.location = "/admin/login";
}

if (token) {
    axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
        .then((res) => {
            var iterator = res.data.content.roles;

            for (var i in iterator) {
                if (iterator[i].roleName !== "ROLE_ADMIN") {
                    localStorage.clear();
                    window.location = "/admin/login";
                }
            }
        })
        .catch((error) => {
            window.location = "/admin/login";
        });
}













