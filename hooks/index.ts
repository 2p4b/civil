import { useState, useEffect, useMemo } from "react";
export { default as useTheme } from './useTheme';

export function useForm(schema, initialValues = {}){
    const [data, setData] = useState(initialValues);

    function validate() {
        const {error} = schema.safeParse(data);
        if(error) {
            return error.issues.reduce( (acc, issue) => {
                const key = issue.path.join(".");
                const prev = acc[key] ?? [];
                return {...acc, [key]: [ ...prev, issue.message]};
            }, {});
        }
        return {};
    }

    return useMemo(() => { 

        const errors = validate(data);
        const setValues = setData;

        function reset(){
            setData({});
        }

        function setField(name, value) {
            setData(data => ({...data, [name]: value}));
        }

        const inputs = schema.keyof().options.reduce((acc, key) => {
            const value  = data[key];   
            const setValue = (value) => setField(key, value);
            const input = {value, setValue, errors: errors[key] ?? []};
            return {...acc, [key]: input};
        }, {});

        const controls = {setValues, reset, errors};
        return [inputs, controls];
    }, [data, schema]);

}
