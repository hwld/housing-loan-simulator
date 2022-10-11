import { toPng } from "html-to-image";
import { useId, useState } from "react";

export const useDownloadElement = () => {
  const [downloading, setDownloading] = useState(false);

  const downloadId = useId();

  const handleDownload = async () => {
    const element = document.getElementById(downloadId);
    if (!element) {
      return;
    }

    setDownloading(true);
    const imgUrl = await toPng(element);
    setDownloading(false);

    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = "result.png";
    a.click();
  };

  return { downloadId, handleDownload, downloading };
};
