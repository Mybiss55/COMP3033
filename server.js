var connect = require('connect');
var http = require('http');
var url = require('url');
 
var app = connect();

app.use('/lab2', function(req, res, next){
    // Parse the URL
    const searchUrl = url.parse(req.url, true); 
    // Get the query parameters and do operation
    const jsonResponse = {
        x: searchUrl.query.x,
        y: searchUrl.query.y,
        method: searchUrl.query.method,
        result: calculate(searchUrl.query.x, searchUrl.query.y, searchUrl.query.method)
    };
    // Set the response header
    res.setHeader('Content-Type', 'application/json');
    // Send the response
    res.writeHead(200);
    res.end(JSON.stringify(jsonResponse));

});


// Default route, guide the user to the correct route
app.use('/', function(req, res, next){
    res.end('Please go to /Lab2 and follow this search parameters /?method=operator&x=num1&y=num2!');
});

// Function to calculate the result
// Looks cleaner this way
function calculate(num1, num2, operator){
    if(isNaN(num1) || isNaN(num2)){
        return "Invalid number";
    }
    switch(operator){
        case "add":
            return +num1 + +num2;
        case "subtract":
            return +num1 - +num2;
        case "multiply":
            return +num1 * +num2;
        case "divide":
            return +num1 / +num2;
        default:
            return "Invalid operator";
    }
}

//create node.js http server and listen on port
http.createServer(app).listen(3000);