import axios from "axios";

const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "a4a4856094024a888502b10c37bd5056";
const redirectUri = 'https://spotify-changed-clone.netlify.app';
const scopes = ["user-read-playback-state","user-library-read", "playlist-read-private", "user-read-currently-playing", 'user-modify-playback-state'];

export const loginEndpoint = `${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

const apiClient = axios.create({
  baseURL: "https://api.spotify.com/v1/",
});

export const setClientToken = (token) => {
  apiClient.interceptors.request.use(async function (config) {
    config.headers.Authorization = "Bearer " + token;
    return config;
  });
};


export default apiClient;
