const plugin = require("tailwindcss/plugin");
module.exports = {
    important: true,
    theme: {
        fontFamily: {
            display: ["Montserrat", "sans-serif"],
            body: ["Montserrat", "sans-serif"],
        },
        extend: {
            colors: {
                accent: "#3366ff",
                dark: "#15172a",
                light: "#c0cbdf",
                primary: "#2e3a58",
            },
            margin: {
                "96": "24rem",
                "128": "32rem",
            },
        },
    },
    purge: ["./src/**/*.jsx", "./src/pages/*.js"],
    variants: {
        borderColor: ["hover", "focus", "active", "focus-within"],
        border: ["hover", "focus", "active"],
        opacity: ["group-hover"],
    },
};
