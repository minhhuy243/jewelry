
const api = "http://localhost:8089/api/customer/me";
const token = localStorage.getItem("access_token");

axios.get(api, {headers: {"Authorization": `Bearer ${token}`}})
    .then((res) => {
        console.log(res.data);

        document.getElementById("fullNameId").value = res.data.content.fullName;
        document.getElementById("emailId").innerHTML = res.data.content.email;
        document.getElementById("phoneNumberId").value = res.data.content.phoneNumber;
        document.getElementById("addressId").value = res.data.content.address;
        document.getElementById("birthdayId").value = res.data.content.birthday;
        document.getElementById("genderId").value = res.data.content.gender;
    })
    .catch((error) => {
        console.log(error)
    });


