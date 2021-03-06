// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import chromium from "chrome-aws-lambda";
import screenshot from "../../backend/screenshot";
let browser = null;
export default async (req, res) => {
    const { html, width, height, fileName } = req.query;

    if (!browser) {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: true,
            ignoreHTTPSErrors: true,
        });
    }
    const page = await browser.newPage();
    const image = await screenshot(
        page,
        `
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
        `
    );
    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(image, "binary");
    return;
};
