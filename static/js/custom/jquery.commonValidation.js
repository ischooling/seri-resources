function validateEmail(email) {
	var expr=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-zA-Z]{2,10}(?:\.[a-zA-z]{2})?)$/;
 	return expr.test(email);
}
function validPassword(password) {
//	var expr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
//	return expr.test(password);
	return true;
}
function validUser(userName) {
//	var expr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
//	return expr.test(userName);
	return true;
}
function validateCaptcha(captcha) {
	var expr = /^[_A-z0-9]{1,}$/;
	return expr.test(captcha);
}
function restrictKeyEnter(id){
	$('#'+id).keydown(function(e){
		if(e.keyCode == 13)
		   {
			e.preventDefault();
		      return false;
		   }
	});
}

