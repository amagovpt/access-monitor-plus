import { Button, Icon } from "../../../components";
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import { useState } from 'react'

export function ButtonsActions({dataProcess, pageCode, downloadCSV}) {
  const {t} = useTranslation()
  const navigate = useNavigate();
  const [seePage, setSeePage] = useState(false)
  const [seeDownloads, setSeeDownloads] = useState(false)
  
  const openPageLinks = () => {
    setSeePage(!seePage)
    setSeeDownloads(false)
  }

  const openDownloadLinks = () => {
    setSeePage(false)
    setSeeDownloads(!seeDownloads)
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-between deskGroupMobile">
        <Button
          size="md"
          text={t("HEADER.evaluate_new_page")}
          iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
          onClick={() => navigate("/")}
        />

        <div className="d-flex flex-row gap-3">
          <Button
            size="md"
            variant="secondary"
            text={t("RESULTS.actions.re_evaluate")}
            iconRight={<Icon name="AMA-Reload-Line" />}
            onClick={() => navigate("/resumo", { state: { content: dataProcess?.metadata?.url, type: "html" } })}
          />

          <div>
            <Button
              size="md"
              variant="secondary"
              text={t("RESULTS.actions.see_page")}
              iconRight={<Icon name="AMA-Code-Line" />}
              onClick={openPageLinks}
            />
            {seePage && <div className="dropdown-content show_dropdown">
              <a className="underline" onClick={() => navigate("/resumo/code", { state: { content: dataProcess, code: pageCode } })}>{t("RESULTS.actions.pagecode")}</a>
              <a className="underline" target="_blank" href="https://www.google.pt/">{t("RESULTS.actions.open_webpage")}</a>
            </div>}
          </div>

          <div>
            <Button
              size="md"
              variant="secondary"
              text={t("RESULTS.actions.download")}
              iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
              onClick={openDownloadLinks}
            />
            {seeDownloads && <div className="dropdown-content show_dropdown">
              <a className="underline" onClick={downloadCSV} download="eval.csv">CSV</a>
              <a className="underline" download="eval.json">EARL</a>
            </div>}
          </div>
        </div>
      </div>

      <div className="group_mobile">
        <div className="firstGroupContainer">
          <Button
            size="md"
            text={t("HEADER.evaluate_new_page")}
            iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
            onClick={() => navigate("/")}
          />

          <div>
            <Button
              size="md"
              variant="secondary"
              text={t("RESULTS.actions.see_page")}
              iconRight={<Icon name="AMA-Code-Line" />}
              onClick={openPageLinks}
            />
            {seePage && <div className="dropdown-content show_dropdown">
              <a className="underline" onClick={() => navigate("/resumo/code", { state: { content: dataProcess, code: pageCode } })}>{t("RESULTS.actions.pagecode")}</a>
              <a className="underline" target="_blank" href="https://www.google.pt/">{t("RESULTS.actions.open_webpage")}</a>
            </div>}
          </div>
        </div>

        <div className="secondGroupContainer">
          <Button
            size="md"
            variant="secondary"
            text={t("RESULTS.actions.re_evaluate")}
            iconRight={<Icon name="AMA-Reload-Line" />}
            onClick={() => navigate("/resumo", { state: { content: dataProcess?.metadata?.url, type: "html" } })}
          />

          <div>
            <Button
              size="md"
              variant="secondary"
              text={t("RESULTS.actions.download")}
              iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
              onClick={openDownloadLinks}
            />
            {seeDownloads && <div className="dropdown-content show_dropdown">
              <a className="underline" onClick={downloadCSV} download="eval.csv">CSV</a>
              <a className="underline" download="eval.json">EARL</a>
            </div>}
          </div>
        </div>
      </div>
    </>
  );
}
