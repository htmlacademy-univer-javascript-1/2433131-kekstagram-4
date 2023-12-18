import { URL, Route, Method, ErrorText } from './data.js';

const load = async (route, errorText, method = Method.GET, body = null) => {
  try {
    const response = await fetch(`${URL}${route}`, { method, body });
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  } catch (error) {
    throw new Error(errorText);
  }
};

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.POST_DATA, Method.POST, body);

export { getData, sendData};
