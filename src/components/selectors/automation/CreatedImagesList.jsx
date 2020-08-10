import Spin from "../../common/Spin";
import { useState } from "react";

const CreatedImagesList = ({ images, loadend }) => {
    const [downloadList, setDownLoadList] = useState([])
    return (
        <div className="grid-cols-2 grid gap-2 p-2">
            {images.map((image) => (
                <img
                    className="w-full object-cover rounded-md"
                    onClick={() => window.open(a.src, "_blank")}
                    style={{ height: 100 }}
                    src={image.src}
                    key={image.id}
                    alt=""
                />
            ))}
            {!loadend ? (
                <div
                    className="w-full bg-gray-300 flex items-center justify-center rounded-md"
                    style={{ height: 100 }}
                >
                    <Spin />
                </div>
            ) : null}
        </div>
    );
};

export default CreatedImagesList;
