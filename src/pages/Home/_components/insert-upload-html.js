import { Button, Icon, Input } from "../../../components";

export function InsertHtmlUpload() {
  return (
    <div className="tab_content_view">
      <Input
        type="file"
        label="Enter url here"
        placeholder="Http(s)"
        id="file"
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
