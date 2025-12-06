import { useState, useEffect, useCallback } from "react";

type StreamStatus = "online" | "offline" | "loading";

interface StreamData {
  status: StreamStatus;
  listeners: number;
  name_audio: string;
  description_audio: string;
}

export const useStreamStatus = (): StreamData => {
  const [status, setStatus] = useState<StreamStatus>("loading");
  const [listeners, setListeners] = useState<number>(0);

  // 1. เพิ่ม State สำหรับเก็บชื่อและรายละเอียด
  const [nameAudio, setNameAudio] = useState<string>("");
  const [descAudio, setDescAudio] = useState<string>("");

  const checkStatus = useCallback(async () => {
    try {
      const res = await fetch("https://สถานีวิทยุศรสินเรดิโอ.com/radio-status");
      const data = await res.json();

      // Icecast JSON structure: data.icestats.source
      const source = data.icestats?.source;

      if (source) {
        // กรณีมีหลาย Mountpoint ให้เอาตัวแรก หรือถ้ามีตัวเดียวก็ใช้เลย
        const currentSource = Array.isArray(source) ? source[0] : source;

        setStatus("online");
        setListeners(currentSource.listeners || 0);

        // 2. อัปเดตข้อมูลลง State (ใช้ ?. เพื่อกัน error ถ้าค่าไม่มี)
        setNameAudio(currentSource.server_name || "Unknown Station");
        setDescAudio(currentSource.server_description || "");
      } else {
        setStatus("offline");
        setListeners(0);
        setNameAudio("");
        setDescAudio("");
      }
    } catch (error) {
      console.error("Stream check failed:", error);
      setStatus("offline");
      setListeners(0);
      setNameAudio("");
      setDescAudio("");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void checkStatus();

    const interval = setInterval(checkStatus, 10000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  // 3. ส่งค่าจาก State ออกไป
  return {
    status,
    listeners,
    name_audio: nameAudio,
    description_audio: descAudio,
  };
};
