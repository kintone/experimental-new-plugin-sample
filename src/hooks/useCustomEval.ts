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

  const customEval = useCallback((code: string) => {
    // Replacing `console` method
    const originalConsole = Object.fromEntries(
      consoleMethods.map((method) => {
        const originalMethod = console[method];
        console[method] = (...args) => {
          setExecutedLog((prev) => [...prev, { type: method, payload: args }]);
        };

        return [method, originalMethod];
      })
    );

    // Undo replaced console methods
    const cleanup = () => {
      for (const method of consoleMethods) {
        console[method] = originalConsole[method];
      }
    };

    try {
      // Execute `eval`, and if the result is a `Promise`, execute cleanup with `finally` (to display the logs in the `Promise` as well).
      // biome-ignore lint/security/noGlobalEval:
      const result = window.eval(code);
      if (result instanceof Promise) result.finally(cleanup);
      else cleanup();
    } catch (e) {
      cleanup();
      throw e;
    }
  }, []);

  const execute = useCallback(
    (code: string) => {
      // reset logs
      setExecutedLog([]);

      const handleError = (e: unknown) => {
        if (e instanceof Error) {
          setExecutedLog((prev) => [
            ...prev,
            { type: "exception", payload: e },
          ]);
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
        result = customEval(code);
        setExecutedLog((prev) => [
          ...prev,
          { type: "result", payload: result },
        ]);
      } catch (e) {
        handleError(e);
        return;
      }

      // If the `result` is `Promise`, handle errors in the `catch` block.
      if (result instanceof Promise) result.catch(handleError);
    },
    [customEval]
  );

  return { executedLog, execute };
};
