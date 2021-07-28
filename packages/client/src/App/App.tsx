import * as React from "react";

import logo from "../assets/logo.svg";
import TimezoneCard from "../timezone/components/Card";
import TimezoneSearch from "../timezone/components/Search/Search";

import styles from "./App.module.scss";

const App: React.FC = () => {
  const [timezones, setTimezones] = React.useState<string[]>([
    "America/Argentina/Salta",
    "America/Argentina/Cordoba",
    "America/Argentina/Jujuy",
  ]);

  function handleAdd(timezone: string) {
    setTimezones((timezones) => timezones.concat(timezone));
  }

  function handleRemove(timezone: string) {
    setTimezones((timezones) => timezones.filter((_timezone) => _timezone != timezone));
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>
          <img alt="Coderio" src={logo} width={320} />
        </h1>
        <h3>Lets get this party started</h3>
      </header>
      <TimezoneSearch onSelect={handleAdd} />
      <section className={styles.grid}>
        {timezones.map((timezone) => (
          <TimezoneCard key={timezone} timezone={timezone} onClose={handleRemove} />
        ))}
      </section>
    </main>
  );
};

export default App;
