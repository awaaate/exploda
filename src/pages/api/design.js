// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import puppeteer from 'puppeteer'
import screenshot from "../../backend/screenshot";

const browserPromise = puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
});
export default async (req, res) => {
    try {
        const { html, width, height } = req.query;
        const browser = await browserPromise
        const page = await browser.newPage();
        const image = await screenshot(page, `
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
    } catch (error) {
        throw error;
    }
};
