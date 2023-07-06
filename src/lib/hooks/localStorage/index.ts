import { useEffect, useState } from 'react';

interface IGetStorageValue {
    key: string;
    defaultValue?: any;
}

export const getStorageValue = ({ key, defaultValue }: IGetStorageValue) => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(key);
        const initialValue = saved ? JSON.parse(saved) : defaultValue;
        return initialValue;
    }
    return defaultValue || undefined;
};

export const useLocalStorage = ({ key, defaultValue }: IGetStorageValue) => {
    const [value, setValue] = useState<any>();

    useEffect(() => {
        setValue(getStorageValue({ key, defaultValue }));
    }, [key]);

    useEffect(() => {
        value && localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
