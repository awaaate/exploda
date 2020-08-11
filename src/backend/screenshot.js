const puppeteer = require("puppeteer");
const screenshotProps = {
    type: "jpeg",
    quality: 80,
};
const screenshot = async (html) => {
    const browser =  await puppeteer.launch({
        args: ["--no-sandbox"],
        headless: true,
    });
    const page = await browser.newPage();

    await page.setContent(html.trim(), { waitUntil: 'networkidle0' });
    const element = await page.$("body");
    const buffer = await element.screenshot({ ...screenshotProps });
    return buffer;
};

export default screenshot;
