type SparklineProps = {
       prices : number[];
       isGreen : boolean;
       width?:number;
       height?:number;
};

export function Sparkline({ prices, isGreen, width = 80, height = 30}: SparklineProps) {

    if(prices.length < 2) return <svg width = {width} height = {height}/>;

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice || 1;

    const points = prices.map((price, index) => {
    // Ensure price is a number, default to minPrice if corrupted
    const validPrice = typeof price === 'number' ? price : minPrice;
    
    const x = (index / (prices.length - 1)) * width;
    const y = height - ((validPrice - minPrice) / priceRange) * (height - 4) - 2;
    
    return `${x.toFixed(2)},${y.toFixed(2)}`; // toFixed(2) keeps the SVG string clean
});
    

    const linePath = `M${points.join("L")}`;
    const lineColor = isGreen ? "#00C87C" : "#FF4D4D";

    return (
        <svg width={width} height={height}>
            <path d={linePath} fill="none" stroke={lineColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}