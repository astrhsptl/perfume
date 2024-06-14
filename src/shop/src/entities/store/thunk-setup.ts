"use client";

import { AppDispatch, RootState } from "@/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

type RejectValue = {
  detail: string;
};

type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: RejectValue;
  extra: unknown;
};

export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
