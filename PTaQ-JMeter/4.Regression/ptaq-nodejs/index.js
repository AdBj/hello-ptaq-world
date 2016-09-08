var xml = require('xml');
var express = require('express');
var app = express();

// Greet when / (base URL)
app.get('/', function (req, res) {
  res.send('Hello PTaQ World!');
});

// Redirect to /b when /a URL
app.get('/a', function (req, res) {
    res.redirect('/b');
});

// Redirect to /b when /a URL
app.get('/b', function (req, res) {
    res.sendStatus(204);
});

// Redirect to /c when /c URL
app.get('/c', function (req, res) {
    res.redirect('/c');
});

// Return HTTP/1.1 code ~ https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
app.get('/:code', function (req, res) {
	var c = req.params.code; 
	if ((c == "200") || (c == "201") || (c == "202") || (c == "204")) {
	    res.sendStatus(c);
	} else {
		if ((c == "400") || (c == "401") || (c == "403")) {
	        res.sendStatus(c);
	    } else {
            if ((c == "500") || (c == "501") || (c == "503") || (c == "507")) {
	            res.sendStatus(c);
	        }
			else {
		        res.sendStatus(404);
			}
	    }
	}
});

// Check id and data 
app.get('/api/v1/params', function (req, res) {
	var id = req.query.id;
	var data = req.query.data;
	
	if ((data == "null") || (data == "")) {
		res.sendStatus(500);
	} else {
		if (data == 'script') {
			res.send('<script>alert("XSS");</script>');
		} else {
		    if (id == '007') {
				res.set('Content-Type', 'text/xml').send(xml(data));
		    } else {
			    res.json({id, data});
		    }
		}
	}
});

// Start the app server
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});