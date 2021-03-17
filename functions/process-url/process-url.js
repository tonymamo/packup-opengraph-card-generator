// Original video:
// https://egghead.io/lessons/javascript-using-cloudinary-as-a-write-through-cache-for-a-netlify-function-that-generates-images

// Updated code copied from comment on the video aboe that pointed to here:
// https://github.com/joelhooks/joelhooks-opengraph-images/blob/master/functions/process-url/process-url.js
const qs = require('querystring')

exports.handler = async function (event, ctx) {
  const { queryStringParameters } = event;

  try {
    const imageUrl = `https://res.cloudinary.com/${process.env.CLOUD_NAME
      }/image/fetch/${encodeURIComponent(
        `https://packup-opengraph-card-generator.netlify.app/.netlify/functions/shout-out-image?${qs.stringify(
          queryStringParameters,
        )}`,
      )}`;
    return {
      statusCode: 302,
      headers: {
        Location: imageUrl,
      },
      body: '',
    }
  } catch (e) {
    console.log(e)
  }
}