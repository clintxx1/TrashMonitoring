const auth = {
  isAuthenticated() {
    return this.getUserInfo();
  },
  storeToken(token:string) {
    localStorage.setItem("token", token);
  },
  getToken() {
    return localStorage.getItem("token");
  },
  getExpiration() {
    const token = this.getToken();
    if (token) {
      const decodedData = this.decode(token);
      return decodedData.exp;
    }
    return 0;
  },
  getUserInfo() {
    const token = this.getToken();
    if (token) {
      const decodedData = this.decode(token);
      return decodedData;
    }
    return null;
  },
  decode(token:string) {
    let base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(window.atob(base64));
  },
  async login(credential:any) {
    return await fetch(`${import.meta.env.VITE_APP_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(credential),
    });
  },
  register(data:any) {
    //TODO - fix API to combine both admin and student
    return fetch(`${import.meta.env.VITE_APP_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
    });
  },
  clear() {
    localStorage.clear();
    window.location.reload();
  },
};

export default auth;
