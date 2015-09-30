var server=require("./server"),
router=require("./router"),
requestHandler=require("./requestHandler"),
handle={};

handle["/"]=requestHandler.start;
handle["/start"]=requestHandler.start;
handle["/upload"]=requestHandler.upload;
handle["/show"]=requestHandler.show;

server.start(router.route,handle);