import React from 'react';
import Note from '@/components/Note';

const content = `

# [Le Khan Academie](#)

Le Khan Academie generates Khan Academy-style videos on demand for any topic using Gen AI. It uses a finetuned Mistral 8x7B model to create animations and narration based on user queries. Built with Mistral, Mixtral 8x7B, Fireworks AI, and manim animation library.

# [Guided Sprout](#)

Guided Sprout uses AI to personalize education by grading exams, providing tailored student feedback, and recommending targeted resources for improvement. It employs a multimodal platform to enhance the learning experience. Utilizes OpenAI models including GPT-4V, GPT-3.5 Turbo, GPT-4, Text-to-speech, and Text-embedding-3-small.

# [Uncle Sam Tax](#)

Uncle Sam Tax simplifies tax filing for Americans with a single income source by automating the process using AI. Users upload their past year's forms, and the system prepares their next tax return form automatically. Developed using Python, GPT-4, GPT-Vision, Trulens, Portkey, and Streamlit.

# [AB Agent](#)

AB Agent automates the design and inference phases of A/B testing workflows using Generative AI. It simplifies experiment setup, determines sample sizes, and interprets results to make data-driven decisions. Built with Python, React, Fireworks, mixtral-8x7b-instruct model, and firefunction-v1.

# [JoboComplete](#)

JoboComplete is a Chrome extension that automates input filling for job applications using LlamaIndex's RAG capabilities. It saves time by automatically populating fields with information from the user's resume. Developed using Javascript, Python, FastAPI, and LlamaIndex.

# [Ask Priya](#)

Ask Priya is an LLM RAG chatbot that answers questions about US immigration using Google's chat bison model. It outperforms the existing USCIS solution by leveraging a vector store built with Llama-index and scraped USCIS webpages. Created using Python, Llama-index, VertexAI, OpenAI, Trulens, and Streamlit.

# [Gemini Hire](#)

Gemini Hire streamlines the job application process by parsing resumes and generating cover letters, interview questions, and skills gap analyses. It uses Google's Gemini Vision Pro for resume parsing and Gemini Pro's text model for generating application materials. Implemented with Python, Gemini Vision Pro, OpenAI, Trulens, HuggingFace, and Gradio.

# [SarimaCV](#)

SarimaCV is a Python package that performs cross-validation for SARIMA models in a distributed manner. It was created to address the frustration of iterative cross-validation in time series analysis. Built using Python and distributed computing frameworks.

# [Data Science New Tab Chrome Application](#)

This Chrome extension provides quick access to University of San Francisco pages and keeps users updated with recent AI papers, blogs, and San Francisco events. It includes a to-do list feature for enhanced productivity. Developed using Python, React, Firebase, TailwindCSS, and Chrome storage API.
`;

export default function Home() {
  return (
    <main className="pt-4 pl-4">
      <Note
        title="📌 My Projects"
        content={content}
      />
    </main>
  );
}