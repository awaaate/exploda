const plugin = require("tailwindcss/plugin");
module.exports = {
    important: true,
    theme: {
        fontFamily: {
            display: ["Montserrat", "sans-serif"],
            body: ["Montserrat", "sans-serif"],
        },
        extend: {
            extend: {
                opacity: {
                    "08": "0.08",
                    "10": "0.1",
                    "20": "0.2",
                },
            },
        },
    },
    purge: {
        enabled: true,
        content: ["./src/**/*.jsx", "./src/pages/*.js"],
    },
    variants: {
        borderColor: ["hover", "focus", "active", "focus-within"],
        border: ["hover", "focus", "active"],
        opacity: ["group-hover"],
    },
};
