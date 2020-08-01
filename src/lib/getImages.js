const key = "17510080-3d8587e7aca257931bc451509";
async function getImages(query, page = 1) {
    try {
        const url = `https://pixabay.com/api/?key=${key}&q=${query}&image_type=photo&page=${page}`;
        const results = await fetch(url);
        const data = await results.json();

        return data.hits.map((a) => ({
            image: a.largeImageURL,
            pageUrl: a.pageURL,
        }));
    } catch (error) {
        console.error(error);
    }
}

export default getImages;
