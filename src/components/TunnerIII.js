import React, { useState, useEffect } from 'react';
// import * as ml5 from "ml5";

const  TunerIII = ({ tunner, closeModal }) => {

    const noteFrequencies = [
        { note: 'E6', frequency: 82.41, status: false },
        { note: 'A', frequency: 110.00, status: true },
        { note: 'D', frequency: 146.83, status: true },
        { note: 'G', frequency: 196.00, status: false },
        { note: 'B', frequency: 246.94, status: false },
        { note: 'E1', frequency: 329.63, status: false },
    ];

    const [frequency, setFrequency] = useState(0);
    const [keyNote, setKeyNote] = useState({});
    const [stream, setStream] = useState(null);
    const [audioContext, setAudioContext] = useState(null);
    const [analyser, setAnalyser] = useState(null);

    const startMic = async () => {
        try {
            const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const context = new (window.AudioContext || window.webkitAudioContext)();
            const analyserNode = context.createAnalyser();
            const source = context.createMediaStreamSource(userStream);
    
            source.connect(analyserNode);
            analyserNode.connect(context.destination);
            analyserNode.fftSize = 4096;
    
            setStream(userStream);
            setAudioContext(context);
            setAnalyser(analyserNode);
    
            console.log('Open audio stream from microphone');
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };
    
    const stopMic = () => {
        try {
            if (audioContext) {
                audioContext.close();
                setAudioContext(null);
            }
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
                setAnalyser(null);
                setFrequency(0);
                console.log('Close audio stream from microphone');
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const shutdown = () => {
        closeModal();
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        stopMic();
    };

    const test = () => {
        console.log(frequency)
    }

    const setupSystem = () => {
        startMic();
    };

    const getFrequency = () => {
        try {
            if (analyser) {
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);
    
                let maxFrequencyValue = 0;
                let maxFrequencyIndex = 0;
    
                for (let i = 0; i < dataArray.length; i++) {
                    if (dataArray[i] > maxFrequencyValue) {
                        maxFrequencyValue = dataArray[i];
                        maxFrequencyIndex = i;
                    }
                }
    
                const frequency = (audioContext.sampleRate * maxFrequencyIndex) / analyser.fftSize;
                console.log(frequency);
                return frequency.toFixed(2);
            }
            return 0;
        } catch (e) {
            console.log(e.message);
            return 0;
        }
    };
    

    const updateFrequencyAndNote = () => {
        if (analyser) {
            const newFrequency = getFrequency();
            setFrequency(newFrequency);
            getNote();
        }
        requestAnimationFrame(updateFrequencyAndNote);
    };

    const getNote = () => {
        const currentFrequency = parseFloat(getFrequency());
        let nearestNote = null;
        let minDiff = Number.MAX_VALUE;

        for (const note of noteFrequencies) {
            const diff = Math.abs(note.frequency - currentFrequency);

            if (diff <= 10 && diff < minDiff) {
                nearestNote = note;
                minDiff = diff;
            }
        }

        if (nearestNote) {
            const sign = nearestNote.frequency - currentFrequency < 0 ? '+' : '-';
            setKeyNote({ note: `${nearestNote.note}`, diff: `${sign}${Math.floor(minDiff)}` });
        } else {
            setKeyNote('Found');
        }
    };

    useEffect(() => {
        setupSystem();
    
        const delay = 3000;  // 3000 milliseconds = 3 seconds
    
        const animationId = requestAnimationFrame(updateFrequencyAndNote);
    
        const timeoutId = setTimeout(() => {
            cancelAnimationFrame(animationId);
            setFrequency(getFrequency());
            // shutdown();
        }, delay);
    
        return () => {
            cancelAnimationFrame(animationId);
            clearTimeout(timeoutId);
            // shutdown();
        };
    }, []);
    

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-gray-900 bg-opacity-80">
            <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-black opacity-75" onClick={shutdown}></div>
                </div>

                <button className="absolute top-20 left-20 bg-green-300 text-red-50"
                onClick={closeModal}>
                        Back
                </button>
    
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
                    </div>
    
                    <div className="md:col-span-2 bg-gray-700 p-2 mt-2 rounded-lg gap-2">
                        {stream ? 
                            <>
                                <h1 className="text-xl font-semibold fle">Guitar Tuner</h1>
                                <p className="mb-2 mt-2">Frequency: {getFrequency()} Hz</p>
                                <p className="mb-2">Detected Note: {keyNote ? keyNote.note : 'Not found'}</p>
                                <p>Difference: {keyNote ? keyNote.diff : 'Not found'}</p>
                            </> 
                            :
                            <>
                                <h1> Error Stream Audio</h1>
                            </>   
                        }
                    </div>
    
                    <div className="md:col-span-2 bg-gray-700 px-2 mt-2 rounded-lg">
                        <div className="grid grid-flow-row md:grid-flow-col gap-2">
                            {noteFrequencies.map((stringName) => (
                                <div key={stringName.note} className={`flex flex-row rounded-lg items-center p-2 text-white ${stringName.status ? 'bg-red-300' : ''}`}>
                                    <div className="font-semibold">{stringName.note}:</div>
                                    <div className="ml-2">{stringName.frequency} Hz</div>
                                </div>
                            ))}
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
    
};

export default TunerIII;
