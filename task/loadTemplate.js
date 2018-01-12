var fs = require('fs');
var request = require('request');
var path = require('path');


var  envs = require ('../client/configs/envs');

const server_env = process.env.NODE_ENV || 'test01';

const hostname = envs[server_env]['op'];


function loadTemplate(){

    var file = path.resolve(process.cwd(), 'client/app.html');
    request(hostname+'/common-nav/index.html', function (error, response, body) {

    	var html = response.body;
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(file,html);
        }
    })
    
}

loadTemplate();