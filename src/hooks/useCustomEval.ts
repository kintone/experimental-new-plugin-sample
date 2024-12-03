import { useCallback, useState } from "react";

const consoleMethods = ["log", "error", "warn", "info", "debug"] as const;

export type CustomEvalLog =
  | {
      type: (typeof consoleMethods)[number];
      payload: unknown[];
    }
  | { type: "result"; payload: unknown }
  | { type: "exception"; payload: Error };

export const useCustomEval = () => {
  const [executedLog, setExecutedLog] = useState<CustomEvalLog[]>([]);

  const customEval = useCallback(async (code: string) => {
    // Replacing `console` method
    const originalConsole = Object.fromEntries(
      consoleMethods.map((method) => {
        const originalMethod = console[method];
        console[method] = (...args) => {
          setExecutedLog((prev) => [...prev, { type: method, payload: args }]);
        };

        return [method, originalMethod];
      }),
    );

    // Undo replaced console methods
    const cleanup = () => {
      for (const method of consoleMethods) {
        console[method] = originalConsole[method];
      }
    };

    try {
      // biome-ignore lint/security/noGlobalEval:
      await window.eval(code);
      cleanup();
    } catch (e) {
      cleanup();
      throw e;
    }
  }, []);

  const execute = useCallback(
    async (code: string) => {
      // reset logs
      setExecutedLog([]);

      const handleError = (e: unknown) => {
        if (e instanceof Error) {
          setExecutedLog((prev) => [...prev, { type: "exception", payload: e }]);
          return;
        }
        setExecutedLog((prev) => [
          ...prev,
          {
            type: "error",
            payload: ["See DevTools console for error message."],
          },
        ]);

        throw e;
      };

      let result: unknown;
      try {
        result = await customEval(code);
        setExecutedLog((prev) => [...prev, { type: "result", payload: result }]);
      } catch (e) {
        handleError(e);
        throw e;
      }
    },
    [customEval],
  );

  return { executedLog, execute };
};
