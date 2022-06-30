const AWS = require('aws-sdk');

const region = 'us-east-1';
const accessKeyId = 'AKIAYJE2IZP5FSXLHIW5';
const secretAccessKey = '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';
const bucketName = 'ayd1-g10-full-trip';
const carpeta = 'full-trip-imagenes';

AWS.config.update({
	region,
	accessKeyId,
	secretAccessKey
});

const s3 = new AWS.S3();

// uploads a file to s3
function uploadFile(location, image) {
	const foto = Buffer.from(image, 'base64');
	const uploadParams = {
		Bucket: bucketName,
		Body: foto,
		Key: location,
		ContentType: 'image'
	};

	return s3.putObject(uploadParams).promise();
}

exports.uploadFile = uploadFile;
exports.bucketName = bucketName;
exports.carpeta = carpeta;
