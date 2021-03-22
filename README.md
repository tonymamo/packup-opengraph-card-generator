# Packup Open Graph Image Generator Kit

An image generation API template.

It generates an image with a short message and a contour background. Each contour is unique and derived from the username. The user's avatar is pulled from the firestore data via a fetch call using the query string parameters.

![image demo](https://res.cloudinary.com/getpackup/image/fetch/https%3A%2F%2Fpackup-opengraph-card-generator.netlify.app%2F.netlify%2Ffunctions%2Fshout-out-image%3Fusername%3Dtonymamo?username=tonymamo)


Once deployed, try navigating to `https://packup-opengraph-card-generator.netlify.app/image?username=PACKUP_USERNAME`.

## Architecture

The whole thing is powered by an image generation API. The image is implemented as a React component. A Netlify Functions handles the requests, spins-up a headless browser with Playwright to screenshot the DOM 📸 And returns an image.

## Cloudinary Write-Through Cache

Using the `process-url` function, we check in Cloudinary to see if the image already exists, and if it doesn't, then using the Cloudinary Fetch API to ping back to the `shout-out-image` function here to generate the image and then save it in Cloudinary.

![shout-out-generator-workflow](https://user-images.githubusercontent.com/42671/108220726-0950d680-7105-11eb-889c-555837b996e2.jpg)

It's a pared back version of Christopher Biscardi's wonderful [Building an OpenGraph image generation API](https://egghead.io/playlists/building-an-opengraph-image-generation-api-with-cloudinary-netlify-functions-and-react-914e) course.

The build setup is configured via the `Makefile`.

### Run it locally

```bash
$ cd image-component
$ npm i
$ npm run storybook
```
