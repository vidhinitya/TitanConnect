$(document).ready(function(){{
    console.log('Client Loaded:');
    $('#submitRegistration').click(function(){
        console.log('Register Clicked.');
        var name = $('#name').val();
        var email = $('#email').val();
        var phone = $('#phone').val();
        var userpass = $('#userpass').val();
        var cnfuserpass = $('#cnfuserpass').val();
        var user = {
                name: name,
                email: email,
                phone: phone,
                userpass: userpass,
                cnfuserpass: cnfuserpass
        };
        console.log("User: ", user);
        if (verifyRegister(user)){
            // submit to DB
        }
        else{
            // error message/redirect
        }
    });

    $('#submitLogin').click(function(){
        console.log('Login Clicked.');
        var name = $('#name').val();
        var password = $('#password').val();
        user = {
            name: name,
            password: password
        }
        console.log("User: ", user);
        if (verifyLogin(user)){
            // submit to DB
        }
        else{
            // error message/redirect
        }
    });
}});
