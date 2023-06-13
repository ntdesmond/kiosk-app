import { createAction } from '@reduxjs/toolkit';
import { AuthResponse } from './models';

export const authLogout = createAction('auth/logout');
export const authFailed = createAction('auth/failed');
export const authRenewed = createAction<AuthResponse>('auth/renewed');
