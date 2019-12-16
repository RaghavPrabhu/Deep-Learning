const tf = require('@tensorflow/tfjs')
const mobilenet = require('@tensorflow-models/mobilenet');
global.fetch = require('node-fetch')

const fs = require('fs');
const jpeg = require('jpeg-js');

const NUMBER_OF_CHANNELS = 3

const readImage = path => {
  const buf = fs.readFileSync(path)
  const pixels = jpeg.decode(buf, true)
  return pixels
}

const imageByteArray = (image, numChannels) => {
  const pixels = image.data
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels[i * 4 + channel];
    }
  }

  return values
}

const imageToInput = (image, numChannels) => {
  const values = imageByteArray(image, numChannels)
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor3d(values, outShape, 'int32');

  return input
}

/**
 * Load mobile net model
 */
const loadModel = async() => {
  const mn = new mobilenet.MobileNet(1, 1);
   mn.path = `https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json`
  await mn.load()
  return mn
}

/**
* Clasify image received from client interface UI
 */
const classify = async (path) => {
    const image = readImage(path)
    const input = imageToInput(image, NUMBER_OF_CHANNELS)

    const  mn_model = await loadModel()
    const predictions = await mn_model.classify(input)
    console.log(predictions)
    return predictions
}

/**
 * This is the main function to deploy into serverless environment.
 */
module.exports.getname = async (event, context, callback) => {
  const path = '/tmp/'+Date.now()
  const imgdata = JSON.stringify(event.body)
  const base64Data = imgdata.replace(/^data:([A-Za-z-+/]+);base64,/, '');
 fs.writeFileSync(path, base64Data,  {encoding: 'base64'});
 const result = await classify(path)
 fs.unlink(path, function(err) {
   console.log(err)
 })
  const response = {
      statusCode: 200,
      body: JSON.stringify({
       result
      }),
    };
  callback(null, response);
  };

//   if (process.argv.length !== 4) throw new Error('incorrect arguments: node script.js <MODEL> <IMAGE_FILE>')

// classify(process.argv[2], process.argv[3])
