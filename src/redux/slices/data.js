import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getHomeData,
  getDetailPlaylist,
  getArtistInfo,
  getArtistSongs,
  getChartHome,
  getTop100,
  getListMV,
  getDetailMV,
  getSearchResults,
  getSong,
  getSongInfo,
  getLyric,
} from '../../services/dataServices';

const initialState = {
  homePlaylists: {
    loading: false,
    items: [],
  },
  detailPlaylist: {
    loading: false,
  },
  artistInfo: {
    loading: false,
  },
  artistSongs: {
    loading: false,
    items: [],
  },
  chartHome: {
    loading: false,
    items: [],
  },
  top100: {
    loading: false,
    items: [],
  },
  listmv: {
    loading: false,
    items: [],
  },
  detailmv: {
    loading: false,
  },
  searchResults: {
    loading: false,
  },
  song: {
    loading: false,
  },
  songInfo: {
    loading: false,
  },
  lyric: {
    loading: false,
  },
};

export const fetchHomeData = createAsyncThunk(
  'data/fetchHomeData',
  async () => {
    const response = await getHomeData();
    return response;
  }
);

export const fetchDetailPlaylist = createAsyncThunk(
  'data/fetchDetailPlaylist',
  async (playlistId) => {
    const response = await getDetailPlaylist(playlistId);
    return response;
  }
);

export const fetchArtistInfo = createAsyncThunk(
  'data/fetchArtistInfo',
  async (artistName) => {
    const response = await getArtistInfo(artistName);
    return response;
  }
);

export const fetchArtistSongs = createAsyncThunk(
  'data/fetchArtistSongs',
  async (songs) => {
    const response = await getArtistSongs(songs);
    return response;
  }
);

export const fetchChartHome = createAsyncThunk(
  'data/fetchChartHome',
  async () => {
    const response = await getChartHome();
    return response;
  }
);

export const fetchTop100 = createAsyncThunk('data/fetchTop100', async () => {
  const response = await getTop100();
  return response;
});

export const fetchListMV = createAsyncThunk(
  'data/fetchListMV',
  async (page) => {
    const response = await getListMV(page);
    return response;
  }
);

export const fetchDetailMV = createAsyncThunk(
  'data/fetchDetailMV',
  async (mvId) => {
    const response = await getDetailMV(mvId);
    return response;
  }
);

export const fetchSearchResults = createAsyncThunk(
  'data/fetchSearchResults',
  async (keyword) => {
    const response = await getSearchResults(keyword);
    return response;
  }
);

export const fetchSong = createAsyncThunk('data/fetchSong', async (id) => {
  const response = await getSong(id);
  return response;
});

export const fetchSongInfo = createAsyncThunk(
  'data/fetchSongInfo',
  async (id) => {
    const response = await getSongInfo(id);
    return response;
  }
);

