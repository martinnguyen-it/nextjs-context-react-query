import axios, { AxiosError, AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { MutationFunction, useMutation } from 'react-query';
import { TMutationAPIEndPoints } from './endpoints';
import { IErrorResponseBody } from '@lib/types/api/api.response';
import { API } from '@/src/shared/constants';

export function useMutationApi<TResponse = any, TRequestRequiredParams = any, TTransformedResponse = TResponse>(
    sendRequestFunction: (requestRequiredParams: TRequestRequiredParams) => TMutationAPIEndPoints,
) {
    const [responseBody, setResponseBody] = useState<TTransformedResponse>();

    const mutationFunction: MutationFunction<AxiosResponse<TResponse>, TRequestRequiredParams> = React.useCallback(
        (requestRequiredParams) => {
            const sendRequestParams = sendRequestFunction(requestRequiredParams);
            return sendRequestParams.payload
                ? axios({
                      method: sendRequestParams.method,
                      baseURL: API,
                      url: sendRequestParams.endpoint,
                      data: sendRequestParams.payload,
                  })
                : axios({
                      method: sendRequestParams.method,
                      baseURL: API,
                      url: sendRequestParams.endpoint,
                  });
        },
        [],
    );

    const { mutate, isError, error, isSuccess, isLoading } = useMutation<
        AxiosResponse<TResponse>,
        AxiosError<IErrorResponseBody, any>,
        TRequestRequiredParams
    >(mutationFunction, {
        onSuccess: (response) => {
            if (response.data) {
                setResponseBody(response.data as any as TTransformedResponse);
            }
        },
    });

    const errorMessage = error && (error?.response?.data?.message || error.message);

    return { responseBody, isLoading, sendRequest: mutate, isError, error, errorMessage, isSuccess };
}
