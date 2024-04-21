import { useState } from "react";
import { Button, Icon, TextArea } from "../../../components";
import { useNavigate } from "react-router-dom";

export function InsertHtml() {
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
        label="Insert the HTML code down below"
        placeholder="Insert the HTML code here"
        value={htmlValue}
        onChange={(e) => setHtmlValue(e.target.value)}
      />

      <Button
        text="Evaluate"
        size="lg"
        disabled={htmlValue === ""}
        onClick={handleSubmit}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
      />
    </div>
  );
}
