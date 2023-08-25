import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IProject } from "@/interfaces/Project";

export const projectApi = createApi({
  reducerPath: "projectApi",
  tagTypes: ["project"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllProject: builder.query<IProject[], void>({
      query: () => `/projects`,
      providesTags: ["project"],
    }),
    getProjectById: builder.query<IProject, string>({
      query: (id) => `/projects/${id}`,
      providesTags: ["project"],
    }),
    createProject: builder.mutation<IProject, IProject>({
      query: (data) => ({
        url: `/projects`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    updateProject: builder.mutation<IProject, IProject>({
      query: (data) => ({
        url: `/projects/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["project"],
    }),
    removeProject: builder.mutation<void, string>({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetAllProjectQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useRemoveProjectMutation,
} = projectApi;
export const projectReducer = projectApi.reducer;
export default projectApi;
