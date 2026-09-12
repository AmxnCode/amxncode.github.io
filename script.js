/**
 * Amanpreet Singh (AmanX) - Interactive Portfolio Logic
 * Recruiter Fast-Track, AI Assistant Simulation, System Architecture Modals & Ambient Visuals
 */

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCanvas();
  initTypingAnimation();
  initRecruiterAssistant();
  initModals();
  initClipboardActions();
  initNavigation();
});

/* ==========================================================================
   1. Ambient Canvas Particle Network
   ========================================================================== */
function initAmbientCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.5 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const opacity = (1 - dist / 130) * 0.15;
          ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Typing Animation for Hero Subtitle
   ========================================================================== */
function initTypingAnimation() {
  const roles = [
    'AI Systems Engineer',
    'LLM & Multi-Agent RAG Architect',
    'Edge & Local Voice AI Specialist',
    'Full-Stack GenAI Developer'
  ];
  const target = document.getElementById('typing-text');
  if (!target) return;

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before typing new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. Interactive "Ask Aman AI" Recruiter Assistant Simulation
   ========================================================================== */
function initRecruiterAssistant() {
  const chatWindow = document.getElementById('ai-chat-window');
  const promptButtons = document.querySelectorAll('.quick-prompt-btn');
  const chatInput = document.getElementById('chat-input');
  const chatSendBtn = document.getElementById('chat-send-btn');
  if (!chatWindow) return;

  const responses = {
    'why-hire': `
      <strong>Why hire Amanpreet?</strong><br>
      • <strong>End-to-End AI Engineering:</strong> Bridges machine learning models (Whisper, LFM, LLaMA) with production backends (FastAPI, Docker, CTranslate2, ONNX) and slick frontends (Next.js, TypeScript).<br>
      • <strong>Production RAG & Evaluation:</strong> Designed enterprise RAG systems with automated LLM-as-a-judge scoring for hallucination and citation fidelity.<br>
      • <strong>Edge & On-Device Pioneer:</strong> Built 100% offline, on-device voice pipelines in Python and Android (ASR + LLM + TTS with sub-second latency).<br>
      • <strong>Immediate Impact:</strong> Self-driven builder with 40+ public GitHub repos, deep familiarity with open-source foundation models, and ready to start immediately.
    `,
    'voice-ai': `
      <strong>Edge Voice AI Pipeline:</strong><br>
      Aman built fully local, zero-cloud speech-to-speech pipelines for both Python and Android Native (Kotlin/JNI).<br>
      • <strong>Speech Recognition:</strong> Faster-Whisper (CTranslate2 / ONNX Q4)<br>
      • <strong>On-Device Reasoning:</strong> Liquid Foundation Model (LFM2.5-350M Q4_0) running on llama.cpp<br>
      • <strong>Speech Synthesis:</strong> Supertonic 3 ONNX TTS<br>
      <em>Outcome:</em> 100% private, offline execution with sub-second response times without relying on expensive cloud API credits!
    `,
    'rag-eval': `
      <strong>RAIP RAG & Evaluation Engine:</strong><br>
      In RAIP (Re'equil AI Intelligence Platform), Aman addressed the #1 blocker to enterprise LLM adoption: <em>hallucinations</em>.<br>
      • <strong>Automated Judge:</strong> Every retrieval answer is scored in real-time across 4 vectors: Groundedness, Hallucination Risk, Confidence, and Citation Precision.<br>
      • <strong>Live Data Ingestion:</strong> Headless Playwright scrapers gather competitor product ratings, and Google News RSS provides real-time brand telemetry.<br>
      • <strong>Resilient Multi-Model Fallbacks:</strong> OpenRouter model chains ensure zero downtime even under free-tier quota limits.
    `,
    'tech-stack': `
      <strong>Core Superpowers & Stack:</strong><br>
      • <strong>AI & LLMs:</strong> RAG, Vector Databases (Pinecone/Chroma/Qdrant), LLM-as-a-Judge, LLaMA-Factory, llama.cpp, Whisper, ONNX Runtime, HuggingFace.<br>
      • <strong>Backend & Systems:</strong> Python, FastAPI, Docker, CTranslate2, Playwright, REST, WebSockets.<br>
      • <strong>Frontend & Mobile:</strong> TypeScript, Next.js, React, Tailwind CSS, Android (Kotlin/JNI).<br>
      • <strong>Work Style:</strong> High agency, rapid prototyping, clean architecture.
    `,
    'availability': `
      <strong>Current Availability & Work Preferences:</strong><br>
      • <strong>Status:</strong> 🟢 Available immediately for full-time roles & high-impact contracts.<br>
      • <strong>Target Roles:</strong> AI Engineer, GenAI Full-Stack Developer, LLM Systems Engineer, Machine Learning Software Engineer.<br>
      • <strong>Location:</strong> Open to Remote worldwide, or Hybrid/Relocation for the right opportunity.<br>
      • <strong>Contact:</strong> Email Aman at <strong>allinone3066@gmail.com</strong> or connect on <a href="https://www.linkedin.com/in/amanpreet-singh-332482345/" target="_blank" style="color:var(--accent-cyan); text-decoration:underline;">LinkedIn</a>!
    `
  };

  function appendMessage(sender, htmlContent) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerHTML = htmlContent;
    chatWindow.appendChild(bubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function handlePrompt(key, userQuery) {
    appendMessage('user', userQuery);

    // Show typing state
    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble bot';
    typingBubble.innerHTML = '<span class="typing-cursor">● ● ●</span> Thinking...';
    chatWindow.appendChild(typingBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      const answer = responses[key] || `
        Thank you for asking! Aman is passionate about AI engineering, local on-device LLMs, and enterprise RAG systems.
        You can check out his source code on <a href="https://github.com/AmxnCode" target="_blank" style="color:var(--accent-cyan)">GitHub (@AmxnCode)</a> or send him a message directly below!
      `;
      appendMessage('bot', answer);
    }, 600);
  }

  promptButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-prompt');
      const userText = btn.textContent.trim();
      handlePrompt(key, userText);
    });
  });

  if (chatSendBtn && chatInput) {
    const submitCustomChat = () => {
      const text = chatInput.value.trim();
      if (!text) return;
      chatInput.value = '';

      const lower = text.toLowerCase();
      let matchedKey = 'why-hire';
      if (lower.includes('voice') || lower.includes('audio') || lower.includes('whisper')) matchedKey = 'voice-ai';
      else if (lower.includes('rag') || lower.includes('hallucination') || lower.includes('eval')) matchedKey = 'rag-eval';
      else if (lower.includes('stack') || lower.includes('skill') || lower.includes('tech')) matchedKey = 'tech-stack';
      else if (lower.includes('available') || lower.includes('hire') || lower.includes('location') || lower.includes('relocat')) matchedKey = 'availability';

      handlePrompt(matchedKey, text);
    };

    chatSendBtn.addEventListener('click', submitCustomChat);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitCustomChat();
    });
  }
}

