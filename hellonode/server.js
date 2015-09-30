var http=require("http"),
url=require("url");

function start(route,handle){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		console.log("Request for"+pathname+" reveived.");
		route(handle,pathname,response,request);
		/*request.setEncoding("utf8");

		request.addListener("data",function(postDataChunk){
			postData+=postDataChunk;
			console.log("Receive"+postDataChunk)
		});

		request.addListener("end",function(){
			route(handle,pathname,response,postData);
		});*/


		/*response.writeHead(200,{"Content-Type":"text/plain"});
		response.write("hello world");
		response.end();*/
	}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");
}

exports.start=start;

