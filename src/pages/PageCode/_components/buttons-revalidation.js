import { Button, Icon } from "../../../components";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ButtonsActions() {
  const { t } = useTranslation();
  const [seeDownloads, setSeeDownloads] = useState(false);

  const openDownloadLinks = () => {
    setSeeDownloads(!seeDownloads);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          size="md"
          id="btn-download-code"
          variant="secondary"
          text={t("RESULTS.actions.download")}
          iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
          onClick={openDownloadLinks}
        />
      </div>
    </>
  );
}
