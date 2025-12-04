import { useState, useEffect, useCallback } from "react";

type StreamStatus = "online" | "offline" | "loading";

interface StreamData {
  status: StreamStatus;
  listeners: number;
}

export const useStreamStatus = (): StreamData => {
  const [status, setStatus] = useState<StreamStatus>("loading");
  const [listeners, setListeners] = useState<number>(0);

  const checkStatus = useCallback(async () => {
    try {
      // หมายเหตุ: ถ้าเว็บหลักเป็น HTTPS แต่ Icecast เป็น HTTP อาจจะติด Mixed Content
      const res = await fetch("http://3.236.202.167:8000/status-json.xsl");
      const data = await res.json();

      // Icecast บางที return source เป็น array หรือ object ต้องเช็คให้ดี
      const source = data.icestats?.source;

      // ถ้ามี Source แปลว่า Online
      if (source) {
        // กรณีมีหลาย Mountpoint ให้เอาตัวแรก หรือถ้ามีตัวเดียวก็ใช้เลย
        const currentSource = Array.isArray(source) ? source[0] : source;

        setStatus("online");
        setListeners(currentSource.listeners || 0);
      } else {
        setStatus("offline");
        setListeners(0); // Reset listeners if offline
      }
    } catch (error) {
      console.error("Stream check failed:", error);
      setStatus("offline");
      setListeners(0); // Reset listeners on error
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void checkStatus();

    // ตั้งเวลาให้เช็คสถานะใหม่ทุกๆ 10 วินาที
    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  return { status, listeners };
};
