export function getImageDataURL(image) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onloadend = (event) => {
            resolve(event.target.result);
        };
    });
}
export function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
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

export const getBoardScale = (size) => {
    const scaleX = (window.innerWidth * (5 / 12)) / size.width;
    const scaleY = (window.innerWidth * (5 / 12)) / size.height;
    const scale = Math.min(scaleX, scaleY);
    return scale;
};
