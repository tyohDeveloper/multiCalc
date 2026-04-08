import { useState } from "react";
import { PaneSelector } from "./components/PaneSelector";
import { HP48Calculator } from "./calculators/HP48Calculator";

const PANES = [{ id: "hp48", labelKey: "calculator-hp48" }];

export function App() {
  const [activePane, setActivePane] = useState("hp48");
  return (
    <div className="app-root">
      <PaneSelector panes={PANES} activePane={activePane} onSelect={setActivePane} />
      {activePane === "hp48" && <HP48Calculator />}
    </div>
  );
}
