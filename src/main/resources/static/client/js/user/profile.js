async function getUserInfo() {
    await instance.get('/user/me')
        .then((res) => {
            const userInfo = res.data;

            document.getElementById("profileFullName").value = userInfo.fullName;
            document.getElementById("profileEmail").innerHTML = userInfo.email;
            document.getElementById("profilePhoneNumber").innerHTML = userInfo.phoneNumber;
            document.getElementById("profileAddress").value = userInfo.address;
            document.getElementById("profileBirthday").value = userInfo.birthday;
            document.getElementById("profileGender").value = userInfo.gender;
        });
}



