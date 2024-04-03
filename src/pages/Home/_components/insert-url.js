import { useState } from "react";

import { Button, Icon, Input } from "../../../components";

import "./styles.css";

import { validateURL } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

export function InsertUrl() {
  const [url, setURL] = useState("");
  const [error, setError] = useState(null);
  const [isDisabled, setIsdisabled] = useState(true);

  const navigate = useNavigate();
  function handleResume() {
    try {
      console.log("URL válida:", url);
      navigate("/resumo");
    } catch (error) {
      setError(null);
    }
  }

  const handleUrlChange = (event) => {
    const value = event.target.value;
    setURL(value);

    if (value === "") {
      setError(null);
      setIsdisabled(true);
    } else if (!validateURL(value)) {
      setError("Insira um URL válido. E.x, http://www.google.com");
      setIsdisabled(true);
    } else {
      setError(null);
      setIsdisabled(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (isDisabled === false) {
        handleResume();
      } else {
        return;
      }
    }
  };

  return (
    <div className="tab_content_view">
      <Input
        id="url"
        label="Enter url here"
        placeholder="Http(s)"
        error={error}
        onChange={handleUrlChange}
        onKeyDown={handleKeyDown}
      />

      <Button
        text="Evaluate"
        size="lg"
        disabled={isDisabled}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
        onClick={handleResume}
      />
    </div>
  );
}
