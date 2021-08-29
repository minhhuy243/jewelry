
const api = "http://localhost:8089/api/customer/me";
const token = localStorage.getItem("access_token");

axios.get(api, {headers: {"Authorization": `Bearer ${token}`}})
    .then((res) => {
        // Reverse date DD-MM-YYYY ---> YYYY-MM-DD
        var splitBirthday = res.data.content.birthday.split("-");
        var reverseArray = splitBirthday.reverse();
        var birthdayJoinArray = reverseArray.join("-");

        document.getElementById("profileFullName").value = res.data.content.fullName;
        document.getElementById("profileEmail").innerHTML = res.data.content.email;
        document.getElementById("profilePhoneNumber").innerHTML = res.data.content.phoneNumber;
        document.getElementById("profileAddress").value = res.data.content.address;
        document.getElementById("profileBirthday").value = birthdayJoinArray;
        document.getElementById("profileGender").value = res.data.content.gender;
    })
    .catch((error) => {
        console.log(error);
        localStorage.clear();
        window.location = "/login";
    });


