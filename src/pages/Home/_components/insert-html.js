import { Button, Icon, TextArea } from "../../../components";

export function InsertHtml() {
  return (
    <div className="tab_content_view">
      <TextArea
        id="html"
        label="Insert the HTML code down below"
        placeholder="Insert the HTML code here"
      />

      <Button
        text="Evaluate"
        size="lg"
        disabled={true}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
      />
    </div>
  );
}
