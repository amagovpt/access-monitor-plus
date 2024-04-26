import { useState } from "react";
import { Button, Icon, Input } from "../../../components";
import { validateURL } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { useTranslation } from "react-i18next";

export function InsertUrl() {
  const [url, setURL] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleUrlChange = (event) => {
    const value = event.target.value;
    setURL(value);
    setError(validateURL(value) ? null : t("HOME_PAGE.url_error"));
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
        label={t("HOME_PAGE.url_label")}
        placeholder="http(s)"
        type="url"
        error={error}
        onChange={handleUrlChange}
        onKeyDown={handleKeyDown}
      />
      <Button
        text={t("HOME_PAGE.submit")}
        size="lg"
        id="btn-url"
        disabled={isDisabled()}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
        onClick={handleSubmit}
      />
    </div>
  );
}
