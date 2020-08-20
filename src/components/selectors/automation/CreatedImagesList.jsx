import { useState, useCallback, Children } from "react";

import Spin from "../../common/Spin";
import ImageLoader from "../../common/ImageLoader";

import { getImageAsBlob } from "../../../lib/utils";
import { downloadImage } from "../../../lib/imageGenerationUtils";
import JSZip from "jszip";
import fileDownload from "js-file-download";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { Modal } from "../../common/Modal";

const Button = ({ children, ...props }) => (
    <button {...props}>{children}</button>
);
const ImageList = ({ images, onCLickHandler, downloadList }) =>
    images.map((image) => {
        const selected = downloadList.find((a) => a.id === image.id);
        return (
            <div
                onClick={onCLickHandler(image)}
                key={image.id}
                className="relative overflow-hidden rounded-md cursor-pointer"
            >
                <ImageLoader
                    className={`w-full object-cover`}
                    id={image.id}
                    style={{ height: 200 }}
                    src={image.src}
                    alt=""
                />
                {selected ? (
                    <div className="w-full h-full bg-blue-500 absolute left-0 top-0 flex justify-center items-center opacity-75">
                        <FaCheckCircle className="text-3xl text-white" />
                    </div>
                ) : null}
            </div>
        );
    });

const CreatedImagesList = ({ images, loadend, setLoadend }) => {
    const [downloadList, setDownLoadList] = useState([]);
    const [downloading, setDownloading] = useState(false);
    const [zip, setZip] = useState(new JSZip());

    const geFile = async (imageURL) => {
        const response = await fetch(imageURL);
        const blob = await response.blob();
        return blob;
    };
    const onCLickHandler = (image) => () => {
        const { src, id } = image;
        const exists = downloadList.find((a) => a.id === id);
        if (exists) {
            setDownLoadList((list) => list.filter((image) => image.id !== id));
            return;
        }
        setDownLoadList((list) => [...list, image]);
    };
    const startImageDownload = (all) => async () => {
        setDownloading(true);
        if (all) {
            for (const image of images) {
                const imageBlob = getImageAsBlob(image.src);
                zip.file(image.fileName + ".jpeg", imageBlob);
            }

            zip.generateAsync({ type: "blob" }).then(function (content) {
                fileDownload(content, "images.zip");
                setDownloading(false);
            });

            return;
        }
        for (const image of downloadList) {
            const imageBlob = getImageAsBlob(image.src);
            zip.file(image.fileName + ".jpeg", imageBlob);
        }
        zip.generateAsync({ type: "blob" }).then(function (content) {
            fileDownload(content, "images.zip");
            setDownloading(false);
        });
    };
    return (
        <div className="h-full">
            <div className="grid-cols-2 grid gap-2 p-2 overflow-y-scroll max-h-full">
                <button
                    onClick={startImageDownload(false)}
                    className="bg-gray-200 p-1 rounded-md text-blue-900 font-semibold"
                >
                    Download Selected
                </button>
                <button
                    onClick={startImageDownload(true)}
                    className="bg-gray-200 p-1 rounded-md text-blue-900 font-semibold"
                >
                    DownLoad All
                </button>
                <ImageList
                    images={images}
                    onCLickHandler={onCLickHandler}
                    downloadList={downloadList}
                />
                {loadend ? (
                    <div
                        onClick={() => setLoadend(false)}
                        className="bg-red-500 p-2 rounded-md text-white font-semibold col-span-2 cursor-pointer text-center"
                    >
                        restart work
                    </div>
                ) : null}
            </div>

            <Modal isOpen={downloading} className="bg-transparent">
                <div className=" flex items-center justify-center rounded-md">
                    <Spin />
                </div>
            </Modal>
        </div>
    );
};

export default CreatedImagesList;
