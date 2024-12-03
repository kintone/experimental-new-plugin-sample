import type { FC } from "react";
import type { CustomEvalLog } from "../hooks/useCustomEval";

export const ResultDisplayArea: FC<{ logs: CustomEvalLog[] }> = ({ logs }) => {
  return (
    <div className="space-y-0.5 p-1 font-mono">
      {logs.map((log, index) =>
        log.type === "result" ? (
          <Result key={index} payload={log.payload} />
        ) : log.type === "error" || log.type === "exception" ? (
          <Danger key={index} payload={log.payload} />
        ) : log.type === "warn" ? (
          <Warning key={index} payload={log.payload} />
        ) : (
          <Log key={index} payload={log.payload} />
        ),
      )}
    </div>
  );
};

const Danger: FC<{ payload: unknown[] | Error }> = ({ payload }) => {
  return (
    <div className="bg-red-100 text-red-700 border-b rounded-md p-1 flex gap-4">
      {(payload instanceof Error ? [payload] : payload).map((item, index) => (
        <Inner key={index} payload={item} />
      ))}
    </div>
  );
};

const Warning: FC<{ payload: unknown[] }> = ({ payload }) => {
  return (
    <div className="bg-yellow-100 text-yellow-700 border-b rounded-md p-1 flex gap-4">
      {payload.map((item, index) => (
        <Inner key={index} payload={item} />
      ))}
    </div>
  );
};

const Result: FC<{ payload: unknown }> = ({ payload }) => {
  return (
    <div className="text-green-500 border-b p-1">
      <span className="mr-1 select-none text-gray-600">{">> "}</span>
      <Inner payload={payload} />
    </div>
  );
};

const Log: FC<{ payload: unknown[] }> = ({ payload }) => {
  return (
    <div className="text-slate-800 border-b p-1 flex gap-4">
      {payload.map((item, index) => (
        <Inner key={index} payload={item} />
      ))}
    </div>
  );
};

const Inner: FC<{ payload: unknown }> = ({ payload }) => {
  if (isPrimitive(payload)) return <span>{String(payload)}</span>;

  if (isError(payload)) return <pre>{`Error: ${payload.message}`}</pre>;

  if (isElement(payload)) return <span>{payload.outerHTML}</span>;

  if (jsonStringifiable(payload) && hasConstructorName(payload))
    return <pre>{`${payload.constructor.name}: ${JSON.stringify(payload, null, 2)}`}</pre>;

  return <span>{String(payload)}</span>;
};

const isPrimitive = (value: unknown): value is string | number | boolean | null | undefined =>
  value === null || value === undefined || typeof value !== "object";

const jsonStringifiable = (value: unknown): boolean => {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
};

const hasConstructorName = (value: unknown): value is { constructor: { name: string } } =>
  typeof (value as { constructor: { name: string } })?.constructor?.name === "string";

const isElement = (value: unknown): value is HTMLElement => value instanceof HTMLElement;

const isError = (value: unknown): value is Error => value instanceof Error;
