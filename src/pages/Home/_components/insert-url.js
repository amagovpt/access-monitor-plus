import { useState } from "react";
import { Button, Icon, Input } from "../../../components";
import { validateURL } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export function InsertUrl() {
  const [url, setURL] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleUrlChange = (event) => {
    const value = event.target.value;
    setURL(value);
    setError(
      validateURL(value)
        ? null
        : "Insira um URL válido. Ex: http://www.google.com"
    );
  };

  const handleSubmit = () => {
    if (!error) {
      navigate("/resumo", {
        state: { content: removeProtocol(url), type: "url" },
      });
    }
  };

  const removeProtocol = (url) => {
    return url.replace(/^(https?:\/\/)?(www\.)?/, "");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isDisabled()) {
      handleSubmit();
    }
  };

  const isDisabled = () => {
    return !validateURL(url) || !url;
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
        disabled={isDisabled()}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
        onClick={handleSubmit}
      />
    </div>
  );
}
