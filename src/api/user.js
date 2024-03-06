import { ENV, authFetch } from "@/utils";

export class User {
  async getMe() {
    const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USERS_ME}`;

    try {
      const response = await authFetch(url);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      console.error("class user getMe error:", error);
    }
  }
}
