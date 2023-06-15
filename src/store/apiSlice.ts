import { SerializedError } from '@reduxjs/toolkit';
import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { authFailed, authRenewed } from './actions';
import { AuthResponse, AuthBody, FileInfo } from './models';
import { type RootState } from './store';

const { API_ROOT, USER, PASSWORD } = window.electronAPI.filesConfig;

export const baseQuery: BaseQueryFn = async (args, api, extraOptions) => {
  const queryWithAuth = fetchBaseQuery({
    baseUrl: API_ROOT,
    prepareHeaders: (headers) => {
      const {
        auth: { access_token },
      } = api.getState() as RootState;
      if (access_token) {
        headers.set('Authorization', `Bearer ${access_token}`);
      }
      return headers;
    },
  });

  const originalQuery = async () => queryWithAuth(args, api, extraOptions);
  let response = await originalQuery();
  if (response.error?.status !== 401 && response.error?.status !== 403) {
    return response;
  }

  const update: AuthBody = { username: USER, password: PASSWORD };

  const authResponse = await queryWithAuth(
    {
      url: '/auth',
      method: 'POST',
      body: update,
    },
    api,
    extraOptions,
  );

  if (authResponse.error) {
    api.dispatch(authFailed());
    return response;
  }

  api.dispatch(authRenewed(authResponse.data as AuthResponse));

  response = await originalQuery();
  return response;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['file'],
  endpoints: (builder) => ({
    authenticate: builder.mutation<AuthResponse, AuthBody>({
      query: (auth) => ({
        url: '/auth',
        method: 'POST',
        body: auth,
      }),
      invalidatesTags: ['file'],
    }),
    listFiles: builder.query<FileInfo[], void>({
      query: () => ({ url: '/' }),
      providesTags: (result) => (result ? result.map(({ id }) => ({ type: 'file', id })) : []),
    }),
  }),
});

const getFetchErrorMessage = (error: FetchBaseQueryError) => {
  if ('error' in error) {
    return error.error;
  }

  const { detail } = error.data as { detail?: string };

  return detail || JSON.stringify(error.data);
};

export const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ('status' in error) {
    return getFetchErrorMessage(error);
  }

  const message = error.message || 'Unknown error';

  if (error.code === undefined) {
    return message;
  }

  return `${message} (code ${error.code})`;
};

export const { useAuthenticateMutation, useListFilesQuery } = apiSlice;
