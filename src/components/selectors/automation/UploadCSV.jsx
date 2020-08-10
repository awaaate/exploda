import React, { useState, useRef } from "react";
import { FaFileUpload } from "react-icons/fa";
import Papa from "papaparse";

let deep = 0;
const UploadCSV = ({ setData }) => {
    const [isOver, setIsOver] = useState(false);
    const dropZoneRef = useRef(null);
    const handleOnDrop = (data, a) => {
        setData(data.map((data) => data.data));
    };
    const readCSV = (file) => {
        Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
                setData(results.data);
            },
        });
    };
    const changeHandler = (event) => {
        readCSV(event.target.files[0]);
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
        if (deep === 0) {
            setIsOver(true);
        }
        deep++;
    };

    const dragLeave = (e) => {
        e.preventDefault();
        deep--;
        if (deep === 0) {
            setIsOver(false);
        }
    };

    const fileDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (validateFile(files)) {
            readCSV(file);
        }
    };
    const validateFile = (file) => {
        const validTypes = [".csv"];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    };
    return (
        <div className="">
            <div
                ref={dropZoneRef}
                className="relative flex flex-col justify-center items-center rounded-lg border-2 m-4 p-3 border-blue-300"
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                style={{ borderStyle: isOver ? "solid" : "dashed" }}
            >
                <input
                    className="absolute top-0 left-0 w-full h-full  opacity-0 cursor-pointer"
                    type="file"
                    accept=".csv"
                    onChange={changeHandler}
                    style={{ fontSize: 0 }}
                />
                <FaFileUpload className="text-orange-500 text-2xl" />
                <span className="font-semibold text-gray-700 w-1/2 text-center my-2">
                    Drop CSV file here or click to upload.
                </span>
            </div>
        </div>
    );
};

export default UploadCSV;
