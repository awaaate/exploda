const screenshotProps = {
    type: "jpeg",
    quality: 100,
};

const screenshot = async (page, html) => {

    await page.setContent(html.trim(), { waitUntil: ['networkidle0', 'domcontentloaded'] });
    const element = await page.$("body");

    const buffer = await element.screenshot({ ...screenshotProps });

    return buffer;
};

export default screenshot;
