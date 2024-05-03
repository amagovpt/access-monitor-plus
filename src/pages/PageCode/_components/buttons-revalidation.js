/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Icon } from "../../../components";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export function ButtonsActions({ downloadCSV }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button
          size="md"
          text={t("HEADER.evaluate_new_page")}
          iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
          onClick={() => navigate("/")}
        />

        <div>
          <Button
            size="md"
            id="btn-download-code"
            variant="secondary"
            text={t("RESULTS.actions.download")}
            iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
            onClick={downloadCSV}
            download="eval.csv"
          />
        </div>
      </div>
    </>
  );
}
