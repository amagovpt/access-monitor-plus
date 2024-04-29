/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon } from "../../../components";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ButtonsActions({ downloadCSV }) {
  const { t } = useTranslation();
  const [seeDownloads, setSeeDownloads] = useState(false);

  const openDownloadLinks = () => {
    setSeeDownloads(!seeDownloads);
  };

  return (
    <>
      <div className="d-flex justify-content-end">
        <div>
          <Button
            size="md"
            id="btn-download-code"
            variant="secondary"
            text={t("RESULTS.actions.download")}
            iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
            onClick={openDownloadLinks}
          />
          {seeDownloads && (
            <div className="dropdown-content show_dropdown">
              <a
                className="underline"
                onClick={downloadCSV}
                download="eval.csv"
              >
                CSV
              </a>
              <a className="underline" download="eval.json">
                EARL
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
