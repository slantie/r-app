import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
// import { print } from '../utils';
import { DELETE, GET, POST, PUT } from '../constants/api';
import PrefManager from '../utils/prefManager';
import { STRING } from '../constants';
import { print } from '../utils/method';
import { logout, resetStore } from '../store/actions/auth/loginAction';
import { store } from '../store';

interface ApiRequestProps {
  apiUrl: string;
  apiMethod?: string;
  apiData?: any;
  apiHeaders?: Record<string, string>;
  apiParams?: Record<string, any>;
  timeout?: number;
}

// Logout function to clear user data and token
export const handleLogout = async (): Promise<void> => {
  await PrefManager.removeValue(STRING.TOKEN);
  await PrefManager.removeValue(STRING.USER);
  store.dispatch(logout());
  store.dispatch(resetStore());
  // Optionally, add navigation or Redux logout logic here
}


export async function MakeApiRequest({
  apiUrl,
  apiMethod = GET,
  apiData = {},
  apiHeaders = {},
  apiParams = {},
  timeout = 30000,
}: ApiRequestProps): Promise<AxiosResponse<any>> {

  const token = await PrefManager.getValue(STRING.TOKEN);
  const headers = {
   'Content-Type': apiHeaders['Content-Type'] || 'application/json',
      Authorization: token && token ? token: undefined,
    ...apiHeaders,
  };

  print(`${apiMethod} API:`, apiUrl, 1);
  print('Headers:', JSON.stringify(headers), 1);
  print('Params:', JSON.stringify(apiParams), 1);

  if (apiMethod !== GET) print('Body:', JSON.stringify(apiData), 1);

  // Axios Configuration
  const config: AxiosRequestConfig = {
    method: apiMethod as any,
    url: apiUrl,
    headers,
    params: apiParams,
    timeout,
    ...(apiMethod !== GET ? { data: apiData } : {}),
  };

  try {
    const response = await axios(config);
    print('API Response:', response.data, 1);
    return Promise.resolve(response);
  } catch (error: any) {
    print(`${apiMethod} API Error:`, error.response || error, 0);

    // Handle status codes
    if(error?.response?.status === 400) {
      return Promise.reject(error);
    }
    else if(error?.response?.status === 401) {
      console.log("error:============", error);

      // logout action
      await handleLogout();
      // return Promise.reject(error);
    }
    else {
      return Promise.reject(error);
    }
  }
}
