import { toPng } from "html-to-image";
import { useId } from "react";

export const useDownloadElement = () => {
  const downloadId = useId();
  const handleDownload = async () => {
    const element = document.getElementById(downloadId);
    if (!element) {
      return;
    }

    const imgUrl = await toPng(element);
    const a = document.createElement("a");
    a.href = imgUrl;
    a.download = "result.png";
    a.click();
  };

  return { downloadId, handleDownload };
};
