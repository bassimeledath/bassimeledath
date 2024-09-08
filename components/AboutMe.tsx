import React from 'react';
import Note from './Note';

const aboutMeContent = `
# About Me

Hello! I'm Bassim Eledath, a passionate developer and tech enthusiast.

## Skills
- Web Development
- Machine Learning
- Cloud Computing

## Hobbies
- Reading
- Hiking
- Photography

Feel free to explore my blog posts to learn more about my work and interests!
`;

export default function AboutMe() {
    return <Note title="About Me" content={aboutMeContent} />;
}