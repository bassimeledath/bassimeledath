import React from 'react';
import Note from '@/components/Note';

const content = `
<div style="display: flex; align-items: flex-start;">
  <div style="flex: 1;">
    <img src="/profile.png" alt="Profile Animation" style="max-width: 100%; height: auto;">
  </div>
  <div style="flex: 1;">
    <pre><code class="language-python">
class Bassim:
    def __init__(self):
        self.occupation = 'Machine Learning Engineer'
        self.skills = (
            'Python',
            'Machine Learning',
            'A/B testing',
            'Generative AI'
        )
        self.hobbies = (
            '🏋️‍♂️ Powerlifting',
            '🌶️ Eating spicy food',
            '🏓 Playing pickleball'
        )
        self.current_favorite_music_artists = (
            "Takeshi's Cashew",
            "Etran de L'Air",
            'French79'
        )
        self.fun_fact = 'I grew up in Dubai!'
    </code></pre>
  </div>
</div>
`;

export default function Home() {
  return (
    <main className="pt-4 pl-4">
      <Note
        title="📌 About Me"
        content={content}
      />
    </main>
  );
}