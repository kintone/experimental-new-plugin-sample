import { Editor } from "./components/Editor";
import { ResultDisplayArea } from "./components/ResultDisplayArea";
import { RunButton } from "./components/RunButton";
import { EXECUTE_SHORTCUT_KEY } from "./constants";
import { useCode } from "./hooks/useCode";
import { useCustomEval } from "./hooks/useCustomEval";

export const App = () => {
  const { code, setCode } = useCode();
  const { execute, executedLog } = useCustomEval();

  return (
    <div className="flex">
      <div className="flex-1 relative max-w-4xl">
        <Editor code={code} onChange={setCode} execute={execute} />
        <div className="absolute right-2 bottom-2">
          <RunButton
            title={EXECUTE_SHORTCUT_KEY}
            onClick={(e) => {
              e.stopPropagation();
              execute(code);
            }}
          />
        </div>
      </div>
      <div className="flex-1 overflow-scroll h-[500px]">
        <ResultDisplayArea logs={executedLog} />
      </div>
    </div>
  );
};
