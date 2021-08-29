document.getElementById("formUpdateInfoCustomer").addEventListener('submit', update);

function update(e) {

    // --- Full name ---
    var profileFullName = document.getElementById("profileFullName");
    var errorProfileFullName = document.getElementById("errorProfileFullName");

    if (profileFullName.value.trim() === "") {
        profileFullName.style.border = "solid 1px red";
        errorProfileFullName.innerHTML = "Nhập họ và tên !";
    } else if (profileFullName.value.trim().length < 3 || profileFullName.value.trim().length > 50) {
        profileFullName.style.border = "solid 1px red";
        errorProfileFullName.innerHTML = "Nhập họ và tên từ 3 - 50 ký tự !";
    } else {
        profileFullName.style.border = "solid 1px #E6E6E6";
        errorProfileFullName.innerHTML = "";
    }

    // --- Address ---
    var profileAddress = document.getElementById("profileAddress");
    var errorProfileAddress = document.getElementById("errorProfileAddress");

    if (profileAddress.value.trim().length < 20 || profileAddress.value.trim().length > 100) {
        profileAddress.style.border = "solid 1px red";
        errorProfileAddress.innerHTML = "Địa chỉ từ 20 - 100 ký tự !";
    } else {
        profileAddress.style.border = "solid 1px #E6E6E6";
        errorProfileAddress.innerHTML = "";
    }


    /**
     Call API after validation form success
     */
    if(errorProfileFullName.innerHTML === "" && errorProfileAddress.innerHTML === "") {
        const accessToken = localStorage.getItem("access_token");
        var birthday = document.getElementById("profileBirthday");
        var gender = document.getElementById("profileGender").value;

        // Reverse date YYYY-MM-DD  --->  DD-MM-YYYY
        var splitBirthday = birthday.value.split("-");
        var reverseArray = splitBirthday.reverse();
        var birthdayJoinArray = reverseArray.join("-");


        var data = JSON.stringify({
            "address": profileAddress.value,
            "birthday": birthdayJoinArray,
            "fullName": profileFullName.value,
            "gender": gender
        });

        var xhr = new XMLHttpRequest();
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
            profileFullName.style.border = "solid 1px #E6E6E6";
            errorProfileFullName.innerHTML = "";
        }
        if(errorProfileAddress.innerHTML === "") {
            profileAddress.style.border = "solid 1px #E6E6E6";
            errorProfileAddress.innerHTML = "";
        }
    }

    e.preventDefault();
}