/* ==========================================================================
   4. Interactive Architecture Modals
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-content-area');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  if (!modalBackdrop || !modalBody) return;

  const projectDetails = {
    'raip': {
      title: "RAIP — Re'equil AI Intelligence Platform",
      subtitle: "Enterprise Applied AI & Multi-Agent RAG with Hallucination Guardrails",
      whatItDoes: "Ingests live business, market, and competitor telemetry, indexes it with dense vector embeddings, and enables cross-department querying with an automated LLM-as-a-judge system that strictly screens out hallucinations and low-groundedness outputs before presenting answers to executives.",
      diagram: `
[ Competitor / Market Data ] ──► [ Playwright Headless Scraper ]
[ Google News Brand RSS    ] ──► [ Data Validation & Cleaning  ]
                                              │
                                              ▼
                                 [ Dense Vector Embeddings ]
                                              │
                                              ▼
[ Dept Question: R&D / Sales ] ──► [ Vector Store Retrieval ]
                                              │
                                              ▼
                                 [ OpenRouter Multi-LLM Fallback ]
                                              │
                                              ▼
                                 [ Automated LLM-as-a-Judge ]
                                   ├─ Groundedness Score (0-1.0)
                                   ├─ Hallucination Metric
                                   └─ Citation Integrity
                                              │
                                              ▼
                                 [ Verified Executive Output ]
      `,
      highlights: [
        "Eliminated enterprise LLM hallucinations by implementing automated LLM-as-a-judge scoring before any insight is presented to stakeholders.",
        "Engineered real-time data collection pipelines using Playwright for Amazon.in competitor analytics and Google News RSS.",
        "Built resilient multi-model fallback cascades via OpenRouter to prevent downtime when individual provider quotas are reached.",
        "Delivered 5 specialized department dashboards with live computed metrics and conversational retrieval interfaces."
      ],
      github: "https://github.com/AmxnCode/raip-ai-intelligence-platform"
    },
    'voice': {
      title: "Edge Voice Pipeline (Python & Android SDK)",
      subtitle: "100% On-Device, Real-Time Local Speech-to-Speech Engine",
      whatItDoes: "Provides an ultra-low-latency, zero-cloud speech-to-speech conversational pipeline on local hardware. Eliminates external API dependencies and protects user privacy by running speech recognition, language model reasoning, and neural voice synthesis entirely on-device.",
      diagram: `
[ Microphone Audio Stream ]
            │
            ▼
[ Faster-Whisper ASR (CTranslate2 / ONNX Q4) ] ──► Streaming Text Tokens
                                                              │
                                                              ▼
                     [ LFM 2.5-350M Q4_0 on llama.cpp / JNI Engine ]
                                                              │
                                                              ▼
                     [ Supertonic 3 Neural TTS (ONNX Runtime)      ]
                                                              │
                                                              ▼
                                               [ Low-Latency Audio Playback ]
      `,
      highlights: [
        "Zero cloud API latency, zero external network requests, and complete data privacy by running the entire pipeline locally on hardware.",
        "Integrated Whisper Small (CTranslate2) for instant real-time transcription.",
        "Quantized Liquid Foundation Model (LFM-350M) using llama.cpp with 4-bit precision, delivering high-speed on-device conversational intelligence.",
        "Targeted dual platforms: Python developer library (pip install voice-pipeline) and native Android SDK via Kotlin and JNI."
      ],
      github: "https://github.com/AmxnCode/voice-pipeline-py"
    },
    'video': {
      title: "Text-to-Videos Generative Studio",
      subtitle: "Autonomous Prompt-to-Video Engine built with Next.js & TypeScript",
      whatItDoes: "Empowers creators and marketers to produce complete 30-second+ videos from a single prompt. Automatically generates the script, plans scene pacing, generates synthetic voiceover narration, and stitches dynamic visual elements into a rendered video.",
      diagram: `
[ User Text Prompt ]
         │
         ▼
[ LLM Script & Scene Director ]
   ├─ Visual Scene Breakdown
   ├─ Timestamp Pacing & Cues
   └─ Voiceover Speech Script
         │
         ▼
[ Media Asset Orchestration & Audio Synthesis ]
         │
         ▼
[ Canvas / Video Renderer Pipeline (30s+ Output) ]
      `,
      highlights: [
        "Translates concise prompt inputs into cohesive scripts, multi-scene pacing, and synced voiceover tracks.",
        "Next.js full-stack architecture with streamlined asset orchestration and real-time generation preview.",
        "Designed for rapid content marketing, educational shorts, and social media video creation."
      ],
      github: "https://github.com/AmxnCode/text-to-videos"
    },
    'all-ai': {
      title: "All-AI Productivity Suite",
      subtitle: "Multimodal Personal Operating System with Focus Analytics",
      whatItDoes: "A multi-faceted AI workspace combining Pomodoro focus timing, automated screenshot indexing with computer vision, and speech-to-text voice memos to boost personal engineering efficiency.",
      diagram: `
[ Screen Capture / Upload ] ──► [ Vision Analysis & Smart Categorization ]
[ Voice Notes Memos       ] ──► [ Automated Whisper Speech Transcription ]
[ Focus Sessions          ] ──► [ Pomodoro Engine & Productivity Graph   ]
                                              │
                                              ▼
                                 [ Unified Interactive Dashboard ]
      `,
      highlights: [
        "Combines Pomodoro focus intervals with automated activity logging.",
        "Intelligent screenshot classification organizing research notes and reference material.",
        "Voice memo transcription with instant keyword indexing.",
        "Built using TypeScript, React, and local storage caching for fluid user experience."
      ],
      github: "https://github.com/AmxnCode/all-ai-tool"
    }
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-open-modal');
      const data = projectDetails[projId];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="project-tag" style="margin-bottom:12px; display:inline-block">System & Feature Overview</span>
        <h3>${data.title}</h3>
        <p style="color:var(--text-accent); font-weight:600; margin-bottom:18px;">${data.subtitle}</p>
        
        <div class="arch-header">
          <i data-lucide="info"></i> What It Does & Problem Solved
        </div>
        <p style="color:var(--text-secondary); margin-bottom:20px; font-size:0.95rem; line-height:1.6;">
          ${data.whatItDoes || ''}
        </p>

        <div class="arch-header">
          <i data-lucide="check-circle-2"></i> Key Features & Capabilities
        </div>
        <ul style="list-style: none; display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
          ${data.highlights.map(h => `<li style="display:flex; gap:10px; color:var(--text-secondary); font-size:0.95rem;"><span style="color:var(--accent-cyan)">✔</span> ${h}</li>`).join('')}
        </ul>

        <div class="arch-header">
          <i data-lucide="git-merge"></i> High-Level System Architecture
        </div>
        <pre class="modal-diagram-box">${data.diagram.trim()}</pre>

        <div style="display:flex; gap:14px; flex-wrap:wrap; margin-top:20px;">
          <a href="${data.github}" target="_blank" class="btn btn-primary" style="font-size:0.9rem; padding:10px 20px;">
            <i data-lucide="external-link"></i> View Project on GitHub
          </a>
        </div>
      `;

      modalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (window.lucide) window.lucide.createIcons();
    });
  });

  const closeModal = () => {
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) closeModal();
  });
}

/* ==========================================================================
   5. Clipboard Copy & Toast Notifications
   ========================================================================== */
function initClipboardActions() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    if (!toast) return;
    toast.innerHTML = `<i data-lucide="check-circle-2"></i> ${msg}`;
    if (window.lucide) window.lucide.createIcons();
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied "${textToCopy}" to clipboard!`);
      }).catch(() => {
        showToast('Copied to clipboard!');
      });
    });
  });
}

/* ==========================================================================
   6. Navigation, Mobile Menu & Active Scroll Spy
   ========================================================================== */
function initNavigation() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        links.forEach(l => {
          l.classList.remove('active');
          if (l.getAttribute('href') === `#${sectionId}`) {
            l.classList.add('active');
          }
        });
      }
    });
  });
}
