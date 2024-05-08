import { useTheme } from "@/hooks"
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';


export interface IIcon {
    name: keyof typeof icons;
    size?: number;
    color?: string;
    style?: React.CSSProperties;
}

const icons = {
    "default": FontAwesome,
    "file-pdf": FontAwesome6,
    "file-image": FontAwesome6,
    "file-circle-question": FontAwesome6,
    "chevron-right": FontAwesome,
    "chevron-left": FontAwesome,
    "question": FontAwesome,
}

export default function Icon({name, size, color, style}: IIcon) {
    const theme = useTheme();
    const RIcon = icons[name] ?? icons["default"];
    color = color ?? theme.palette.icon.get(theme.variant.icon);
    if(!RIcon) return null;
    return <RIcon name={name} size={size} color={color} style={style} color={color}/>
}
