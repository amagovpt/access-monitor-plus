import { Button, Icon } from "../../../components";
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

export function ButtonsActions() {
  const {t} = useTranslation()
  const [seeDownloads, setSeeDownloads] = useState(false)

  const openDownloadLinks = () => {
    setSeeDownloads(!seeDownloads)
  }

  return (
    <>
      <div className="d-flex flex-row deskGroupMobile right">
          <div>
            <Button
              size="md"
              variant="secondary"
              text={t("RESULTS.actions.download")}
              iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
              onClick={openDownloadLinks}
            />
            {seeDownloads && <div className="dropdown-content show_dropdown">
              <a className="underline" download="eval.csv">CSV</a>
              <a className="underline" download="eval.json">EARL</a>
            </div>}
        </div>
      </div>

      <div className="group_mobile right">
        <div className="firstGroupContainer">
          <div>
            <Button
              size="md"
              variant="secondary"
              text={t("RESULTS.actions.download")}
              iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
              onClick={openDownloadLinks}
            />
            {seeDownloads && <div className="dropdown-content show_dropdown">
              <a className="underline" download="eval.csv">CSV</a>
              <a className="underline" download="eval.json">EARL</a>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}
