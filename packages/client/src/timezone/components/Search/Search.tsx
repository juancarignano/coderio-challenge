import * as React from "react";

import api from "../../api";

import styles from "./Search.module.scss";

interface Props {
  onSelect: (timezone: string) => void;
}

const TimezoneSearch: React.FC<Props> = ({onSelect}) => {
  const [timezones, setTimezones] = React.useState<string[]>([]);
  const [status, setStatus] = React.useState<"pending" | "resolved" | "rejected">("pending");
  const [query, setQuery] = React.useState<string>("");

  function handleSelect(timezone: string) {
    onSelect(timezone);
    setQuery("");
  }

  React.useEffect(() => {
    api
      .list()
      .then(setTimezones)
      .then(() => setStatus("resolved"))
      .catch(() => setStatus("rejected"));
  }, []);

  if (status == "pending") {
    return <input disabled type="text" value="Loading timezones..." />;
  }

  if (status == "rejected") {
    return <input disabled type="text" value="There was an error loading timezones..." />;
  }

  return (
    <div className={styles.container}>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      {timezones.length && query && (
        <section>
          {timezones
            .filter((timezone) => timezone.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 15)
            .map((timezone) => (
              <article key={timezone} onClick={() => handleSelect(timezone)}>
                {timezone}
              </article>
            ))}
        </section>
      )}
    </div>
  );
};

export default TimezoneSearch;
