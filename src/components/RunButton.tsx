import type { ComponentProps, FC } from "react";

type RunButtonProps = ComponentProps<"button">;

export const RunButton: FC<RunButtonProps> = (props) => {
  return (
    <button
      type="button"
      className="bg-green-500 rounded-md text-white w-20 h-10 hover:opacity-75 active:opacity-50 focus:outline"
      {...props}
    >
      Run ▶
    </button>
  );
};
