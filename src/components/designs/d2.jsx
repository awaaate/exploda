export default function d1({ image, colors, body, caption, watermark, size }) {
    return (
        <div className="overflow-hidden relative flex justify-center items-center origin-top-left w-full h-full">
            <div
                className="absolute w-full h-full bg-black left-0 top-0"
                style={{
                    opacity: ((Math.random() * 50 + 20) / 100).toFixed(2),
                }}
            ></div>
            <img src={image} className="w-full h-full object-cover " />
            <div
                className="absolute rounded-full flex items-center justify-center flex-col p-4 px-8 "
                style={{
                    background: colors.secondary,
                    height: size.width / 2,
                    width: size.width / 2,
                    overflowWrap: "break-word",
                }}
            >
                <p
                    className="text-center font-medium text-xl opacity-75"
                    style={{
                        color: colors.text,
                    }}
                >
                    {body}
                </p>
                <div
                    className="mt-4 font-bold"
                    style={{
                        color: colors.primary,
                    }}
                >
                    {caption}
                </div>
            </div>
        </div>
    );
}
