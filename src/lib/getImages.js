import { uuid } from "uuidv4";

const key = "17510080-3d8587e7aca257931bc451509";
async function getImages(query, page = 1) {
    try {
        const url = `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&page=${page}`;
        const results = await fetch(url);
        const data = await results.json();

        const total = data.totalHits;
        const images = data.hits.map((a) => ({
            id: uuid(),
            image: a.largeImageURL,
            pageUrl: a.pageURL,
        }));
        return [images, total];
    } catch (error) {
        console.error(error);
    }
}

export default getImages;
