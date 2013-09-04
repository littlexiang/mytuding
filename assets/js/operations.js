var op = {};
var opCallback = {};

op.login = function (form) {
    var username = $(form).find("input[name='username']").val();
    var password = $(form).find("input[name='password']").val();
    mtClient.login(username, password);
};

opCallback.login = function () {

};