import { useNavigate } from "react-router-dom";
import { Button, Icon, Input } from "../../../components";

import "./styles.css";

export function InsertUrl() {
  const navigate = useNavigate();
  return (
    <div className="tab_content_view">
      <Input label="Enter url here" placeholder="Http(s)" />

      <Button
        text="Evaluate"
        size="lg"
        disabled={false}
        iconRight={<Icon name="AMA-Setaoficial-Solid" />}
        onClick={() => navigate("/resumo")}
      />
    </div>
  );
}
