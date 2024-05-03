import { Text as RNText} from 'react-native';
import { useTheme } from "@/hooks"
export type TextProps = UIMode & RNText['props'];

export default function Text({style, ...props}: TextProps) {
    const theme = useTheme();
    return <RNText style={[{ 
        color: theme.palette.text.get(theme.variant.text),
    }, style]} {...props} />;
}

