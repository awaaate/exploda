const ToolTip = ({ children, text, className }) => (
    <div className={`tooltip  m-1 cursor-pointer ${className}`}>
        {children}
        <p className="tooltip-text bottom-0 right-0  absolute m-3 whitespace-no-wrap  p-1 text-white bg-gray-900 rounded-br-none rounded-lg text-sm px-2">
            {text}
        </p>
    </div>
);

export default ToolTip;
