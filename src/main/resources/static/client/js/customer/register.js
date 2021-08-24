document.getElementById("registerForm").addEventListener('submit', register);

function register(e) {
    var birthday = document.getElementById("registerBirthdayId").value;
    var splitString = birthday.split("-");
    var reverseArray = splitString.reverse();
    var birthdayJoinArray = reverseArray.join("-");
    var gender = document.getElementById("registerGenderId").value;


    axios.post(baseUrl + "/customer/register", {

        fullName: $('#registerFullNameId').val(),
        email: $('#registerEmailId').val(),
        password: $('#registerPasswordId').val(),
        confirmPassword: $('#registerRePasswordId').val(),
        gender: gender,
        birthday: birthdayJoinArray,
        phoneNumber: $('#registerPhoneNumberId').val(),
        address: $('#registerAddressId').val()

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