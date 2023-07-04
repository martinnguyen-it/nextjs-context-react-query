import { API } from '@/src/shared/constants';
import axios from 'axios';
import { isArray } from 'lodash';
import { QueryFunctionContext } from 'react-query';

export const queryFunction = (queryContext: QueryFunctionContext) => {
    const endpoint = isArray(queryContext.queryKey) ? queryContext.queryKey[0] : queryContext.queryKey || '';
    return axios({
        method: 'GET',
        baseURL: API,
        url: endpoint,
    });
};
