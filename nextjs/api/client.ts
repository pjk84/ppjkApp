import axios from "axios";
import config from "./config";
import Cookies from "universal-cookie";
import bcrypt from "bcryptjs";
import { Post } from "../components/blog/types";

export enum Framework {
  Flask = "FLASK",
  Dotnet = "DOTNET",
}

export type AuthResponse = { token: string; identity: string };

const apiClient = () => {
  const api = "DOTNET";
  const baseUrl = `${config[api as Framework]}`;
  const cookie = new Cookies();
  const token = cookie.get("access_token");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const editBlogMessage = async (post: Post) => {
    try {
      return await axios.patch(
        `${baseUrl}/blog/posts`,
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
      if (process.env.API == "DOTNET") {
      }
      const messages = await axios.get(`${baseUrl}/blog/posts`, {
        withCredentials: true,
        headers: headers,
      });
      return messages.data;
    } catch (err) {
      return [];
    }
  };

  const getBlogMessageByTitle = async (title: string) => {
    try {
      const messages = await axios.get(`${baseUrl}/blog/posts/${title}`, {
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
        `${baseUrl}/blog/posts/${parentId}/replies`,
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
      const messages = await axios.delete(`${baseUrl}/blog/posts/${id}`, {
        withCredentials: true,
        headers: headers,
      });
      return messages.data;
    } catch (err) {
      console.log(err);
    }
  };

  const get = async <T>(path: string) => {
    console.log(`${baseUrl}${path}`);
    try {
      const messages = await axios.get<T>(`${baseUrl}${path}`, {
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
      const messages = await axios.post<T>(`${baseUrl}/${path}`, {
        ...payload,
        withCredentials: true,
        headers: headers,
      });
      return messages.data;
    } catch (err) {
      console.log(err);
    }
  };

  const addBlogMessage = async (post: Post) => {
    try {
      return await axios.post(
        `${baseUrl}/blog/post`,
        {
          ...post,
          title: post.title!.trim(),
          tags:
            post.tags?.map((t) => {
              return { name: t };
            }) || [],
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
    editBlogMessage,
    addBlogMessage,
    fetchBlogMessages,
    deleteBlogMessages,
    getBlogMessageByTitle,
    get,
    post,
  };
};

export default apiClient;
