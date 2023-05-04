
import Svg, { Path } from "react-native-svg";

interface ArrowProps {
    color?: string,
    width?: number,
    height?: number
}

const ArrowBack = ({ color = '#000000', width = 24, height = 24 }: ArrowProps) => {
    return (
        <Svg
            viewBox="0 0 448 512"
            width={width}
            height={height}
        >
            <Path
                fill={color}
                d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
            />
        </Svg>
    );
}

export default ArrowBack