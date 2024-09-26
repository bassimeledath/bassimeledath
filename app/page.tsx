'use client'

import React from 'react';
import Note from '@/components/Note';
import MicrophoneButton from '@/components/MicrophoneButton';

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
            'Making LLM Applications',
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
  const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID;
  const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

  if (!assistantId || !publicKey) {
    console.error('Missing VAPI environment variables');
    return <div>Error: Missing VAPI configuration</div>;
  }

  return (
    <main className="pt-4 pl-4">
      <Note
        title="📌 About Me"
        content={content}
      />
      <div className="mt-4">
        <MicrophoneButton
          assistantId={assistantId}
          publicKey={publicKey}
        />
      </div>
    </main>
  );
}