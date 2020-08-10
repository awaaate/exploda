// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import screenshot from "../../backend/screenshot";
export default async (req, res) => {
    const { width, height, html } = req.query;
    const image = await screenshot(`
    <html>
        <head>
            <link
                href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css"
                rel="stylesheet"
            />
            <style>
                body{
                    width: ${width};
                    height: ${height};
                }
            </style>
        </head>
        <body>
            ${html}
        </body>
    </html>  
    `);

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(image, "binary");
};
