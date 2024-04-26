import { useState } from "react";
import { Button, Icon, TextArea } from "../../../components";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export function InsertHtml() {
  const { t } = useTranslation();
  const [htmlValue, setHtmlValue] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      navigate("/resumo", { state: { content: htmlValue, type: "html" } });
    } catch (error) {
      console.log("Erro", error);
    }
  }

  return (
    <div className="tab_content_view">
      <TextArea
        id="html"
        label={t("HOME_PAGE.html_label")}
        placeholder={t("HOME_PAGE.html_placeholder")}
        value={htmlValue}
        onChange={(e) => setHtmlValue(e.target.value)}
      />

      <Button
        text={t("HOME_PAGE.submit")}
        size="lg"
        id="btn-html"
        disabled={htmlValue === ""}
        onClick={handleSubmit}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
      />
    </div>
  );
}
