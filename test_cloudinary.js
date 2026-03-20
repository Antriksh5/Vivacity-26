const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'doxipuov', // Testing lowercase letter "o"
  api_key: '639385241647159',
  api_secret: '0BNwj5qmSsTxFdZr9YPd5tgWlUo',
  secure: true
});

cloudinary.api.ping((error, result) => {
  if (error) {
    console.error("Cloudinary Ping Error (doxipuov):", error.message);
    
    // Fallback test
    cloudinary.config({ cloud_name: 'doxipu0v' });
    cloudinary.api.ping((err, res) => {
        if (err) console.error("Cloudinary Ping Error (doxipu0v):", err.message);
        else console.log("Cloudinary Ping Success (doxipu0v):", res);
    });
  } else {
    console.log("Cloudinary Ping Success (doxipuov):", result);
  }
});
