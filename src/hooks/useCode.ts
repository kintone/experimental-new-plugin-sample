import { useState } from "react";
import { EXECUTE_SHORTCUT_KEY } from "../constants";

const defaultCode = `// Write your code here.
// Press ${EXECUTE_SHORTCUT_KEY} or Run button to execute.
// You can use console.log to print the output.
// You can use kintone JavaScript API (https://cybozu.dev/ja/kintone/docs/js-api/). 
console.log('Hello, World!');
`;

export const useCode = () => {
  const [code, setCode] = useState(defaultCode);

  return { code, setCode };
};
