import { useEffect, useState, useRef } from "react";
import { getPalette } from "../lib/getPalette";

import Link from "next/link";
const Index = () => {
    return (
        <div className="h-full w-full">
            <div className="w-full m-auto" style={{ maxWidth: 700 }}>
                <header className="flex p-2 items-center justify-center">
                    <div className="text-gray-900 italic opacity-75 font-body text-4xl border-black border-2 p-2">
                        Exploda
                    </div>
                </header>
                <div className="my-16 text-center text-blue-900">
                    <h1 className="text-4xl font-semibold w-3/4 m-auto">
                        Create thousands of images in one click
                    </h1>
                    <p className="mt-3">
                        Use our tool to automatize your daily work and boost
                        your productivity
                    </p>
                </div>
                <div className="flex flex-col justify-center items-center my-4">
                    <Link href="/app">
                        <a className="bg-orange-500 rounded-lg p-4 w-1/3 text-center text-xl font-medium text-white shadow-sm text-opacity-75">
                            Early access
                        </a>
                    </Link>
                    <span className="font-medium text-gray-600 uppercase text-sm">beta 1</span>
                </div>
                <img
                    src="screenshot.png"
                    className="w-full border-2 border-black p-1 bg-gray-900 overflow-hidden rounded-md"
                />
            </div>
        </div>
    );
};

export default Index;
