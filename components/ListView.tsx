import React from 'react';
import View from './View';
import { FlatList } from 'react-native';


interface IList {
    style: React.CSSProperties;
    keyExtractor?: (item: any, index: number) => string;
    data: any[];
    renderItem: (item: any, viewport: any) => React.ReactNode;
    children: React.ReactNode | React.ReactNode[];
    horizontal?: boolean;
}

export default React.forwardRef(function ListView({...props}: IList, ref){
    const renderItem = props.renderItem ? props.renderItem : () => null;
    const keyExtractor = props.keyExtractor ? props.keyExtractor : (_item, index) => index.toString();
    return (
        <View.Height style={props.style}>
            {(layout) => (
                <FlatList 
                    data={props.data} 
                    horizontal={props.horizontal}
                    renderItem={(i)=> renderItem(i, layout)}
                    keyExtractor={keyExtractor}
                    ref={ref}
                />
           )}
        </View.Height>
    );
});



