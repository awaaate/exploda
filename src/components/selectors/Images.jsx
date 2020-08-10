import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaInfo } from "react-icons/fa";

import InfiniteScroll from "react-infinite-scroll-component";
import { useDesignPropsContext } from "../../lib/context/design/design.context";
import { useBoardContext } from "../../lib/context/board/board.context";

import { getImageDataURL } from "../../lib/utils";
import getImages from "../../lib/getImages";

import FormControl from "../common/FormControl";
import ImageLoader from "../common/ImageLoader";
const ImageOption = ({ image, activeImage, onClickHandler }) => (
    <div
        className={`rounded-md cursor-pointer overflow-hidden my-2 ${
            image === activeImage ? "border-orange-500 border-2" : ""
        }`}
        style={{
            height: "5rem",
        }}
        onClick={onClickHandler(image)}
    >
        <ImageLoader
            src={image}
            alt="image"
            className="w-full object-cover object-center "
        />
    </div>
);
const ImagesList = ({ images, image, onClickHandler }) =>
    images.map((img) => (
        <ImageOption
            image={img}
            activeImage={image}
            onClickHandler={onClickHandler}
        />
    ));

const ResultsList = ({ results, image, onClickHandler, loadMore }) => (
    <React.Fragment>
        {results.map((a) => (
            <div key={a.id} className="relative">
                <ImageOption
                    image={a.image}
                    activeImage={image}
                    onClickHandler={onClickHandler}
                />
                <a
                    href={a.pageUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="absolute right-0 bottom-0 text-gray-500 m-2 p-2 rounded-md bg-gray-100 flex items-center opacity-75"
                >
                    <img src="./pixabaylogo.svg" className="w-12" alt="" />
                    <FaInfo />
                </a>
            </div>
        ))}
        <div
            onClick={loadMore}
            className="col-span-2 w-full p-2 bg-gray-300 text-center cursor-pointer rounded-md font-semibold text-gray-800 hover:bg-gray-400"
        >
            Load More
        </div>
    </React.Fragment>
);

const ImageSelector = () => {
    const [results, setResults] = useState([]);
    const { imagesList } = useBoardContext();
    const { set, image } = useDesignPropsContext();
    const [page, setPage] = useState([]);
    const [query, setQuery] = useState();

    const resultsContainer = useRef(null);

    const onImageUpload = async (event) => {
        const file = event.target.files[0];
        const src = await getImageDataURL(file);
        set("image", src);
    };
    const onClickHandler = (image) => async () => {
        set("image", image);
    };
    const onSearchFormSubmit = (event) => {
        event.preventDefault();

        getImages(query, page).then((data) => {
            const [images, total] = data;
            setResults(images);
        });
    };
    const loadMore = () => {
        setPage((page) => {
            page = page + 1;
            getImages(query, page).then((data) => {
                setResults((d) => [...d, ...data[0]]);
            });
            return 1;
        });
    };
    return (
        <div className="flex flex-col h-full">
            <form onSubmit={onSearchFormSubmit}>
                <FormControl
                    label={
                        !query ? (
                            <FaSearch />
                        ) : (
                            <div
                                className=" bg-blue-900 p-2 rounded-full font-bold text-white w-6 h-6 flex items-center justify-center cursor-pointer"
                                onClick={() => setQuery("")}
                            >
                                ×
                            </div>
                        )
                    }
                    value={query}
                    onChange={({ target }) => {
                        setQuery(target.value);
                        setResults([]);
                    }}
                    placeholder="search 2m+ images"
                />
            </form>
            <div
                ref={resultsContainer}
                className="grid grid-cols-2 gap-2 max-h-full overflow-y-auto"
            >
                {query ? (
                    <ResultsList
                        loadMore={loadMore}
                        results={results}
                        image={image}
                        onClickHandler={onClickHandler}
                    />
                ) : (
                    <ImagesList
                        images={imagesList}
                        image={image}
                        onClickHandler={onClickHandler}
                    />
                )}
            </div>
            <button className="bg-orange-500 p-2 relative rounded-md text-white cursor-pointer">
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    style={{ fontSize: "0" }}
                    onChange={onImageUpload}
                />
                Upload Image
            </button>
        </div>
    );
};

export default ImageSelector;
