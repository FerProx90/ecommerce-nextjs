import { ENV } from "@/utils";

export class Auth {
  async register(data) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.REGISTER}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    return this.fetchData(url, params);
  }

  async login(data) {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.AUTH.LOGIN}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return this.fetchData(url, params);
  }

  async fetchData(url, paramsUrl) {
    const resultQuery = {
      status: "",
      errorMessage: "",
      dataQuery: "",
    };
    try {
      const response = await fetch(url, paramsUrl);
      const result = await response.json();

      if (response.status !== 200) throw result;

      resultQuery.status = response.status;
      resultQuery.dataQuery = result;
      return resultQuery;
    } catch (error) {
      resultQuery.status = 400;
      if (error.hasOwnProperty("error")) {
        const {
          error: { message },
        } = error;
        resultQuery.errorMessage = message;
        return resultQuery;
      }
      console.log("auth error:", error);
      return resultQuery;
    }
  }
}
