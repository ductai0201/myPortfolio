import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ITag {
    _id?: string,
    name?: string
    project?: string[]
}
export const tagApi = createApi({
  reducerPath: "tagApi",
  tagTypes: ["tag"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllTag: builder.query<ITag[], void>({
      query: () => `/tags`,
      providesTags: ["tag"],
    }),
    getTagById: builder.query<ITag, string>({
      query: (id) => `/tags/${id}`,
      providesTags: ["tag"],
    }),
    createTag: builder.mutation<ITag, ITag>({
      query: (data) => ({
        url: `/tags`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tag"],
    }),
    updateTag: builder.mutation<ITag, ITag>({
      query: (data) => ({
        url: `/tags/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["tag"],
    }),
    removeTag: builder.mutation<void, string>({
      query: (id) => ({
        url: `/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tag"],
    }),
  }),
});

export const {
  useGetAllTagQuery,
  useGetTagByIdQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useRemoveTagMutation,
} = tagApi;
export const tagReducer = tagApi.reducer;
export default tagApi;
