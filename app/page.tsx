import React from 'react';
import Note from '@/components/Note';

const content = `
<br />
<div style="display: flex; align-items: flex-start;">
  <div style="flex: 1;">
    <img src="/profile.png" alt="Profile Animation" style="max-width: 100%; height: auto;">
  </div>
  <div style="flex: 1;">
    <pre><code class="language-python">
class Bassim:
    def __init__(self):
        self.occupation = 'AI Engineer'
        self.skills = [
            'Generative AI',
            'Machine/Deep Learning',
            'Python, Typescript'
        ]
        self.hobbies = [
            '👨🏾‍💻 Hackathons',
            '🌶️ Eating spicy food',
            '🎧 Playlist curation'
        ]
        self.fun_fact = '''I can count to 20
                      with my eyes closed'''
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