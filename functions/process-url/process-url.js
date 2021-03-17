const cloudinary = require("cloudinary").v2;
const qs = require("querystring");
cloudinary.config({
  cloud_name: "getpackup",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

exports.handler = async function(event, ctx) {
  const { queryStringParameters } = event;

  try {
    // https://res.cloudinary.com/sector/image/upload/v1583637123/og-images/img-1.png
    const imageUrl = cloudinary.url(
      `${process.env.TONY_IMAGE_VERSION}/og-images/img-1.png`,
      {
        // resouce_type: "raw"
        sign_url: true,
        // secure: true,
        custom_pre_function: {
          function_type: "remote",
          source: `https://packup-opengraph-card-generator.netlify.app/.netlify/functions/shout-out-image?${qs.stringify(
            queryStringParameters
          )}`
        }
      }
    );
    return {
      statusCode: 302,
      headers: {
        Location: imageUrl
      },
      body: ""
    };
  } catch (e) {
    console.log(e);
  }
};