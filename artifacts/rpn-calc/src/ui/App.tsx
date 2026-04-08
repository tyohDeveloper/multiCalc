import { useState } from "react";
import { PaneSelector } from "./components/PaneSelector";
import { HP48Calculator } from "./calculators/HP48Calculator";
import type { ComponentType } from "react";

const PANES = [{ id: "hp48", labelKey: "calculator-hp48" }];

const PANE_COMPONENTS: Record<string, ComponentType> = {
  hp48: HP48Calculator,
};

export function App() {
  const [activePane, setActivePane] = useState("hp48");
  const PaneComponent = PANE_COMPONENTS[activePane] ?? null;
  return (
    <div className="app-root">
      <PaneSelector panes={PANES} activePane={activePane} onSelect={setActivePane} />
      {PaneComponent && <PaneComponent />}
    </div>
  );
}
