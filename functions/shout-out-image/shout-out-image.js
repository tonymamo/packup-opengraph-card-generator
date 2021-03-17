const playwright = require('playwright-aws-lambda');
const fs = require('fs');
const path = require('path');
const { getUserData } = require('./get-user-data');

const script = fs.readFileSync(path.resolve(__dirname, './image.js'), 'utf-8');

exports.handler = async function (event, ctx, callback) {
  const { queryStringParameters } = event;

  const username = queryStringParameters.username;
  const userData = await getUserData(username);

  const browser = await playwright.launchChromium();
  const context = await browser._defaultContext;
  const page = await context.newPage();

  page.setViewportSize({
    width: 1200,
    height: 630,
  });

  await page.setContent(`<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <link
        rel="stylesheet"
        type="text/css"
        media="all"
        href="https://cloud.typography.com/7222118/6340832/css/fonts.css"
      />
      <link rel="preload" href="${
        userData ? userData.photoURL : ''
      }" as="image" media="(max-width: 600px)" />
    </head>

    <body>
      <div id="app">
        <div
          style="
            display: flex;
            background-color: #c46200;
            align-items: center;
            text-align: center;
            font-size: 72px;
            font-weight: 900;
            line-height: 96px;
            font-family: 'Whitney SSm A', 'Whitney SSm B', 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial,
              sans-serif;
            width: 1200px;
            height: 630px;
            overflow: hidden;
          "
        >
          Check out my trips on packup!
        </div>
      </div>
    </body>
  </html>
  `);

  if (userData) {
    const imageResponse = await page.waitForResponse(userData.photoURL);
    if (imageResponse) {
      await page.addScriptTag({
        content: `
      window.image = "${userData.photoURL}";
      window.displayName = "${userData.displayName}";
      window.username = "${userData.username}";
    `,
      });
      await page.addScriptTag({ content: script });
    }
  }

  const boundingRect = await page.evaluate(() => {
    const app = document.getElementById('app');
    const { x, y, width, height } = app.children[0].getBoundingClientRect();
    return { x, y, width, height };
  });

  

  const screenshotBuffer = await page.screenshot({ clip: boundingRect });
  await browser.close();

  return {
    isBase64Encoded: true,
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': screenshotBuffer.length.toString(),
    },
    body: screenshotBuffer.toString('base64'),
  };
};
