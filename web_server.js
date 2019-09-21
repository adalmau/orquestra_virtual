var http = require('http');
var url = require('url');
var fs = require('fs');

http.createServer(function (req, res) {
  var q = url.parse(req.url, true);
  var resource = q.path.split(".");
  var resourceType = resource[resource.length-1];
  var filename = "." + q.pathname;
  fs.readFile(filename, function(err, data) {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 Not Found");
    }

    /**
    * Per defecte es construeix la capçalera com "text/html", però evidentment
    * es poden servir altres recursos estàtics com .js, .css, .png, etc.
    * Per cadascun d'ells s'ha de construir una capçalera diferent, sinó el
    * navegador rebrà el recurs, aparentment es veurà bé en l'inspector d'elements,
    * però no el sabrà interpretar.
    */

    if (resourceType == "css"){
        res.writeHead(200, {"Content-Type": "text/css"});
    }
    else if (resourceType == "js"){
        res.writeHead(200, {"Content-Type": "application/javascript"});
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/html'});
    }
    res.write(data);
    return res.end();
  });
}).listen(81);
