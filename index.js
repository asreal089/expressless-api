// A BASIC Node server
// Routing Requests

const http = require("http");
const url = require("url");
const buscacep = require("./buscaCep");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 8585;

const server = http.createServer(function(req, res) {
	//console.log(req.url);
	let parsedURL = url.parse(req.url, true);
	let path = parsedURL.pathname;
	// parsedURL.pathname  parsedURL.query
	// standardize the requested url by removing any '/' at the start or end
	// '/folder/to/file/' becomes 'folder/to/file'
	path = path.replace(/^\/+|\/+$/g, "");
	console.log(path);

	let qs = parsedURL.query;
	let headers = req.headers;
	let body = "";
	let method = req.method.toLowerCase();

	req.on("data", function(data) {
		body += data;
		console.log("got some data");
		//if no data is passed we don't see this messagee
		//but we still need the handler so the "end" function works.
	});
	req.on("end", function() {
		//request part is finished... we can send a response now
		console.log("send a response");
		//we will use the standardized version of the path
		let route =
			typeof routes[path] !== "undefined" ? routes[path] : routes["notFound"];
		let data = {
			path: path,
			queryString: qs,
			headers: headers,
			body: body,
			method: method
		};
		//pass data incase we need info about the request
		//pass the response object because router is outside our scope
		route(data, res);
	});
});

server.listen(PORT, function() {
	console.log("Listening on port: " + PORT);
});

//define functions for the different Routes
//This object and the functions could be defined in another file that we import
//Each route has a function that takes two parameters
//data: the info about the request
//callback: the function to call to send the response
let routes = {
	cep: async function(data, res) {
		reqData = JSON.parse(data.body);
		let endereco = await buscacep(reqData.cep);
		console.log(endereco);
		let payload = endereco;
		let payloadStr = JSON.stringify(payload);
		res.setHeader("Content-Type", "application/json");
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.writeHead(200);
		res.write(payloadStr);
		res.end("\n");
	}
};
