import { Button, Icon } from "../../../components";
import { useTranslation } from "react-i18next"

export function ButtonsActions() {
  const {t} = useTranslation()

  return (
    <>
      <div className="d-flex flex-row justify-content-between deskGroupMobile">
        <Button
          size="md"
          text={t("HEADER.evaluate_new_page")}
          iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
        />

        <div className="d-flex flex-row gap-3">
          <Button
            size="md"
            variant="secondary"
            text={t("RESULTS.actions.re_evaluate")}
            iconRight={<Icon name="AMA-Reload-Line" />}
          />

          <Button
            size="md"
            variant="secondary"
            text={t("RESULTS.actions.see_page")}
            iconRight={<Icon name="AMA-Code-Line" />}
          />

          <Button
            size="md"
            variant="secondary"
            text={t("RESULTS.actions.download")}
            iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
          />
        </div>
      </div>

      <div className="group_mobile">
        <div className="firstGroupContainer">
          <Button
            size="md"
            text={t("HEADER.evaluate_new_page")}
            iconRight={<Icon name="AMA-Setalongaoficial-Line" />}
          />

          <Button
            size="md"
            variant="secondary"
            text={t("RESULTS.actions.see_page")}
            iconRight={<Icon name="AMA-Code-Line" />}
          />
        </div>

        <div className="secondGroupContainer">
          <Button
            size="md"
            variant="secondary"
            text={t("RESULTS.actions.re_evaluate")}
            iconRight={<Icon name="AMA-Reload-Line" />}
          />

          <Button
            size="md"
            variant="secondary"
            text={t("RESULTS.actions.download")}
            iconRight={<Icon name="AMA-DownloadSetacurta-Line" />}
          />
        </div>
      </div>
    </>
  );
}
