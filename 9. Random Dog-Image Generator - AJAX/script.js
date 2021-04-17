/* AJAX is Asynchronous javascript and XML
- With help of AJAX we do not have to reload the whole page for small information from server.
- To make asynchronous request

Send request by - XMLHttpRequest
receive respond by JSON/XML

HTTP = Hyper Text Transfer Protocol
HTTP is a set of rules defining how client is going to send request and how server is going to send response
HTTP method - 
    GET = To get data from server,
    POST = To put some data on server.
    PUT = Replace Data

Status Code
    "Success" = 200,
    "Not found" = 404,
    "Unauthorised" = 401n

API - Aplication Programming Interface
Acts as a medium of communication between any two entities (client and server in our case)

JSON - JavaScript Object Notation
*/



var generateImage = function(){

    // VANILA JS METHOD
   /* 
   // Make the XMLHttpRequest Object
    var XHRObject = new XMLHttpRequest();
    // When respnse comes, do this
    XHRObject.onload = function(){
        // console.log(XHRObject.response)
        // Response Came in string format. Convert in JSON
        JSONreponse = JSON.parse(XHRObject.response);
        $('#random-dog-image').attr('src',JSONreponse.message);   
    }
    XHRObject.onerror = function(){
        console.log('error');
    });
    // Intialize the get function and send
    XHRObject.open('get','https://dog.ceo/api/breeds/image/random',true);
    XHRObject.send();
    */

    // AJAX METHOD
       
    $.ajax({
        url: 'https://dog.ceo/api/breeds/image/random',
        method: 'GET',
        success: function(data){{
            console.log(data.message)
            $('#random-dog-image').attr('src',data.message);
        }}
    }).fail(function(){
        console.log('error');
    });
    

    // SHORTCUT AJAX METHOD
    /*
    $.get('https://dog.ceo/api/breeds/image/random', function(data){
        $('#random-dog-image').attr('src',data.message);
    }).fail(function(xhr, textStatus, errorThrown){
        console.log(textStatus, 'Error');
    })
    */


}

$('.fetch').click(generateImage);

