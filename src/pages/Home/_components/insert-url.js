import { useState } from "react";
import { validateURL } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useTranslation } from "react-i18next";

import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import { Button, Icon, Input } from 'ama-design-system'

export function InsertUrl() {
  const [url, setURL] = useState("");
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleUrlChange = (event) => {
    const value = event.target.value;
    setURL(value);
    setError(validateURL(value) ? null : t("HOME_PAGE.url_error"));
  };

  const handleSubmit = () => {
    if (!error) {
      const encodedURL = encodeURIComponent(url);
      navigate(`/amp/results/${encodedURL}`);
    }
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
    <form onSubmit={handleSubmit}>
      <Input
        darkTheme={theme}
        id="url"
        label={t("HOME_PAGE.url_label")}
        placeholder="http(s)"
        type="url"
        error={error}
        onChange={handleUrlChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        darkTheme={theme}
        text={t("HOME_PAGE.submit")}
        size="lg"
        id="btn-url"
        disabled={isDisabled()}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
        type="submit"
      />
    </form>
  );
}
