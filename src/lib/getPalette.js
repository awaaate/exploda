import ColorThief from "colorthief/dist/color-thief.umd";
/**
 *
 * @param {HTMLImageElement} img
 */
export function getPalette(img) {
    const colorThief = new ColorThief();
    const colors = colorThief.getPalette(img, 4);

    const schemeColors = colors.map((a) => `#${rgbToHex(...a)}`);
    const primary = schemeColors[3];

    const secondary = schemeColors[0];

    const text = "#" + pickTextColor(primary, "fff", "000");

    return [{ primary, secondary, text }, schemeColors];
}

function pickTextColor(bgColor, lightColor, darkColor) {
    var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    var r = parseInt(color.substring(0, 2), 16); // hexToR
    var g = parseInt(color.substring(2, 4), 16); // hexToG
    var b = parseInt(color.substring(4, 6), 16); // hexToB
    var uicolors = [r / 255, g / 255, b / 255];
    var c = uicolors.map((col) => {
        if (col <= 0.03928) {
            return col / 12.92;
        }
        return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? darkColor : lightColor;
}
const rgbToHex = (r, g, b) =>
    [r, g, b]
        .map((x) => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        })
        .join("");
