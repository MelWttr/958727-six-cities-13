import { AppRoute, BASE_URL, REQUEST_TIMEOUT} from '../const';
import axios, {AxiosRequestConfig, AxiosResponse, AxiosError} from 'axios';
import { getToken } from '../helpers/token';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';
import browserHistory from '../browser-history';

type DetailMessageType = {
  type: string;
  message: string;
}

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
};

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  },
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<DetailMessageType>) => {
    if (error.response && shouldDisplayError(error.response)) {
      const detailMessage = (error.response.data);

      toast.warn(detailMessage.message);
    }
    throw error;
  }
);
