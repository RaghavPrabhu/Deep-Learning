const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const multer = require('multer');
const request = require('request');
const pngToJpeg = require('png-to-jpeg');

const config = require('config');
const apiURL = config.get('backend.api.endpoint');

app.set('view engine', 'jade')
app.use('/static', express.static('static'))

fs = require('fs-extra')
app.use(bodyParser.urlencoded({ extended: true }))


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpeg')
  }
})

var upload = multer({ storage: storage })

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/main.html');

});

app.get('/index', function (req, res) {
  res.sendFile(__dirname + '/index.html');

});

/**
 * File upload service
 */
app.post('/processimage', upload.single('picture'), (req, res) => {
  console.log("Request "+req)
  if (req.file.mimetype != 'image/jpeg') {
    try {
      convert_png_image(req, function (path) {
        var png_img = fs.readFileSync(path);
        var encode_png_image = png_img.toString('base64');
        //console.log('Path '+encode_png_image)  

        // Convert PNG image to JPEG. Since, Image process supports JPEG pixels
        processimage(encode_png_image, function (data) {
          var output = {}

          for (item in JSON.parse(data).result) {
            console.log(JSON.parse(data)[item])
          }
          fs.unlink(path, function (err) {
            console.log(err)
          })
          fs.unlink(req.file.path, function (err) {
            console.log(err)
          })
          res.render('output', { title: JSON.parse(data).result, src: encode_png_image.toString('base64') })
        })

      })
    } catch (error) {
      var img = fs.readFileSync(req.file.path);
      var encode_image = img.toString('base64');
      res.render('output', { title: "", src: encode_image.toString('base64') })
    }
  } else {

    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString('base64');

    processimage(encode_image, function (data) {

      for (item in JSON.parse(data).result) {
        console.log(item)
      }

      fs.unlink(req.file.path, function (err) {
        console.log(err)
      })
      res.render('output', { title: JSON.parse(data).result, src: encode_image.toString('base64') })
    })
  }

})

/**
 * Function to convert PNG image to JPEG format
 * 
 * @param {*} req 
 * @param {*} callback 
 */
var convert_png_image = function (req, callback) {
  var img = fs.readFileSync(req.file.path);
  var newImage = 'uploads/picture-' + Date.now() + '.jpeg'
  pngToJpeg({ quality: 90 })(img).then(output => fs.writeFileSync(newImage, output)).then(() => callback(newImage))

}

/**
 * 
 * @param {Base 64 encode image data} data 
 * @param {*} callback 
 */
var processimage = function (data, callback) {
  console.log('API URL '+apiURL)
  request.post(apiURL,
    { "body": data }, (error, response, body) => {
      if (error) {
        
        return console.dir(error);
      }
      console.dir(JSON.parse(body).result);
      callback(body)
    });
}

app.listen(80, () => {
  console.log('listening on 80')
})  