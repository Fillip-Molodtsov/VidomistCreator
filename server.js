const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const pdfMakePrinter = require('pdfmake');
const pp = require('./pdfParts');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

let fontDescriptors = {
    Roboto: {
        normal: path.join(__dirname, '/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, '/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname,'/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname,'/fonts/Roboto-MediumItalic.ttf')
    }
};

const createPDF = (dd, callback) => {
    let printer = new pdfMakePrinter(fontDescriptors);

    let doc = printer.createPdfKitDocument(dd);

    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        callback(pdfData)
    });
    doc.end();
}

app.post('/pdf', function (req, res) {
    const data = req.body;
    const dd = pp.getDD(data)

    // let printer = new pdfMakePrinter(fontDescriptors);

    // let doc = printer.createPdfKitDocument(dd);
    // let temp
    // doc.pipe(temp = fs.createWriteStream('./result.pdf'));
    // doc.end();
    // temp.on('finish', async function() {
    //     console.log("PDF Saved")
    // })
    createPDF(dd, (pdfData) => {
        res.contentType('application/pdf');
        res.send(pdfData);
    }, err => {
        console.log(err)
    })
});

const server = http.createServer(app);
const port = process.env.PORT || 8080;
server.listen(port);

console.log('http server listening on %d', port);
