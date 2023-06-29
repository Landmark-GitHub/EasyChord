import React from 'react';

const chord_ = {
  C: 'https://www.folkpeople.com/gt_chord/chord-image/C-Chord-4.jpg?v=01',
  D: 'https://www.folkpeople.com/gt_chord/chord-image/D-Chord-2.jpg?v=01',
  D_C: 'https://www.folkpeople.com/gt_chord/chord-image/D-Chord-4.jpg?v=01',
  Am: 'http://www.folkpeople.com/gt_chord/chord-image/Am-Chord-2.jpg?v=01',
  Gmaj7: 'http://www.folkpeople.com/gt_chord/chord-image/Gmaj7-Chord-5.jpg?v=01',
  Em: 'http://www.folkpeople.com/gt_chord/chord-image/Em-Chord-3.jpg?v=01',
  D7: 'http://www.folkpeople.com/gt_chord/chord-image/D7-Chord-3.jpg?v=01',
  DC: '',
  Bm: 'http://www.folkpeople.com/gt_chord/chord-image/Bm-Chord-3.jpg?v=01',
  G: 'http://www.folkpeople.com/gt_chord/chord-image/G-Chord-2.jpg?v=01',
  Bbm: 'http://www.folkpeople.com/gt_chord/chord-image/Bbm-Chord-2.jpg?v=01',
  A_C_: 'http://www.folkpeople.com/gt_chord/chord-image/Bbm-Chord-2.jpg?v=01',
  // Add more chord URLs here
};

const TableChords = ({ chords }) => {
  if (!chords || !Array.isArray(chords)) {
    return <div>No chords available</div>;
  }

  return (
    // <div className="p-1 bg-white rounded-lg flex overflow-x-auto w-full h-full">
    <div className="bg-green-200 flex w-full h-full">
      {chords.map((item, i) => {
        const formattedItem = item.replace(/[\/#]/g, '_');
        const image = Object.keys(chord_).find((key) => key === item || key === formattedItem);
        return (
          <div
            key={i}
            className="bg-white rounded-lg m-1 p-1 flex items-center justify-center cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              console.log(formattedItem);
            }}
          >
            <img src={chord_[image]} alt={`Chord ${item}`} className="max-w-full max-h-full" />
            {/* {item} */}
          </div>
        );
      })}
    </div>

    // </div>
  );
};

export default TableChords;
