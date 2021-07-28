import axios from "axios";

import {Timezone} from "./types";

const API_URL = `http://localhost:5000`;

export default {
  list: (): Promise<string[]> =>
    axios.get<string[]>(`${API_URL}/timezones`).then((res) => res.data),
  fetch: (timezone: string): Promise<Timezone> =>
    axios
      .get<Timezone>(`${API_URL}/timezones/${encodeURIComponent(timezone)}`)
      .then((res) => res.data),
};
