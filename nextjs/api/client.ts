import axios from "axios";
import Cookies from "universal-cookie";
import bcrypt from "bcryptjs";

export type AuthResponse = { token: string; identity: string };

export enum ApiFramework {
  dotnet = "dotnet",
  flask = "flask",
}

const apiClient = () => {
  const apiFramework = localStorage.getItem("API") || ApiFramework.dotnet;
  const apiPrefix = `/api/${apiFramework}/`;
  const cookie = new Cookies();
  const token = cookie.get("access_token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const get = async <T>(path: string) => {
    try {
      const messages = await axios.get<T>(`${apiPrefix}${path}`, {
        withCredentials: true,
        headers: headers,
      });
      return messages.data;
    } catch (err) {
      console.log(err);
    }
  };

  const post = async <T, P>(path: string, payload: P) => {
    try {
      const messages = await axios.post<T>(`${apiPrefix}${path}`, {
        ...payload,
        withCredentials: true,
        headers: headers,
      });
      return messages.data;
    } catch (err) {
      console.log(err);
    }
  };

  return {
    get,
    post,
  };
};

export default apiClient;
