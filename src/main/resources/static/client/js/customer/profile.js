async function getUserInfo() {
    const accessToken = localStorage.getItem("access_token");
    await axios.get(baseUrl + '/customer/me', {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((res) => {
            //Reverse date DD-MM-YYYY ---> YYYY-MM-DD
            const splitBirthday = res.data.content.birthday.split("-");
            const reverseArray = splitBirthday.reverse();
            const birthdayJoinArray = reverseArray.join("-");

            const userInfo = res.data.content;

            document.getElementById("profileFullName").value = userInfo.fullName;
            document.getElementById("profileEmail").innerHTML = userInfo.email;
            document.getElementById("profilePhoneNumber").innerHTML = userInfo.phoneNumber;
            document.getElementById("profileAddress").value = userInfo.address;
            document.getElementById("profileBirthday").value = birthdayJoinArray;
            document.getElementById("profileGender").value = userInfo.gender;
        })
        .catch((error) => {
            if(error.response.status === 401) {
                localStorage.clear();
                window.location = "/login";
            }
        });
}



