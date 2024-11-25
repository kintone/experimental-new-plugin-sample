import { acceptCompletion } from "@codemirror/autocomplete";
import { indentWithTab } from "@codemirror/commands";
import {
  javascript,
  javascriptLanguage,
  scopeCompletionSource,
} from "@codemirror/lang-javascript";
import { keymap } from "@codemirror/view";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { type FC, useMemo } from "react";
import { EXECUTE_SHORTCUT_KEY } from "../constants";

const baseExtensions = [
  keymap.of([
    {
      key: "Tab",
      run: acceptCompletion,
    },
    indentWithTab,
  ]),
  javascript(),
  javascriptLanguage.data.of({
    autocomplete: scopeCompletionSource(globalThis),
  }),
];

type EditorProps = {
  code: string;
  onChange: (code: string) => void;
  execute: (code: string) => void;
};

export const Editor: FC<EditorProps> = ({ code, onChange, execute }) => {
  const extensions = useMemo(() => {
    return [
      ...baseExtensions,
      keymap.of([
        {
          // Ctrl + Enter to execute
          key: EXECUTE_SHORTCUT_KEY,
          run: () => {
            execute(code);
            return true;
          },
        },
      ]),
    ];
  }, [execute, code]);

  return (
    <CodeMirror
      value={code}
      height="500px"
      extensions={extensions}
      theme={vscodeDark}
      onChange={onChange}
      // Disable default indentWithTab because it conflicts with key bindings that confirm completion with the Tab key.
      indentWithTab={false}
    />
  );
};
