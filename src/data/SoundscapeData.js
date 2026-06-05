// Data for Soundscapes
export const soundscapeData = [
  { title: 'Gentle Rain', description: 'Soft rainfall on leaves, perfect for relaxation', duration: '60 min', tags: ['Nature', 'Reduces anxiety', 'Improves focus', 'Sleep aid'], initialIsPlaying: false, },
  { title: 'Ocean Waves', description: 'Rhythmic waves washing onto shore', duration: '45 min', tags: ['Nature', 'Deep relaxation', 'Meditation', 'Stress relief'], initialIsPlaying: false, },
  { title: 'Forest Ambience', description: 'Birds chirping with gentle wind through trees', duration: '90 min', tags: ['Nature', 'Nature connection', 'Mindfulness', 'Creativity'], initialIsPlaying: false, },
  { title: 'Morning Birds', description: 'Peaceful bird songs at dawn', duration: '30 min', tags: ['Nature', 'Mood boost', 'Energy', 'Positivity'], initialIsPlaying: false, },
  { title: 'Cozy Fireplace', description: 'Crackling fire in a warm fireplace', duration: '120 min', tags: ['Cozy', 'Comfort', 'Warmth', 'Relaxation'], initialIsPlaying: false, },
  { title: 'Coffee Shop', description: 'Ambient coffee shop with gentle chatter', duration: '60 min', tags: ['Urban', 'Focus', 'Productivity', 'Creativity'], initialIsPlaying: false, },
  { title: 'Singing Bowls', description: 'Tibetan singing bowls with soft harmonics', duration: '45 min', tags: ['Meditation', 'Deep meditation', 'Spiritual connection', 'Inner peace'], initialIsPlaying: false, },
  { title: 'White Noise', description: 'Pure white noise for concentration', duration: '∞', tags: ['Focus', 'Concentration', 'Sleep', 'Noise masking'], initialIsPlaying: false, },
];

// Data for Presets
export const presetData = [
    {
        title: 'Deep Focus',
        description: 'Perfect blend for concentrated work',
        sounds: ['Coffee Shop', 'White Noise'],
    },
    {
        title: 'Sleep Sanctuary',
        description: 'Gentle sounds for peaceful sleep',
        sounds: ['Gentle Rain', 'Ocean Waves'],
    },
    {
        title: 'Meditation Garden',
        description: 'Natural harmony for mindfulness practice',
        sounds: ['Forest Ambience', 'Singing Bowls'],
    },
    {
        title: 'Cozy Evening',
        description: 'Warm and comforting atmosphere',
        sounds: ['Cozy Fireplace', 'Gentle Rain'],
    },
];

export const tabs = ['Soundscapes', 'Presets', 'Mixer'];
export const filterCategories = ['All', 'Nature', 'Cozy', 'Urban', 'Meditation', 'Focus'];