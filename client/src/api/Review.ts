import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IReview } from "@/interfaces/Review";

export const reviewApi = createApi({
  reducerPath: "reviewApi",
  tagTypes: ["customerReview"],
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getAllReview: builder.query<IReview[], void>({
      query: () => `/reviews`,
      providesTags: ["customerReview"],
    }),
    getReviewById: builder.query<IReview, string>({
      query: (id) => `/reviews/${id}`,
      providesTags: ["customerReview"],
    }),
    createReview: builder.mutation<IReview, IReview>({
      query: (data) => ({
        url: `/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["customerReview"],
    }),
    updateReview: builder.mutation<IReview, IReview>({
      query: (data) => ({
        url: `/reviews/${data._id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["customerReview"],
    }),
    removeReview: builder.mutation<void, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["customerReview"],
    }),
  }),
});

export const {
  useGetAllReviewQuery,
  useGetReviewByIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useRemoveReviewMutation,
} = reviewApi;
export const reviewReducer = reviewApi.reducer;
export default reviewApi;
