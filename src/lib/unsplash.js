import Unsplash from "unsplash-js";
import { getImageDataURL } from "./utils";

const unsplash = new Unsplash({
    accessKey: "HEV3-DJljc5_hsncg9bCa4HAXm1btWCmQ0VtWPnmS_o",
    secret: "gsd-XKDkyBKvolmHNagkkb7mSK5ZjIFDXwbx9y9YK7g",
    callbackUrl: "/app",
});

export async function getPhoto(keyword) {
    try {
        /*      const response = await unsplash.photos.getRandomPhoto({
            query: keyword,
        });

        const data = await response.json();
        return data.urls.full; */
        const n = Math.floor(Math.random() * 25) + 1;
        return `images/image (${n}).jpg`
    } catch (err) {
        console.log(err);
    }
}

export default unsplash;
