//http - hyper text transfer protocol
var http = require('http');  
// fs - File System
var fs = require('fs');  
//URL - Uniform Resource Locator
var url = require('url');  
  
// Create a server  
http.createServer( function (request, response) {    
   // Parse the request containing file name  
   var pathname = url.parse(request.url).pathname;  
   //path name /index.html

     
   // Read the requested file content from file system  
   fs.readFile(pathname.substr(1), function (err, data) 
   //substr -sub string, 1-True
   {  
      if (err) {  
         console.log(err);  
         //err - error
         // HTTP Status: 404 : NOT FOUND  
         // Content Type: text/plain  
         response.writeHead(404, {'Content-Type': 'text/html'});  
      }else{      
         //Page found       
         // HTTP Status: 200 : OK  
         // Content Type: text/plain  
         response.writeHead(200, {'Content-Type': 'text/html'}); 

         console.log("HTTP Status: 200");
         // Write the content of the file to response body  
         response.write(data.toString());         
      }  
      // Send the response body   
      response.end();  
   });     
}).listen(8081);  //8081 - port number
// Console will print the message
// http://127.0.0.1:8081/index.html 
console.log('Server running at http://127.0.0.1:8081/index.html');
console.log('Database Connectivity http://localhost/phpmyadmin/');
