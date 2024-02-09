import { React, useState, useEffect } from 'react';
import AudioContext from "../contexts/AudioContext";
import autoCorrelate from "../libs/AutoCorrelate";
import {
    noteFromPitch,
    centsOffFromPitch,
    getDetunePercent,
  } from "../libs/Helpers";
import { FFT } from 'fft-js';

const noteStrings = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];

function Tunner({ tunner, closeModal }) {

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const buflen = 2048;
    var buf = new Float32Array(buflen);

    const [source, setSource] = useState(null);
    const [started, setStart] = useState(false);

    const [pitchNote, setPitchNote] = useState("C");
    const [pitchScale, setPitchScale] = useState("4");
    const [pitch, setPitch] = useState("0 Hz");

    const [detune, setDetune] = useState("0");
    const [notification, setNotification] = useState(false);

    const shutdown = () => {
        closeModal();
    };

    const system = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
                analyser.connect(audioContext.destination);
    
                analyser.fftSize = 2048;
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Float32Array(bufferLength); // เปลี่ยนเป็น Float32Array
    
                const getPitch = () => {
                    analyser.getFloatTimeDomainData(dataArray);
    
                    // คำนวณขนาดของ dataArray
                    const SIZE = dataArray.length;
    
                    // คำนวณค่า rms (Root Mean Square)
                    let rms = 0;
                    for (let i = 0; i < SIZE; i++) {
                        const val = dataArray[i];
                        rms += val * val;
                    }
                    rms = Math.sqrt(rms / SIZE);
    
                    if (rms < 0.01) {
                        // ไม่มีสัญญาณเพียงพอ
                        return -1;
                    }
    
                    // ตั้งค่าตัวแปรสำหรับการตัดเสียงไม่จำเป็น
                    let r1 = 0;
                    let r2 = SIZE - 1;
                    const thres = 0.2;
                    for (let i = 0; i < SIZE / 2; i++) {
                        if (Math.abs(dataArray[i]) < thres) {
                            r1 = i;
                            break;
                        }
                    }
                    for (let i = 1; i < SIZE / 2; i++) {
                        if (Math.abs(dataArray[SIZE - i]) < thres) {
                            r2 = SIZE - i;
                            break;
                        }
                    }
    
                    // ตัดเสียงไม่จำเป็นออก
                    const buf = dataArray.subarray(r1, r2);
                    const bufSize = buf.length;
    
                    // คำนวณค่า AutoCorrelation
                    const c = new Float32Array(bufSize).fill(0);
                    for (let i = 0; i < bufSize; i++) {
                        for (let j = 0; j < bufSize - i; j++) {
                            c[i] += buf[j] * buf[j + i];
                        }
                    }
    
                    // หาตำแหน่งที่ค่า AutoCorrelation สูงสุด
                    let maxval = -1;
                    let maxpos = -1;
                    let d = 0;
                    while (c[d] > c[d + 1]) {
                        d++;
                    }
                    for (let i = d; i < bufSize; i++) {
                        if (c[i] > maxval) {
                            maxval = c[i];
                            maxpos = i;
                        }
                    }
    
                    // คำนวณความถี่
                    let T0 = maxpos;
                    const x1 = c[T0 - 1];
                    const x2 = c[T0];
                    const x3 = c[T0 + 1];
                    const a = (x1 + x3 - 2 * x2) / 2;
                    const b = (x3 - x1) / 2;
                    if (a) {
                        T0 = T0 - b / (2 * a);
                    }
    
                    const frequency = audioContext.sampleRate / T0;
    
                    // อัปเดตค่าความถี่ใน state
                    setPitch(frequency.toFixed(2) + " Hz");
    
                    // เรียก getPitch ใหม่
                    requestAnimationFrame(getPitch);
                };
    
                getPitch();
                // console.log(pitch);
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    }

    const start = () => {
        setStart(true);
    };

    const stop = () => {
        setStart(false);
    };


    useEffect(() => {
        if (started) {
            const animationFrameId = requestAnimationFrame(system);
            console.log(pitch);
            return () => {
                cancelAnimationFrame(animationFrameId);
            };
        }
    }, [started]);
    

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-900 bg-opacity-80">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-black opacity-75" onClick={shutdown}></div>
                </div>

                {tunner ?
                    <div className="w-2/3 h-2/3 bg-gray-800 text-white rounded-lg shadow-xl transform transition-all p-4 grid grid-flow-row md:grid-cols-3 gap-4" onClick={(e) => e.stopPropagation()}>

                        <div className="bg-green-500 p-2 rounded-t-lg col-span-3">
                            <label className="text-xl font-semibold text-center block">Guitar Tuner Settings</label>
                        </div>

                        <div className="md:col-span-2 bg-gray-700 p-2 mt-2 rounded-lg">
                            <label className="block font-semibold">Tuning Mode:</label>
                            <select className="border rounded p-2 w-full bg-gray-700 text-white">
                                <option value="standard">Standard</option>
                                <option value="drop-d">Drop D</option>
                            </select>
                            {!started ? (
                                <button
                                    className="bg-red-600 text-white w-20 h-20 rounded-full shadow-xl transition-all"
                                    onClick={start}
                                >
                                    Start
                                </button>
                                ) : (
                                <button
                                    className="bg-red-800 text-white w-20 h-20 rounded-full shadow-xl transition-all"
                                    onClick={stop}
                                >
                                    Stop
                                </button>
                            )}
                        </div>

                        <div className="md:col-span-2 bg-gray-700 p-2 mt-2 rounded-lg gap-2">
                            <h1 className="text-xl font-semibold fle">Guitar Tuner</h1>
                            <p className="mb-2 mt-2">Frequency: {pitch}</p>
                            <p className="mb-2">Pitch Note: {pitchNote} </p>
                            <p>Pitch Scale: {pitchScale} </p>
                        </div>

                        <div className="md:col-span-2 bg-gray-700 px-2 mt-2 rounded-lg">
                            <div className="grid grid-flow-row md:grid-flow-col gap-2">
                                {/* {noteFrequencies.map((stringName) => (
                                <div key={stringName.note} className={`flex flex-row rounded-lg items-center p-2 text-white ${stringName.status ? 'bg-red-300' : ''}`}>
                                    <div className="font-semibold">{stringName.note}:</div>
                                    <div className="ml-2">{stringName.frequency} Hz</div>
                                </div>
                            ))} */}
                                
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <label>ระบบขัดข้อง</label>
                    </div>
                }

            </div>
        </div>
    );


}

export default Tunner
