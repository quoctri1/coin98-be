var express = require('express');
var multer  = require('multer');
var fs  = require('fs');
var cors = require('cors')

var app = express();
app.use(cors())
app.use(express.static(__dirname + '/uploads'));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/list', function(req, res) {
    const testFolder = './uploads';
    var listFiles = [];
    if (!fs.existsSync(testFolder)){
      fs.mkdirSync(testFolder);
    }
    fs.readdirSync(testFolder).forEach(file => {
        listFiles.push({
          name: file
        })
    });

    res.end(JSON.stringify({
        files: listFiles.map(item => item.name)
    }));
})

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage}).array('files', 12);
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:(");
        }
        res.end("Upload completed.");
    });
})

app.delete('/:id', async function(req, res, next) {
    const filename = './uploads/' + req.params.id;
    await fs.unlink(filename, (error) => {
        console.log(error)
    })
    res.end("Delete success");
})

app.listen(4000, () => {
  console.log('Server listening on http://localhost:4000 ... testing');
});
