document.getElementById("registerForm").addEventListener('submit', register);

function register(e) {

    // Reverse date YYYY-MM-DD ==> DD-MM-YYYY
    var birthday = document.getElementById("registerBirthday").value;
    var splitString = birthday.split("-");
    var reverseArray = splitString.reverse();
    var birthdayJoinArray = reverseArray.join("-");

    var gender = document.getElementById("registerGender").value;


    axios.post(baseUrl + "/customer/register", {

        fullName: $('#registerFullName').val(),
        email: $('#registerEmail').val(),
        password: $('#registerPassword').val(),
        confirmPassword: $('#registerRePassword').val(),
        gender: gender,
        birthday: birthdayJoinArray,
        phoneNumber: $('#registerPhoneNumber').val(),
        address: $('#registerAddress').val()

    }).then(function (response) {
        console.log(response);
        window.location = "/login";
    })
        .catch(function (error) {
            console.log(error);
            if (error.response.status === 404) {
                console.log(error);
            }
            if (error.response.status === 400) {
                console.log(error);
            }
        });
    e.preventDefault();


}










