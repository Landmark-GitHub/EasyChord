import React, { useState, useEffect } from 'react';
import NotePitch from '../libs/NotePitch';

const Test = () => {
  const [record, setRecord] = useState(false);
  const [frequency, setFrequency] = useState(0);
  const [pitch, setPitch] = useState('');

  const [audioContext, setAudioContext] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {

        const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        const newAnalyser = newAudioContext.createAnalyser();

        setAudioContext(newAudioContext);
        setAnalyser(newAnalyser);
        setMediaStream(stream);

        const source = newAudioContext.createMediaStreamSource(stream);
        source.connect(newAnalyser);
        newAnalyser.connect(newAudioContext.destination);
        
        const updatePitch = () => {

          const bufferLength = newAnalyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          newAnalyser.getByteFrequencyData(dataArray);

          // ในกรณีนี้ความถี่ที่สนใจจะอยู่ในช่วงความถี่ระหว่าง 100Hz ถึง 1000Hz
          const startFrequency = 70;
          const endFrequency = 1000;

          // คำนวณความถี่เฉลี่ยของสัญญาณเสียงในช่วงที่สนใจ
          const startIndex = Math.floor(startFrequency / (newAudioContext.sampleRate / bufferLength));
          const endIndex = Math.floor(endFrequency / (newAudioContext.sampleRate / bufferLength));
          const frequencyData = dataArray.slice(startIndex, endIndex);
          const averageFrequency = frequencyData.reduce((acc, value) => acc + value, 0) / frequencyData.length;

          // ใช้ข้อมูลความถี่เฉลี่ยในการคำนวณค่า Pitch
          // const pitchValue = NotePitch.getPitchFromFrequency(averageFrequency, { concertPitch: 440 });

          setFrequency(averageFrequency.toFixed(2));
          // setPitch(pitchValue);

          console.log(averageFrequency.toFixed(2))
          setTimeout(updatePitch, 1200);
        };

        updatePitch();
        
      })
      .catch((error) => {
        console.error('ไม่สามารถเข้าถึงไมค์: ', error);
      });
  };

  const stopRecording = () => {
    if (audioContext && audioContext.state !== 'closed') {
      mediaStream.getTracks().forEach(track => track.stop());
      audioContext.close().then(() => {
        setRecord(false);
        setFrequency(0);
        setAudioContext(null);
        setAnalyser(null);
        setMediaStream(null);
      });
    }
  };


  useEffect(() => {
    if (record) {
      startRecording();
      console.log('UPdate PP')
      // console.log(frequencies1);
    } else {
      stopRecording();
    }

    return () => {
      stopRecording(); // ยกเลิกการรับค่าเสียงเมื่อคอมโพนีนถูกปิด
    }
  }, [record]);

  return (
    <div className='h-screen flex justify-center items-center'>
      <div className="w-1/2 h-1/2 bg-red-500 p-2">
        <button 
        className='bg-white p-2 rounded-lg'
        onClick={() => setRecord(!record)}>
          {record ? 'หยุด ' : 'เริ่ม '} Turnner
        </button>
        <br />
        <label className='text-5xl'>Frequency: {frequency}</label>
        <br />
        <label className='text-5xl'>Pitch: {pitch}</label>
      </div>
    </div>
  );
};

export default Test;