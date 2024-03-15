import { Button, Icon } from "../../../components";

export function ButtonsActions() {
  return (
    <div className="d-flex flex-row justify-content-between">
      <Button
        size="md"
        text="Avaliar nova página"
        iconRight={<Icon name="AMA-Setaoficial-Solid" />}
      />

      <div className="d-flex flex-row gap-3">
        <Button
          size="md"
          variant="secondary"
          text="Re-avaliar a página"
          iconRight={<Icon name="AMA-Reload-Line" />}
        />

        <Button
          size="md"
          variant="secondary"
          text="Ver página"
          iconRight={<Icon name="AMA-Code-Line" />}
        />

        <Button
          size="md"
          variant="secondary"
          text="Descarregar dados"
          iconRight={<Icon name="AMA-download-Line" />}
        />
      </div>
    </div>
  );
}
