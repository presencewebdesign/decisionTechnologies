const baseUrl = "http://localhost:3000";

class ApiClient {
  getDeals() {
    return fetch(baseUrl + "/deals")
      .then(response => response.json())
      .then(data => data);
  }
}

export default ApiClient;
