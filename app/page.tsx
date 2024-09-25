// file path: page.tsx
import React from 'react';
import Note from '@/components/Note';

const content = `
<div style="display: flex; align-items: flex-start;">
  <div style="flex: 1;">
    <img src="/profile.png" alt="Profile Animation" style="max-width: 100%; height: auto;">
  </div>
  <div style="flex: 1; margin-left: 20px;">
    <pre><code class="language-python">
class AboutBassim:
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

function processContent(content: string): string {
  // Replace YouTube shortcodes with iframe HTML
  content = content.replace(/{{<\s*youtube\s*(\S+)\s*>}}/g, (_match, id) => {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe>`;
  });

  // Replace video shortcodes with iframe HTML
  content = content.replace(/{{<\s*video\s*(\S+)\s*>}}/g, (_match, url) => {
    const videoId = extractYouTubeVideoID(url);
    if (videoId) {
      return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    } else {
      // If not a YouTube URL, provide a simple link
      return `<a href="${url}">Video</a>`;
    }
  });

  return content;
}

function extractYouTubeVideoID(url: string): string | null {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }
  return null;
}

export default function Home() {
  const processedContent = processContent(content);

  return (
    <main className="pt-4 pl-4">
      <Note
        title="📌 About Me"
        content={processedContent}
      />
    </main>
  );
}