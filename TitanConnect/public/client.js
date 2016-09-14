$(document).ready(function(){
    console.log('Client Loaded:');
    $(".messageArea").hide();
    $(".error").empty();
    $(".success").empty();
	$("#cnfuserpass").onchange = validatePassword;

    var validatePassword = function(){
        var pass2 = $("#userpass").val();
        var pass1 = $("#cnfuserpass").val();
        if(pass1 !== pass2)
        	$("#notMatchError").text("Passwords Don't Match");
        else
        	$("#notMatchError").text("").show();
        //empty string means no validation error
    };

    $('#submitRegistration').click(function(){
        $(".messageArea").empty();
        $(".error").empty();
        $(".success").empty();
        var pw1, pw2;
        pw1 = $('#userpass').val();
        pw2 = $('#cnfuserpass').val();
        if(pw1 === pw2 && pw1 !== ""){
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
            $.post( "/register", user, function( data ) {
                //url = "/users/"+user.name;
                //$( location ).attr("href", url);
                console.log("Victory!");
            })
            .fail(function(err) {
                $(".messageArea").show();
                $(".error").append("Database Failure");
            });
        }
        else{
            console.log("Password matching error");
            $(".messageArea").show();
            $(".error").append('Retype Passwords.');
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
    });
});
