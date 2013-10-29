function init() {
document.addEventListener("deviceready", deviceReady, true);
delete init;
}


function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["user"] != undefined && window.localStorage["pass"] != undefined) {
        $("#user", form).val(window.localStorage["user"]);
        $("#pass", form).val(window.localStorage["pass"]);
        handleLogin();
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#user", form).val();
    var p = $("#pass", form).val();
    console.log("click");
    if(u != '' && p!= '') {
        $.post("http://localhost:8888/ceo/login.php", {user:u,pass:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["user"] = u;
                window.localStorage["pass"] = p;             
                $.mobile.changePage("menu.html");
            } else {
                navigator.notification.alert("Algo fallo con tus datos", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        
        navigator.notification.alert("Debes ingresar tus datos", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
    
$("#loginForm").on("submit",handleLogin);

}