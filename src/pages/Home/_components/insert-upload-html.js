import { Button, Icon, Input } from "../../../components";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function InsertHtmlUpload() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const handleChange = async (event) => {
    const file = event.target.files[0];

    if (file.type === "text/html") {
      const reader = new FileReader();
      reader.onload = async () => {
        const html = reader.result;
        setFile(getDOM(html));
      };
      reader.readAsText(file);
    } else {
      setFile(null);
    }
  };

  async function handleSubmit() {
    try {
      const type = "html";
      navigate(`/amp-react/results/${type}`, {
        state: { contentHtml: file },
      });
    } catch (error) {
      console.log("Erro", error);
    }
  }

  const getDOM = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    return doc.documentElement.outerHTML;
  };

  return (
    <form className="tab_content_view" onSubmit={handleSubmit}>
      <Input
        type="file"
        label={t("HOME_PAGE.url_label")}
        // placeholder="Http(s)"
        id="file"
        accept=".html"
        onChange={handleChange}
        upload={true}
      />

      <Button
        text={t("HOME_PAGE.submit")}
        size="lg"
        id="btn-upload"
        disabled={!file}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
        type="submit"
      />
    </form>
  );
}
