import { useCallback, useState } from 'react';
import { useBoolean } from '@chakra-ui/react';
import { SerializedError } from '@reduxjs/toolkit';
import { BaseQueryApi, FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { baseQuery } from './apiSlice';
import { useAppDispatch, useAppSelector } from './store';

const useFileDownloader = () => {
  const dispatch = useAppDispatch();
  const fullState = useAppSelector((state) => state);
  const [isLoading, { on: onStartLoading, off: onStopLoading }] = useBoolean();
  const [error, setError] = useState<FetchBaseQueryError | SerializedError>();
  const [file, setFile] = useState<File>();

  const getFile = useCallback(
    async (id: string, filename: string) => {
      onStartLoading();
      const result = await baseQuery(
        {
          url: `/${id}`,
          responseHandler: (response: Response) => response.blob(),
        },
        {
          dispatch,
          getState: () => fullState,
        } as BaseQueryApi,
        {},
      );
      onStopLoading();
      if (result.data) {
        setFile(new File([result.data as Blob], filename));
      }
      if (result.error) {
        setError(error as FetchBaseQueryError | SerializedError);
      }
    },
    [dispatch, error, fullState, onStartLoading, onStopLoading],
  );
  return [getFile, { file, isLoading, error, isError: error !== undefined }] as const;
};

export default useFileDownloader;
