import axios from '../utils/axios';

export const getHomeData = async () => {
  try {
    const response = await axios.get('/home');
    return { ...response, success: true };
  } catch (error) {
    return error.response
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getDetailPlaylist = async (playlistId) => {
  try {
    const response = await axios.get('/detailplaylist', {
      params: {
        id: playlistId,
      },
    });
    return { data: response, success: true };
  } catch (error) {
    return error.response
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getArtistInfo = async (artistName) => {
  try {
    const response = await axios.get('/artist', {
      params: {
        name: artistName,
      },
    });
    return { data: response, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getArtistSongs = async ({ id, page, count }) => {
  try {
    const response = await axios.get('/artistsong', {
      params: {
        id: id,
        page: page,
        count: count,
      },
    });
    return { ...response, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getChartHome = async () => {
  try {
    const response = await axios.get('/charthome');
    return { ...response.RTChart, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getTop100 = async () => {
  try {
    const response = await axios.get('/top100');
    return { items: response, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getListMV = async (page) => {
  try {
    const response = await axios.get('/listmv', {
      params: {
        id: 'IWZ9Z08I',
        page: page,
        count: 20,
      },
    });
    return { ...response, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getDetailMV = async (mvId) => {
  try {
    const response = await axios.get('/video', {
      params: {
        id: mvId,
      },
    });
    console.log(response);
    return { ...response, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getSearchResults = async (keyword) => {
  try {
    const response = await axios.get('/search', {
      params: {
        keyword: keyword,
      },
    });
    return { ...response, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getSong = async (id) => {
  try {
    const response = await axios.get('/song', {
      params: {
        id: id,
      },
    });
    console.log(response);
    return { mp3: response['128'], success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getSongInfo = async (id) => {
  try {
    const response = await axios.get('/infosong', {
      params: {
        id: id,
      },
    });
    return { ...response, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};

export const getLyric = async (id) => {
  try {
    const response = await axios.get('/lyric', {
      params: {
        id: id,
      },
    });
    return { ...response, success: true };
  } catch (error) {
    return error.message
      ? error.response.data
      : { success: false, error: error.message };
  }
};
