async function getUserInfo() {
    const accessToken = localStorage.getItem("access_token");
    await axios.get(baseUrl + '/customer/me', {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((res) => {
            //Reverse date DD-MM-YYYY ---> YYYY-MM-DD
            const splitBirthday = res.data.content.birthday.split("-");
            const reverseArray = splitBirthday.reverse();
            const birthdayJoinArray = reverseArray.join("-");

            document.getElementById("profileFullName").value = res.data.content.fullName;
            document.getElementById("profileEmail").innerHTML = res.data.content.email;
            document.getElementById("profilePhoneNumber").innerHTML = res.data.content.phoneNumber;
            document.getElementById("profileAddress").value = res.data.content.address;
            document.getElementById("profileBirthday").value = birthdayJoinArray;
            document.getElementById("profileGender").value = res.data.content.gender;
        })
        .catch((error) => {
            if(error.response.status === 401) {
                localStorage.clear();
                window.location = "/login";
            }
        });
}



