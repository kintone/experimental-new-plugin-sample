const { isMatchPackage } = require("@cybozu/license-manager");

/** @type {import("@cybozu/license-manager/dist/types").Config} */
const config = {
  overrideLicenseText: (dep) => {
    if (isMatchPackage(dep, /^@uiw\/.*/))
      return {
        licensePageUrl: `https://raw.githubusercontent.com/uiwjs/react-codemirror/refs/tags/v${dep.version}/LICENSE`,
      };
  },
  extract: {
    output: "./dist/licenses.txt",
  },
};

module.exports = config;
