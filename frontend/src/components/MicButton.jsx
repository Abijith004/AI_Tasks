import React, { useState, useRef } from "react";

export default function MicButton({ onTranscribe }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        audioChunks.current = [];
        const formData = new FormData();
        formData.append("file", blob, "audio.webm");

        const res = await fetch("http://localhost:8000/stt", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        onTranscribe(data.text);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Microphone access denied or not available.", err);
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  }

  // ✅ The return statement must be *inside* the function — not at top level
  return (
    <button
      onMouseDown={startRecording}
      onMouseUp={stopRecording}
      onTouchStart={startRecording}
      onTouchEnd={stopRecording}
      className={`mic-btn ${recording ? "active" : ""}`}
    >
      {recording ? "Recording..." : "Hold to Speak"}
    </button>
  );
}
