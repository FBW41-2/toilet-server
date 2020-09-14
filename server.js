const http = require('http')
const port = 3000
const qs = require('querystring');
const url = require('url');

const server = http.createServer((request, response) => {
    const requrl = request.url
    console.log(request.url)
    response.setHeader("Content-Type", "text/html; charset=utf-8")
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, HEAD")
    if(requrl == '/') {
        response.end("response")
    } else if(requrl.indexOf('/newtoilet') > -1) {
        /*var body = '';

        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        request.on('end', function () {
            var post = qs.parse(body);
            // use post['blah'], etc.
            console.log(post)
        });*/

        const queryObject = url.parse(request.url,true).query;
        console.log(queryObject)

        response.end(`Name: ${queryObject.firstname}`)
    } else {
        response.statusCode = 404
        response.end(`Unter ${url} gibt es keine Seite, geh bitte auf <a href="/">Startseite</a>`)
    }
})

server.listen(port, (err) => {
    if(err) {
        return console.log('error', err)
    }
    console.log('Server running at Port ' + port)
})