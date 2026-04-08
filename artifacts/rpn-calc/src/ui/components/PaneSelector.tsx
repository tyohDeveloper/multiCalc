import { t } from "../../logic/i18n/t";

interface Pane {
  id: string;
  labelKey: string;
}

interface Props {
  panes: Pane[];
  activePane: string;
  onSelect: (id: string) => void;
}

export function PaneSelector({ panes, activePane, onSelect }: Props) {
  return (
    <div className="pane-selector">
      {panes.map((pane) => (
        <button
          key={pane.id}
          className={`pane-tab${pane.id === activePane ? " pane-tab-active" : ""}`}
          onClick={() => onSelect(pane.id)}
          type="button"
        >
          {t(pane.labelKey)}
        </button>
      ))}
    </div>
  );
}
