import React, { useState, useRef, useEffect } from 'react';

const SoundCard = ({ title, description, duration, tags, audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(err => console.error('Playback failed:', err));
      setIsPlaying(true);
    }
  };

  const tagColorMap = {
    'Nature':             'bg-green-100 text-green-700',
    'Cozy':               'bg-yellow-100 text-yellow-700',
    'Urban':              'bg-blue-100 text-blue-700',
    'Meditation':         'bg-purple-100 text-purple-700',
    'Focus':              'bg-indigo-100 text-indigo-700',
    'Reduces anxiety':    'bg-green-200 text-green-800',
    'Improves focus':     'bg-lime-200 text-lime-800',
    'Sleep aid':          'bg-gray-200 text-gray-700',
    'Deep relaxation':    'bg-fuchsia-200 text-fuchsia-800',
    'Stress relief':      'bg-cyan-200 text-cyan-800',
    'Mindfulness':        'bg-rose-200 text-rose-800',
    'Creativity':         'bg-orange-200 text-orange-800',
    'Mood boost':         'bg-pink-200 text-pink-800',
    'Energy':             'bg-red-200 text-red-800',
    'Positivity':         'bg-yellow-300 text-yellow-800',
    'Warmth':             'bg-orange-100 text-orange-700',
    'Relaxation':         'bg-purple-200 text-purple-800',
    'Productivity':       'bg-teal-200 text-teal-800',
    'Concentration':      'bg-lime-200 text-lime-700',
    'Sleep':              'bg-slate-200 text-slate-700',
    'Noise masking':      'bg-zinc-200 text-zinc-700',
    'Nature connection':  'bg-emerald-200 text-emerald-700',
    'Deep meditation':    'bg-sky-200 text-sky-700',
    'Spiritual connection': 'bg-indigo-200 text-indigo-700',
    'Inner peace':        'bg-amber-200 text-amber-700',
  };

  return (
    <div
      className={`flex flex-col bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] ${
        isPlaying ? 'border-2 border-violet-500' : 'border-2 border-transparent'
      }`}
    >
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src={audioFile}
        loop
        preload="none"
      />

      <div className="p-5 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {tags?.map(tag => (
            <span
              key={tag}
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                tagColorMap[tag] || 'bg-gray-100 text-gray-600'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 mb-1">{description}</p>
        <p className="text-xs text-gray-400 mb-4">{duration}</p>

        {/* Volume slider — only visible when playing */}
        {isPlaying && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-gray-400">🔈</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={e => setVolume(parseFloat(e.target.value))}
              className="w-full accent-violet-500"
            />
            <span className="text-xs text-gray-400">🔊</span>
          </div>
        )}

        {/* Play / Stop button */}
        <div className="mt-auto">
          <button
            className={`w-full py-2 px-4 font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${
              isPlaying
                ? 'bg-violet-500 text-white hover:bg-violet-600'
                : 'bg-gray-100 text-violet-600 hover:bg-gray-200'
            }`}
            onClick={handleTogglePlay}
          >
            <span>{isPlaying ? '◼' : '▶'}</span>
            {isPlaying ? 'Stop' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundCard;