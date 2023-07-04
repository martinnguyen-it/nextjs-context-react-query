import CounterContext from '@/src/contexts/CounterContext';
import ProductContext from '@/src/contexts/ProductContext';
import { useContext, useEffect, useState } from 'react';

export const useCounterContext = () => {
    const { counter, setCounter } = useContext(CounterContext);
    return { counter, setCounter };
};

export const useProductContext = () => {
    const { state, dispatch } = useContext(ProductContext);
    return { state, dispatch };
};
