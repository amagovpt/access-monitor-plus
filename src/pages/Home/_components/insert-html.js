import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";

import { TextArea, Button, Icon } from 'ama-design-system'

export function InsertHtml() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [htmlValue, setHtmlValue] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const type = "html";
      navigate(`/amp/results/${type}`, {
        state: { contentHtml: htmlValue },
      });
    } catch (error) {
      console.log("Erro", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextArea
        darkTheme={theme}
        id="html"
        label={t("HOME_PAGE.html_label")}
        placeholder={t("HOME_PAGE.html_placeholder")}
        value={htmlValue}
        onChange={(e) => setHtmlValue(e.target.value)}
      />

      <Button
        darkTheme={theme}
        text={t("HOME_PAGE.submit")}
        size="lg"
        id="btn-html"
        disabled={htmlValue === ""}
        type="submit"
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
      />
    </form>
  );
}
