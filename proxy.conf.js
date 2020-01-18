const PROXY_CONFIG = [{
  context: [
    "/api.html",
    "/solutions"
  ],
  target: "http://localhost:8080",
  secure: false,
  changeOrigin: false
}];

module.exports = PROXY_CONFIG;
