document.getElementById("formUpdateInfoCustomer").addEventListener('submit', update);

function update(e) {

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
        const accessToken = localStorage.getItem("access_token");
        const birthday = document.getElementById("profileBirthday");
        const gender = document.getElementById("profileGender").value;

        // Reverse date YYYY-MM-DD  --->  DD-MM-YYYY
        const splitBirthday = birthday.value.split("-");
        const reverseArray = splitBirthday.reverse();
        const birthdayJoinArray = reverseArray.join("-");


        const data = JSON.stringify({
            "address": profileAddress.value,
            "birthday": birthdayJoinArray,
            "fullName": profileFullName.value,
            "gender": gender
        });

        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                if(xhr.status === 200) {
                    alert("Cập nhật thành công");
                    window.location = "/customer/me";
                }
                if (xhr.status === 401) {
                    localStorage.clear();
                    alert("Tài khoản đã hết hạn. Vui lòng đăng nhập lại !")
                    window.location = "/login";
                }
            }
        });

        xhr.open("PUT", "http://localhost:8089/api/customer/update");
        xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.send(data);

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

    e.preventDefault();
}

