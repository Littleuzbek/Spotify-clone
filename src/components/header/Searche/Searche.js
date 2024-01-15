import { useState } from "react";
import classes from "./Searche.module.css";
import SearcheField from "./SearcheField";
import SearcheResults from "./searcheResults/SearcheResults";

const Searche = () => {
  const [key, setKey] = useState("");
  try {
    return (
      <div className={classes.searche}>
        <SearcheField setKey={setKey} />

        {key && <SearcheResults searcheKey={key} />}

        {key || <h1>Browse all</h1>}
      </div>
    );
  } catch (err) {
    window.location.reload();
  }
};

export default Searche;
