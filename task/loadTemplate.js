var fs = require('fs');
var request = require('request');
var path = require('path');


var baseUrl = 'http://optest02.krspace.cn'


function loadTemplate(){
    var file = path.resolve(process.cwd(), 'app.html');
    request(baseUrl+'/common-nav/index.html', function (error, response, body) {

        if (!error && response.statusCode == 200) {
            fs.writeFileSync(file,response.body);
        }
    })
}

loadTemplate();