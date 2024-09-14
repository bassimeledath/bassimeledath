import React from 'react';
import Note from '@/components/Note';

export default function Home() {
  return (
    <main className="pt-4 pl-4">
      <Note
        title="📌 About Me"
        content="Hi I'm Bassim"
      />
    </main>
  );
}
