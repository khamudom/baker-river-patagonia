import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./RiverSoundscape.module.css";

interface RiverSound {
  id: string;
  title: string;
  description: string;
  location: string;
  audioUrl: string;
  significance: string;
}

const riverSounds: RiverSound[] = [
  {
    id: "guardian-rapid",
    title: "The Guardian Rapid",
    description:
      "A deep rumbling section that local guides use to predict weather patterns",
    location: "Upper Baker River",
    audioUrl: "/sounds/guardian-rapid.mp3",
    significance: "Weather Prediction",
  },
  {
    id: "ancient-crossing",
    title: "Ancient Crossing Point",
    description:
      "The rhythmic flow where indigenous communities have crossed for generations",
    location: "Middle Basin",
    audioUrl: "/sounds/ancient-crossing.mp3",
    significance: "Cultural Heritage",
  },
];

export const RiverSoundscape = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const audioContext = useRef<AudioContext>();
  const analyserNode = useRef<AnalyserNode>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    audioContext.current = new AudioContext();
    analyserNode.current = audioContext.current.createAnalyser();
    analyserNode.current.fftSize = 2048;

    return () => {
      audioContext.current?.close();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const drawWaveform = (dataArray: Uint8Array, bufferLength: number) => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);
      analyserNode.current?.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "rgb(20, 20, 20)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#4ECDC4";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    draw();
  };

  const playSound = async (sound: RiverSound) => {
    if (!audioContext.current || !analyserNode.current) return;

    if (activeSound === sound.id) {
      setActiveSound(null);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    setActiveSound(sound.id);

    try {
      const response = await fetch(sound.audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.current.decodeAudioData(
        arrayBuffer
      );

      const sourceNode = audioContext.current.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.connect(analyserNode.current);
      analyserNode.current.connect(audioContext.current.destination);

      const bufferLength = analyserNode.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      sourceNode.start(0);
      drawWaveform(dataArray, bufferLength);

      sourceNode.onended = () => {
        setActiveSound(null);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    } catch (error) {
      console.error("Error playing sound:", error);
      setActiveSound(null);
    }
  };

  return (
    <section className={styles.soundscape}>
      <h2 className={styles.title}>The River's Voice</h2>
      <p className={styles.subtitle}>
        Click to hear the Baker's ancient language
      </p>

      <canvas
        ref={canvasRef}
        className={styles.visualizer}
        width={800}
        height={200}
      />

      <div className={styles.soundGrid}>
        {riverSounds.map((sound) => (
          <button
            key={sound.id}
            className={`${styles.soundCard} ${
              activeSound === sound.id ? styles.active : ""
            }`}
            onClick={() => playSound(sound)}
          >
            <h3>{sound.title}</h3>
            <p className={styles.location}>{sound.location}</p>
            <p className={styles.description}>{sound.description}</p>
            <span className={styles.significance}>{sound.significance}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default RiverSoundscape;
