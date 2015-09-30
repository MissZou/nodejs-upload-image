//var exec = require("child_process").exec;
var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable");

function start(response, postData) {
    console.log("Request handler 'start' was called.");

    /*exec("ls -lah", function(error, stdout, stderr) {
        response.writeHead(200, {
            "Content-Type": "text/plain"
        });
        response.write(stdout);
        response.end();
    });*/
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="upload" multiple="multiple">' +
        '<input type="submit" value="上传文件" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);
    response.end();
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    
    var form=new formidable.IncomingForm();
    console.log("开始解析");

    form.parse(request,function(error,fields,files){
    	console.log("解析完成");
    	fs.renameSync(files.upload.path,"./tmp/test.png");
    	response.writeHead(200, {
        "Content-Type": "text/html;charset=utf-8" //如果不写utf8，中文会乱码
    });
    response.write("You've sent:<br /><img src='/show' />" ); 
    //html的img标签，请求是浏览器完成的，相当于直接访问http://localhost:8888/show
    //如果不用querystring  .text 得到的中英文都是编码形式的，可读性很差
    response.end();
    });
    
}

function show(response) {
    console.log("show was called.");
    fs.readFile("./tmp/test.png", "binary", function(error, file) {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error+"\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "image/png"
            });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;
