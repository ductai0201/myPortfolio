import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBlog } from "@/interfaces/Blog";

export const blogApi = createApi({
  reducerPath: "blogApi",
  tagTypes: ["blog"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllBlog: builder.query<IBlog[], void>({
      query: () => `/blogs`,
      providesTags: ["blog"],
    }),
    getBlogById: builder.query<IBlog, string>({
      query: (id) => `/blogs/${id}`,
      providesTags: ["blog"],
    }),
    createBlog: builder.mutation<IBlog, IBlog>({
      query: (data) => ({
        url: `/blogs`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    updateBlog: builder.mutation<IBlog, IBlog>({
      query: (data) => ({
        url: `/blogs/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["blog"],
    }),
    removeBlog: builder.mutation<void, string>({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blog"],
    }),
  }),
});

export const {
  useGetAllBlogQuery,
  useGetBlogByIdQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useRemoveBlogMutation,
} = blogApi;
export const blogReducer = blogApi.reducer;
export default blogApi;
