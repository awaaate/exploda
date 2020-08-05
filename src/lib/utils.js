/**
 *
 * @param {Blob} image
 * @returns image data as URL
 */
export function getImageDataURL(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = (event) => {
            resolve(event.target.result);
        };
    });
}

export function sizeParser(size) {
    if (size === "instagram") {
        return { width: 1000, height: 1000 };
    }
    if (size === "pinterest") {
        return { width: 1000, height: 1500 };
    }
    if (size === "youtube") {
        return { width: 1280, height: 720 };
    }
    if (size.height === 1000) {
        return "instagram";
    }
    if (size.height === 1500) {
        return "pinterest";
    }
    if (size.height === 720) {
        return "youtube";
    }
    console.error("err");
}

export function capitalize(str) {
    str = str.split(" ");
    str = str.map((a) => a[0].toUpperCase() + a.slice(1));
    return str.join(" ");
}

export const fontStyleParser = (styles) => {
    styles = styles.map((val) => {
        return {
            center: {
                textAlign: "center",
            },
            bold: {
                fontWeight: "bold",
            },
            italic: {
                fontStyle: "italic",
            },
            underline: {
                textDecoration: "underline",
            },
        }[val];
    });
    return styles.reduce((acc, val) => ({ ...acc, ...val }), {});
};
