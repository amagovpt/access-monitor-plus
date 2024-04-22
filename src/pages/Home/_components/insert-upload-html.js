import { Button, Icon, Input } from "../../../components";
import { useTranslation } from "react-i18next"

export function InsertHtmlUpload() {
  const {t} = useTranslation()
  return (
    <div className="tab_content_view">
      <Input
        type="file"
        label={t("HOME_PAGE.url_label")}
        placeholder="Http(s)"
        id="file"
      />

      <Button
        text={t("HOME_PAGE.submit")}
        size="lg"
        disabled={true}
        iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
      />
    </div>
  );
}
