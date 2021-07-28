import * as React from "react";

import api from "../../api";
import {Timezone} from "../../types";

import styles from "./Card.module.scss";

interface Props {
  timezone: string;
  onClose?: (timezone: string) => void;
}

const TimezoneCard: React.FC<Props> = ({timezone, onClose}) => {
  const [data, setData] = React.useState<Timezone | null>(null);
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending");

  React.useEffect(() => {
    api
      .fetch(timezone)
      .then(setData)
      .then(() => setStatus("resolved"))
      .catch(() => setStatus("rejected"));
  }, [timezone]);

  return (
    <div className={styles.container}>
      <h3>{timezone}</h3>
      {onClose && <button onClick={() => onClose(timezone)}>X</button>}
      {status == "pending" && <span>Loading...</span>}
      {status == "rejected" && <span>Something failed...</span>}
      {status == "resolved" && data && <h4>{new Date(data.datetime).toString()}</h4>}
    </div>
  );
};

export default TimezoneCard;
