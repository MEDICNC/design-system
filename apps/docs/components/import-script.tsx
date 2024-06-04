import React from "react";
import Script from "next/script";
import { promises as fs } from "fs";

const ImportScript = async () => {
  if (process.env.NEXT_PUBLIC_SERVER_TYPE === "development") {
    const scriptFile = await fs.readFile(
      "../uikit/dist/js/uikit-core.min.js",
      "utf8",
    );
    const iconScriptFile = await fs.readFile(
      "../uikit/dist/js/uikit-icons.min.js",
      "utf8",
    );

    return (
      <>
        <Script>{scriptFile}</Script>
        <Script>{iconScriptFile}</Script>
      </>
    );
  } else {
    return (
      <>
        <Script src="https://cdn.jsdelivr.net/gh/MEDICNC/design-system@main/apps/uikit/dist/js/uikit-core.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/gh/MEDICNC/design-system@main/apps/uikit/dist/js/uikit-icons.min.js"></Script>
      </>
    );
  }
};

export default ImportScript;
