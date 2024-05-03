import React, { useState } from 'react';
import { View as RNView} from 'react-native';
import { useTheme } from "@/hooks"

export type TView = UIMode & RNView['props'];

export function Height({ children, ...props}: TView) {
    const [layout, setLayout] = useState({ width: 0, height: 0 });

    return <View {...props} onLayout={(e)=>setLayout(e.nativeEvent.layout)}>{(()=>{
        if(layout.height === 0 || layout.width === 0) return null;
        if(typeof (children) === "function") return children(layout);
    })()}</View>
}

export default function View({style, ...props}: TView) {
    const theme = useTheme();
    return <RNView style={[{ 
        color: theme.palette.text.get(theme.variant.text),
        backgroundColor: theme.palette.background.get(theme.variant.background)
    }, style]} {...props} />;
}

View.Height = Height;
