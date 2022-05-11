import axios from "axios";
import config from "./config";
import Cookies from "universal-cookie";
import { Post, Tag } from "../../components/blog/types";

export enum Framework {
  FLASK = "FLASK",
  DOTNET = "DOTNET",
}

const apiClient = () => {
  const baseUrl =
    process.env["API"] === Framework.DOTNET
      ? config.dotnetBaseUrl
      : config.flaskBaseUrl;
  const cookie = new Cookies();
  const token = cookie.get("access_token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const login = async (password: string) => {
    try {
      return await axios.post(
        `${baseUrl}/login`,
        { password: password },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const test = async (payload: { access_token: string }) => {
    let h;
    if (payload.access_token) {
      h = { ...headers };
      h.Authorization = `Bearer ${payload.access_token}`;
    }
    console.log(h);
    try {
      return await axios.post(`${baseUrl}/test`, payload, {
        withCredentials: true,
        headers: h || headers,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const editBlogMessage = async (post: Post) => {
    try {
      return await axios.patch(
        `${baseUrl}/blog/message`,
        { id: post.id, title: post.title, body: post.body },
        {
          withCredentials: true,
          headers: headers,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBlogMessages = async () => {
    try {
      const messages = await axios.get(`${baseUrl}/blog/messages`, {
        withCredentials: true,
        headers: headers,
      });
      return messages.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getBlogMessageByTitle = async (title: string) => {
    try {
      const messages = await axios.get(`${baseUrl}/blog/message/${title}`, {
        withCredentials: true,
        headers: headers,
      });
      return messages.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getBlogRepliesByParentId = async (parentId: string) => {
    try {
      const messages = await axios.get(
        `${baseUrl}/blog/message/${parentId}/replies`,
        {
          withCredentials: true,
          headers: headers,
        }
      );
      return messages.data;
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBlogMessages = async (id: string) => {
    try {
      const messages = await axios.delete(`${baseUrl}/blog/message/${id}`, {
        withCredentials: true,
        headers: headers,
      });
      return messages.data;
    } catch (err) {
      console.log(err);
    }
  };

  const addBlogMessage = async (post: Post) => {
    console.log(post);
    try {
      return await axios.post(
        `${baseUrl}/blog/message`,
        {
          ...post,
          title: post.title!.replace(/ /g, "_"),
          tags: post.tags || [],
        },
        {
          withCredentials: true,
          headers: headers,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    getBlogRepliesByParentId,
    login,
    test,
    editBlogMessage,
    addBlogMessage,
    fetchBlogMessages,
    deleteBlogMessages,
    getBlogMessageByTitle,
  };
};

export default apiClient;
