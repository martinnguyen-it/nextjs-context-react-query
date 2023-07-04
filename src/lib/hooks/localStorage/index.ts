import { useEffect, useState } from 'react';

interface IGetStorageValue {
    key: string;
    defaultValue?: any;
}

export const getStorageValue = ({ key, defaultValue }: IGetStorageValue) => {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(key);
        const initialValue = saved ? JSON.parse(saved) : defaultValue || null;
        return initialValue;
    }
    return undefined;
};

export const useLocalStorage = ({ key, defaultValue }: IGetStorageValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue({ key, defaultValue });
    });

    useEffect(() => {
        value && localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};
