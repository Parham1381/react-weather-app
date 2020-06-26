import { OpenWeatherMapResult } from '../interfaces/interfaces'; 
import { nodeEnvironmentURL} from '../constants/constants'; 


const checkStatus = async (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let errorJson: any = null;
    try {
      errorJson = await response.json();
    } catch (error) {
      throw new Error(response.statusText);
    }
    if (errorJson.error) {
      throw new Error(errorJson.error);
    } else {
      throw new Error(response.statusText);
    }
  }
};

const parseJSON = (response: Response) => {
  return response
    .json()
    .then((data) => data)
    .catch(() => response);
};

export const getWeatherThroughAPI = (
  city: string
): Promise<OpenWeatherMapResult> => {
  const requestUrl = `${nodeEnvironmentURL}getWeather?city=${city}`;
  return fetch(requestUrl).then(checkStatus).then(parseJSON);
};
