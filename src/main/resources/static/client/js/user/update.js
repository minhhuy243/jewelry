document.getElementById("formUpdateInfoCustomer").addEventListener('submit', update);

async function update(e) {
    e.preventDefault();
    const borderError = "solid 1px red";
    const borderNoError = "solid 1px #E6E6E6";

    // --- Full name ---
    const profileFullName = document.getElementById("profileFullName");
    const errorProfileFullName = document.getElementById("errorProfileFullName");

    if (profileFullName.value.trim() === "") {
        profileFullName.style.border = borderError;
        errorProfileFullName.innerHTML = "Nhập họ và tên !";
    } else if (profileFullName.value.trim().length < 3 || profileFullName.value.trim().length > 50) {
        profileFullName.style.border = borderError;
        errorProfileFullName.innerHTML = "Nhập họ và tên từ 3 - 50 ký tự !";
    } else {
        profileFullName.style.border = borderNoError;
        errorProfileFullName.innerHTML = "";
    }

    // --- Address ---
    const profileAddress = document.getElementById("profileAddress");
    const errorProfileAddress = document.getElementById("errorProfileAddress");

    if (profileAddress.value.trim().length < 20 || profileAddress.value.trim().length > 100) {
        profileAddress.style.border = borderError;
        errorProfileAddress.innerHTML = "Địa chỉ từ 20 - 100 ký tự !";
    } else {
        profileAddress.style.border = borderNoError;
        errorProfileAddress.innerHTML = "";
    }


    /**
     Call API after validation form success
     */
    if(errorProfileFullName.innerHTML === "" && errorProfileAddress.innerHTML === "") {
        const birthday = document.getElementById("profileBirthday");
        const gender = document.getElementById("profileGender").value;

        // Reverse date YYYY-MM-DD  --->  DD-MM-YYYY
        const splitBirthday = birthday.value.split("-");
        const reverseArray = splitBirthday.reverse();
        const birthdayJoinArray = reverseArray.join("-");

        await instance.put("/user/update", {
            address: profileAddress.value,
            birthday: birthdayJoinArray,
            fullName: profileFullName.value,
            gender: gender
        }).then((res) => {
            if(res.status === 200) {
                alert("Cập nhật thành công");
                window.location = "/user/me";
            }
        })

    } else {
        if(errorProfileFullName.innerHTML === "") {
            profileFullName.style.border = borderNoError;
            errorProfileFullName.innerHTML = "";
        }
        if(errorProfileAddress.innerHTML === "") {
            profileAddress.style.border = borderNoError;
            errorProfileAddress.innerHTML = "";
        }
    }

}

