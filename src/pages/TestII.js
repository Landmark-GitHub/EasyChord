import React, { useEffect, useRef } from 'react';

const TestII = () => {
  const microphone = useRef(null);
  const canvas = useRef(null);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const microphoneNode = audioContext.createMediaStreamSource(stream);
        microphoneNode.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);

        const canvasCtx = canvas.current.getContext('2d');

        const draw = () => {
          analyser.getByteFrequencyData(dataArray);
          canvasCtx.clearRect(0, 0, canvas.current.width, canvas.current.height);

          const barWidth = (canvas.current.width / bufferLength) * 2;
          let x = 0;

          dataArray.forEach((value) => {
            const barHeight = (value / 256) * canvas.current.height;
            canvasCtx.fillStyle = `rgb(50, 50, ${value + 100})`;
            canvasCtx.fillRect(x, canvas.current.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
          });

          requestAnimationFrame(draw);
        };

        draw();
      })
      .catch((error) => {
        console.error('Error accessing microphone:', error);
      });
  }, []);

  return (
    <div>
      <h1>Frequency</h1>
      <canvas ref={canvas} width="400" height="200" />
    </div>
  );
};

export default TestII;
