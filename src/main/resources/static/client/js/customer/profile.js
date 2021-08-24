
const api = "http://localhost:8089/api/customer/me";
const token = localStorage.getItem("access_token");

axios.get(api, {headers: {"Authorization": `Bearer ${token}`}})
    .then((res) => {
        console.log(res.data);

        document.getElementById("profileFullName").value = res.data.content.fullName;
        document.getElementById("profileEmail").innerHTML = res.data.content.email;
        document.getElementById("profilePhoneNumber").value = res.data.content.phoneNumber;
        document.getElementById("profileAddress").value = res.data.content.address;
        document.getElementById("profileBirthday").value = res.data.content.birthday;
        document.getElementById("profileGender").value = res.data.content.gender;
    })
    .catch((error) => {
        console.log(error)
    });