export const fetchLyric = createAsyncThunk('data/fetchLyric', async (id) => {
  const response = await getLyric(id);
  return response;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetArtist(state) {
      state.artistInfo = initialState.artistInfo;
      state.artistSongs = initialState.artistSongs;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchHomeData.pending, (state) => {
      state.homePlaylists.loading = true;
    });
    builder.addCase(fetchHomeData.fulfilled, (state, { payload }) => {
      const { success, items } = payload;
      if (success) {
        state.homePlaylists.items = items.filter(
          (item) => item.sectionType === 'playlist'
        );
        state.homePlaylists.loading = false;
      }
    });
    builder.addCase(fetchHomeData.rejected, (state, { payload }) => {
      console.log(payload);
    });

    builder.addCase(fetchDetailPlaylist.pending, (state) => {
      state.detailPlaylist.loading = true;
    });
    builder.addCase(fetchDetailPlaylist.fulfilled, (state, { payload }) => {
      const { success, data } = payload;
      if (success) {
        state.detailPlaylist = { loading: false, ...data };
      }
    });

    builder.addCase(fetchArtistInfo.pending, (state) => {
      state.artistInfo.loading = true;
    });
    builder.addCase(fetchArtistInfo.fulfilled, (state, { payload }) => {
      const { success, data } = payload;
      if (success) {
        state.artistInfo = { loading: false, ...data };
      }
    });

    builder.addCase(fetchArtistSongs.pending, (state) => {
      state.artistSongs.loading = true;
    });
    builder.addCase(fetchArtistSongs.fulfilled, (state, { payload }) => {
      const { success, items, hasMore } = payload;
      if (success) {
        state.artistSongs = { loading: false, items: items, hasMore: hasMore };
      }
    });

    builder.addCase(fetchChartHome.pending, (state) => {
      state.chartHome.loading = true;
    });
    builder.addCase(fetchChartHome.fulfilled, (state, { payload }) => {
      const { success, items } = payload;
      if (success) {
        state.chartHome = { loading: false, items: items };
      }
    });

    builder.addCase(fetchTop100.pending, (state) => {
      state.top100.loading = true;
    });
    builder.addCase(fetchTop100.fulfilled, (state, { payload }) => {
      const { success, items } = payload;
      if (success) {
        state.top100 = { loading: false, items: items };
      }
    });

    builder.addCase(fetchListMV.pending, (state) => {
      state.listmv.loading = true;
    });
    builder.addCase(fetchListMV.fulfilled, (state, { payload }) => {
      const { success, items, hasMore } = payload;
      if (success) {
        state.listmv = { loading: false, items: items, hasMore: hasMore };
      }
    });

    builder.addCase(fetchDetailMV.pending, (state) => {
      state.detailmv.loading = true;
    });
    builder.addCase(fetchDetailMV.fulfilled, (state, { payload }) => {
      const { success, streaming } = payload;
      if (success) {
        state.detailmv = { loading: false, hls: streaming.hls };
      }
    });

    builder.addCase(fetchSearchResults.pending, (state) => {
      state.searchResults.loading = true;
    });
    builder.addCase(fetchSearchResults.fulfilled, (state, { payload }) => {
      const { success, top, artists, songs, playlists } = payload;
      if (success) {
        state.searchResults = {
          loading: false,
          top,
          artists,
          songs,
          playlists,
        };
      }
    });

    builder.addCase(fetchSong.pending, (state) => {
      state.song.loading = true;
    });
    builder.addCase(fetchSong.fulfilled, (state, { payload }) => {
      const { success, mp3 } = payload;
      if (success) {
        state.song = { loading: false, mp3 };
      }
    });

    builder.addCase(fetchSongInfo.pending, (state) => {
      state.songInfo.loading = true;
    });
    builder.addCase(fetchSongInfo.fulfilled, (state, { payload }) => {
      const { success, title, artistsNames, thumbnailM, duration } = payload;
      if (success) {
        state.songInfo = {
          loading: false,
          title,
          artistsNames,
          thumbnailM,
          duration,
        };
      }
    });

    builder.addCase(fetchLyric.pending, (state) => {
      state.lyric.loading = true;
    });
    builder.addCase(fetchLyric.fulfilled, (state, { payload }) => {
      const { success, sentences } = payload;
      if (success) {
        state.lyric = { loading: false, sentences };
      }
    });
  },
});

export const { resetArtist } = dataSlice.actions;

export const selectHomePlaylists = (state) => state.homePlaylists;
export const selectDetailPlaylist = (state) => state.detailPlaylist;
export const selectArtistInfo = (state) => state.artistInfo;
export const selectArtistSongs = (state) => state.artistSongs;
export const selectChartHome = (state) => state.chartHome;
export const selectTop100 = (state) => state.top100;
export const selectListMV = (state) => state.listmv;
export const selectDetailMV = (state) => state.detailmv;
export const selectSearchResults = (state) => state.searchResults;
export const selectSong = (state) => state.song;
export const selectSongInfo = (state) => state.songInfo;
export const selectLyric = (state) => state.lyric;

export default dataSlice.reducer;
