
var httplogin = require('http');
var qslogin = require('querystring'); 
exports.login = function(req,success){
	
	var headers = req.headers;
	
	console.log('the headers is:'+headers);
	
	headers.host = '127.0.0.1';
	
	var appid = 'wx2c0f777c4625ed86';
	var secret = '5a47d4297972d7f4c84145e2ba92669f';
	var code = req.query.code;
	var newdata = {
		appid:appid,
		secret:secret,
		code:code,
		grant_type:'authorization_code'
	}
	var content = qslogin.stringify(newdata);
	var path = 'https://api.weixin.qq.com/sns/jscode2session?'+content;
	console.log('path is :'+path);
	var options = {
		host: '127.0.0.1',
	    port: 8081,
	    path: path,
	    method: 'GET',
	    headers: headers	
	}
	var req = httplogin.request(options, function(res) {
	    res.setEncoding('utf8');
	    res.on('data', function (data) {
//	      var data = JSON.parse(data);
	      success(res,data);
	    });
    });	
    req.on('error', function(e){
       console.log("auth_user error: " + e.message);
    });
    req.end();
}