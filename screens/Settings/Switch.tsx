import React, {useState, useEffect } from 'react';
import { StyleSheet, Switch as RNSwitch} from 'react-native';
import { Item } from '@/components';
import { useTheme } from "@/hooks"

export interface IItem {
    name: string;
    value?: any;
    disabled?: boolean;
    description?: string;
    onChange: ({value}: {value: boolean}) => void;
    styles?: React.CSSProperties;
}

export default function Switch({name="Switch", disabled=true, ...props}: IItem) {

    const [value, setValue] = useState(props.value ?? true);

    const handleToggle = () => setValue(value => !value);

    useEffect(() => {
        const { onChange } = props;
        if(onChange && typeof onChange === 'function')
            onChange({value});
    }, [value]);

    return (
        <Item styles={props.styles} name={name} disabled={disabled} description={props.description} right={
            <RNSwitch
                value={value}
                disabled={disabled}
                onValueChange={handleToggle}
            />
        }/>
    );
}

export const styles = StyleSheet.create({

});



