import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchTerm: '',
    results: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setResults(state, action) {
            state.results = action.payload;
        },
        resetSearch(state) {
            state.searchTerm = '';
            state.results = [];
        },
    },
});

export const { setSearchTerm, setResults, resetSearch } = searchSlice.actions;

const searchReducer = searchSlice.reducer;
export default searchReducer;
