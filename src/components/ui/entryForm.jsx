import React, { useState, useEffect } from 'react';

const NewEntryForm = ({ selectedMood, selectedEmoji, onSaveEntry }) => {
  const [entryText, setEntryText] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [currentDate, setCurrentDate] = useState('');

  const availableTags = [
    'work', 'family', 'exercise', 'social', 'stress', 'peaceful',
    'self-care', 'sleep', 'health', 'learning', 'creativity', 'gratitude'
  ];

  useEffect(() => {
    // Set current date when component mounts
    const today = new Date();
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    setCurrentDate(today.toLocaleDateString('en-GB', options)); // e.g., 21/10/2025
  }, []);

  const handleTagToggle = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMood || !entryText.trim()) {
      alert('Please select a mood and write your entry before saving.');
      return;
    }

    const newEntry = {
      id: Date.now(), // Simple unique ID
      emoji: selectedEmoji,
      mood: selectedMood,
      date: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long', // e.g., October
        year: 'numeric',
      }),
      text: entryText.trim(),
      tags: selectedTags,
    };
    
    // Call the parent function to save the entry
    onSaveEntry(newEntry);

    // Reset form
    setEntryText('');
    setSelectedTags([]);
    // Note: selectedMood and selectedEmoji are controlled by MoodChecker
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Journal Entry</h1>

      {/* Mood Display */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <p className="text-lg font-semibold text-gray-700">
          {selectedEmoji} Current Mood: {selectedMood || 'Not selected'}
        </p>
        <p className="text-sm text-gray-500">{currentDate}</p>
      </div>

      {/* Journal Text Area */}
      <label htmlFor="journal-entry" className="block text-md font-semibold text-gray-700 mb-2">
        How was your day?
      </label>
      <textarea
        id="journal-entry"
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-700 placeholder-gray-400 h-32 resize-y"
        placeholder="Reflect on your thoughts, feelings, and experiences today..."
        value={entryText}
        onChange={(e) => setEntryText(e.target.value)}
        required
      ></textarea>

      {/* Tags Section */}
      <div className="mt-6 mb-4">
        <p className="text-md font-semibold text-gray-700 mb-3">Tags</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                ${selectedTags.includes(tag)
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                } transition-colors duration-200
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Save Entry Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="w-full flex items-center justify-center bg-violet-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 transition-colors duration-200 mt-6"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Save Entry
      </button>
    </div>
  );
};

export default NewEntryForm;