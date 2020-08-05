// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import nodeHtmlToImage from "node-html-to-image";
export default async (req, res) => {
    const { width, height, html } = req.query;
    const image = await nodeHtmlToImage({
        html: ` </html> 
        <head>
        <link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
            <style>
              body {
                width: ${width}px;
                height: ${height}px;
              }
            </style>
          </head>
          <body>${html}</body>
        </html>`,
    });

    res.writeHead(200, { "Content-Type": "image/png" });
    res.end(image, "binary");
};
