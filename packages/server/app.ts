import * as express from "express";
import * as cors from "cors";
import axios from "axios";

import {PORT, API_URL} from "./constants";
import {Timezone} from "./types";

const app = express();

app.use(cors());

app.get("/timezones", async (req: express.Request, res: express.Response) => {
  const timezones = await axios.get<string[]>(`${API_URL}/timezone`).then((res) => res.data);
  return res.json(timezones);
});

app.get("/timezones/:name", async (req: express.Request, res: express.Response) => {
  const timezone = await axios
    .get<Timezone>(`${API_URL}/timezone/${req.params.name}`)
    .then((res) => res.data);
  return res.json(timezone);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
