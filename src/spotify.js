import axios from "axios";



const authEndpoint = "https://accounts.spotify.com/authorize?";
const clientId = "b8ba0c290b154b059f0d37f8d2ab20ca";
const redirectUri = "http://localhost:3000";
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