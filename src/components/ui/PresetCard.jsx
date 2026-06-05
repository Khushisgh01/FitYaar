import React from 'react';

const PresetCard = ({ title, description, sounds }) => {
    return (
        <div className="flex flex-col bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.01] cursor-pointer p-5">
            
            <div className="flex items-center mb-2">
                <span className="text-2xl text-violet-600 mr-2">⚡</span>
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            
            {/* Sounds in the Preset (Matches image_45ba61.png style) */}
            <div className="flex flex-wrap gap-2 mb-6">
                {sounds.map((sound, index) => (
                    <div key={index} className="flex items-center text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                        <span className="mr-1 text-xs">☕</span> {/* Placeholder icon, could be dynamic */}
                        <span>{sound}</span>
                    </div>
                ))}
            </div>

            {/* Action Button */}
            <div className="mt-auto">
                <button className="w-full py-2 px-4 bg-violet-500 text-white font-semibold rounded-xl hover:bg-violet-600 transition-colors duration-200 flex items-center justify-center">
                    <span className="mr-2">▶</span>
                    Apply Preset
                </button>
            </div>
        </div>
    );
};

export default PresetCard;