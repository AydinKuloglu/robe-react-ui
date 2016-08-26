const mime = require('mime');
const multer = require("multer"); // Grabs Multer
const escapeRegexp = require("escape-string-regexp");
const bodyParser = require("body-parser");
const url = require("url");
const fs = require("fs");
const path = require("path");
/* eslint-disable prefer-template */
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" +
        s4() + "-" + s4() + s4() + s4();
}

function getInformation(path) {
    var nOffset = Math.max(0, Math.max(path.lastIndexOf("\\"), path.lastIndexOf("/")));
    var eOffset = path.lastIndexOf(".");
    if (eOffset < 0) {
        eOffset = path.length;
    }
    const mimeType = mime.lookup(path);

    return {
        destination: path.substring(0, nOffset),
        encoding: null,
        fieldname: null,
        mimetype: mimeType,
        extension: mime.extension(mimeType),
        charsets: mime.charsets.lookup(mimeType),
        filename: path.substring(nOffset > 0 ? nOffset + 1 : nOffset, eOffset),
        originalname: null,
        path: path,
        size: 0
    };
}
module.exports = (app, requestPath, tempFolder) => {
    const storage = multer.diskStorage({
        destination: tempFolder, // Specifies upload location...
        filename: function (req, file, cb) {
            /*
            switch (file.mimetype) { // *Mimetype stores the file type, set extensions according to filetype
                case "image/jpeg":
                    ext = ".jpeg";
                    break;
                case "image/png":
                    ext = ".png";
                    break;
                case "image/gif":
                    ext = ".gif";
                    break;
            }
             */
            const id = guid();
            file.filename = id;
            fs.writeFileSync(path.normalize(tempFolder + "/" + id + ".json"), JSON.stringify(file), "utf8");
            cb(null, id);
        }
    });
    const upload = multer({ storage: storage });

    /**
     {
       destination: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp",
       encoding: "7bit",
       fieldname: "files",
       filename: "e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
       mimetype: "application/x-x509-ca-cert",
       originalname: "hamburgsud.com.crt",
       path: "/Users/kamilbukum/DEV/robe/robe-react-ui/temp/e10fd61b-9f84-dd9f-e034-cb507a0e7df3",
       size: 2067
     }
     */

    app.put(new RegExp(escapeRegexp(requestPath) + ".*"), upload.array("files"), (req, res, next) => {

        res.status(200).send(req.files); // You can send any response to the user here
    });

    const jsonParser = bodyParser.json({ type: "application/json" });

    const loadFile = (key) => {
        var file = fs.readFileSync(path.normalize(tempFolder + "/" + key + ".json"), "utf8");
        return JSON.parse(file);
    }
    app.post(new RegExp(escapeRegexp(requestPath) + ".*"), jsonParser, (request, response, next) => {
        var data;
        console.log(request.body);
        console.log((Object.prototype.toString.call(request.body)));
        if (Object.prototype.toString.call(request.body) === "[object Array]") {
            data = [];
            for (var i = 0; i < request.body.length; i++) {
                data.push(loadFile(request.body[i]));
            }
        } else {
            data = loadFile(request.body.filename);
        }
        response.status(200).send(data);
    });

    app.delete(new RegExp(escapeRegexp(requestPath) + ".*"), (request, res, next) => {
        var body = "";
        request.on("data", (data) => {
            body += data;
            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6) {
                request.connection.destroy();
            }
        });

        request.on("end", () => {
            const file = JSON.parse(body);
                var filePath = path.normalize(file.path);
                fs.unlinkSync(filePath);
                fs.unlinkSync(filePath + ".json");
            res.status(200).send(file);
            // use post['blah'], etc.
        });
       // You can send any response to the user here
    });
}
