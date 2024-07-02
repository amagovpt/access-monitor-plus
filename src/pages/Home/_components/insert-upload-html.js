import { Button, Icon } from "../../../components";
import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export function InsertHtmlUpload() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger a click event on the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
      navigate(`/amp/results/${type}`, {
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
      <label className="margin-bottom">{t("HOME_PAGE.file_title")}</label>
      <div className="input-group mb-3 d-flex justify-content-start align-items-start">
        <button className="btn" type="button" onClick={handleButtonClick}>
          {t("HOME_PAGE.file_label")}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          className="form-control"
          aria-label="Upload"
          onChange={handleChange}
        />
      </div>

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
