const multer = require('multer')
const path = require ('path');

const xlstojson  = require('xls-to-json-lc');
const xlsxtojson = require('xlsx-to-json-lc');

let storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './upload/')
        },
        filename: function (req, file, cb) {
            let datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
        }
    });
    let upload = multer({
                    storage: storage,
                    fileFilter : function(req, file, callback) {
                        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                            return callback(new Error('Error de Extension'));
                        }
                        callback(null, true);
                    }
                }).single('file');


module.exports = upload
