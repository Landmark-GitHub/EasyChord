import React from 'react';

const chord_ = {
  C: 'https://www.folkpeople.com/gt_chord/chord-image/C-Chord-4.jpg?v=01',
  D: 'https://www.folkpeople.com/gt_chord/chord-image/D-Chord-2.jpg?v=01',
  Am: 'http://www.folkpeople.com/gt_chord/chord-image/Am-Chord-2.jpg?v=01',
  Gmaj7: 'http://www.folkpeople.com/gt_chord/chord-image/Gmaj7-Chord-5.jpg?v=01'
  //http://www.folkpeople.com/gt_chord/chord-image/D-Chord-4.jpg?v=01
  // Add more chord URLs here
};

const TableChords = ({ chords }) => {
  if (!chords || !Array.isArray(chords)) {
    return <div>No chords available</div>;
  }

  return (
    <div className="bg-red-300 p-4 rounded-lg">
      <button
        className="bg-red-500 text-white py-2 px-4 rounded"
        onClick={() => {
          console.log(chords);
        }}
      >
        Table Chords
      </button>
      <div className="grid grid-cols-6 gap-0 w-full mt-4">
        {chords.map((item, i) => {
          const image = Object.keys(chord_).find((key) => key === item)
          return (
            <div key={i} className="bg-red-300 p-2 rounded-lg mr-2">
              <img src={chord_[image]} alt={`Chord ${item}`} />
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TableChords;
