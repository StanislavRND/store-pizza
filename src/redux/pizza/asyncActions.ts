import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { sortBy, category, search, currentPage } = params;
    const response = await axios.get(
      `https://65bcc6cab51f9b29e93241eb.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=asc&${search}`,
    );

    return response.data;
  },
);
