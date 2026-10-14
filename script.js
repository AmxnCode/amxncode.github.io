/**
 * Amanpreet Singh (AmanX) - Interactive Portfolio Logic
 * Recruiter Fast-Track, AI Assistant Simulation, System Architecture Modals & Three.js HUD
 * Verified LinkedIn Profile Details: NeuroMl.ai pvt ltd, PTU, AI Astro, AI Music Player
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingAnimation();
  initRecruiterAssistant();
  initModals();
  initClipboardActions();
  initNavigation();
  init3DThemeControls();
  initProjectFilters();
});

/* ==========================================================================
   0. Project Category Filtering Logic
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid-container .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category') || '';
        if (filter === 'all' || cat.split(' ').includes(filter)) {
          card.classList.remove('is-hidden');
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   1. 3D Scene Controls HUD (Theme Switching)
   ========================================================================== */
function init3DThemeControls() {
  const themeButtons = document.querySelectorAll('[data-theme-btn]');
  themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-btn');
      if (window.portfolio3D && window.portfolio3D.setTheme) {
        window.portfolio3D.setTheme(theme);
      }
      themeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

/* ==========================================================================
   2. Typing Animation for Hero Subtitle
   ========================================================================== */
function initTypingAnimation() {
  const roles = [
    'AI Systems Engineer',
    'Applied ML Developer (NeuroMl.ai Alum)',
    'On-Device Edge Voice AI Specialist',
    'Full-Stack GenAI Architect'
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
      typingSpeed = 38;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 85;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1900;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
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
      • <strong>Proven Applied AI Experience:</strong> Built and deployed machine learning systems at <strong>NeuroMl.ai pvt ltd</strong> (2020–2023) and graduated from <strong>Punjab Technical University</strong>.<br>
      • <strong>Shipped Consumer & Enterprise Apps:</strong> Published <strong>AI Astro</strong> on Google Play Store, engineered real-time P2P <strong>AI Music Player</strong>, and architected enterprise platforms like <strong>RAIP</strong> with hallucination guardrails.<br>
      • <strong>Edge & On-Device Voice Pioneer:</strong> Built 100% offline, on-device voice pipelines in Python and Android (Whisper + llama.cpp + ONNX TTS) with sub-second latency.<br>
      • <strong>Immediate Impact:</strong> Self-driven builder based in Punjab, India, available for Remote worldwide or relocation.
    `,
    'experience': `
      <strong>Career & Education Background:</strong><br>
      • <strong>NeuroMl.ai pvt ltd (2020 – 2023):</strong> Focused on applied machine learning architectures, neural networks, and scalable model integrations.<br>
      • <strong>Punjab Technical University (2015 – 2018):</strong> Solid foundational degree in computer technology & software engineering.<br>
      • <strong>Published Apps:</strong> <em>AI Astro</em> on the Google Play Store.<br>
      • <strong>Open Source:</strong> 40+ repositories spanning LLM fine-tuning, voice pipelines, and agent systems.
    `,
    'voice-ai': `
      <strong>Edge Voice AI Pipeline:</strong><br>
      Aman built fully local, zero-cloud speech-to-speech pipelines for Python and Android Native (Kotlin/JNI).<br>
      • <strong>Speech Recognition:</strong> Faster-Whisper (CTranslate2 / ONNX Q4)<br>
      • <strong>On-Device Reasoning:</strong> Liquid Foundation Model (LFM2.5-350M Q4_0) running on llama.cpp<br>
      • <strong>Speech Synthesis:</strong> Supertonic 3 ONNX TTS<br>
      <em>Outcome:</em> 100% private, offline execution with sub-second response times without external cloud API dependencies!
    `,
    'rag-eval': `
      <strong>RAIP RAG & Evaluation Engine:</strong><br>
      In RAIP (Re'equil AI Intelligence Platform), Aman engineered solutions for the #1 blocker to enterprise LLM adoption: <em>hallucinations</em>.<br>
      • <strong>Automated Judge:</strong> Every retrieval answer is scored in real-time across 4 vectors: Groundedness, Hallucination Risk, Confidence, and Citation Precision.<br>
      • <strong>Live Data Ingestion:</strong> Headless Playwright scrapers gather competitor product ratings, and Google News RSS provides real-time brand telemetry.<br>
      • <strong>Resilient Multi-Model Fallbacks:</strong> OpenRouter model cascades ensure zero downtime.
    `,
    'tech-stack': `
      <strong>Core Superpowers & Tech Stack:</strong><br>
      • <strong>AI & LLMs:</strong> RAG, Vector Databases (Pinecone/Chroma/Qdrant), LLM-as-a-Judge, LLaMA-Factory, llama.cpp, Whisper, ONNX Runtime, HuggingFace.<br>
      • <strong>Backend & Systems:</strong> Python, FastAPI, Docker, CTranslate2, Playwright, REST, WebSockets.<br>
      • <strong>Frontend & Mobile:</strong> TypeScript, Next.js, React, Tailwind CSS, Android (Kotlin/JNI).<br>
      • <strong>Real-Time Systems:</strong> Peer-to-Peer (P2P) WebRTC/Socket synchronization.
    `,
    'availability': `
      <strong>Current Availability & Work Preferences:</strong><br>
      • <strong>Location:</strong> Hoshiarpur, Punjab, India (Open to Remote Worldwide / Hybrid / Relocation).<br>
      • <strong>Status:</strong> 🟢 Available immediately for full-time roles & high-impact contracts.<br>
      • <strong>Target Roles:</strong> AI Systems Engineer, GenAI Full-Stack Developer, Machine Learning Engineer.<br>
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

    const typingBubble = document.createElement('div');
    typingBubble.className = 'chat-bubble bot';
    typingBubble.innerHTML = '<span class="typing-cursor">● ● ●</span> Consulting knowledgebase...';
    chatWindow.appendChild(typingBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      typingBubble.remove();
      const answer = responses[key] || `
        Thank you for asking! Aman is passionate about AI engineering, edge on-device LLMs, and full-stack machine learning platforms.
        You can check out his work on <a href="https://github.com/AmxnCode" target="_blank" style="color:var(--accent-cyan)">GitHub (@AmxnCode)</a>, explore <a href="https://www.linkedin.com/in/amanpreet-singh-332482345/" target="_blank" style="color:var(--accent-cyan)">LinkedIn</a>, or send an email to allinone3066@gmail.com!
      `;
      appendMessage('bot', answer);
    }, 550);
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
      if (lower.includes('experience') || lower.includes('neuroml') || lower.includes('college') || lower.includes('university') || lower.includes('ptu')) matchedKey = 'experience';
      else if (lower.includes('voice') || lower.includes('audio') || lower.includes('whisper')) matchedKey = 'voice-ai';
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
   4. Interactive Project Modals (Zero Code Exposure)
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-content-area');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalTriggers = document.querySelectorAll('[data-open-modal]');
  if (!modalBackdrop || !modalBody) return;

  const projectDetails = {
    'oneaimemory': {
      title: "OneAIMemory — Encrypted Memory Layer for AI Coding Agents",
      subtitle: "Native Model Context Protocol (MCP) Gateway • Zero-Knowledge Encryption",
      whatItDoes: "Captures browsing, searches, code, and project activity on-device with zero-knowledge AES-256-GCM encryption. Allows Claude Desktop, Cursor, and ChatGPT to access live developer context via 5 native MCP tools only with user authorization.",
      diagram: `
[ macOS Companion App ] ──► [ Local scrypt Key Derivation (N=32768) ]
           │                                   │
           ▼                                   ▼
[ Active URLs / Edits ] ──► [ Local AES-256-GCM Authenticated Encryption ]
                                               │
                                               ▼
                                [ Encrypted Envelope Storage ]
                                               │
                                               ▼
[ Claude / Cursor IDE ] ──► [ Model Context Protocol (MCP Gateway) ]
                                               │
                                               ▼
                                [ Decrypted Contextual Memory (<100ms) ]
      `,
      highlights: [
        "Engineered zero-knowledge on-device memory architecture using AES-256-GCM authenticated cipher and scrypt key derivation.",
        "5 native MCP endpoints: get_consciousness(), search_consciousness(), get_activity_history(), get_interests().",
        "Seamless integration with Claude Desktop, Cursor Composer, and ChatGPT over OAuth PKCE.",
        "Production deployed and live at oneaimemory.com and mcp.oneaimemory.com."
      ],
      link: "https://oneaimemory.com/",
      linkText: "Visit oneaimemory.com"
    },
    'nodeos': {
      title: "NodeOS AI — AI Desktop Workspace for Voice, Chat & Automations",
      subtitle: "Sub-500ms Local Speech-to-Speech & Visual Workflow Automations",
      whatItDoes: "An all-in-one AI desktop workspace combining visual workflow automations with an ultra-responsive, 100% offline speech-to-speech conversational assistant that speaks back in under 500ms.",
      diagram: `
[ User Voice Audio ] ──► [ Moonshine In-Browser WASM STT ]
                                        │
                                        ▼
                             [ Silero VAD Turn Detection ]
                                        │
                                        ▼
                             [ Local llama.cpp (Qwen Model) ]
                                        │ (Token Stream)
                                        ▼
                             [ Sentence Token Splitter ]
                                        │
                                        ▼
                             [ Piper Worker TTS (<100ms) ]
                                        │
                                        ▼
                             [ Instant Audio Speaker Output ]
      `,
      highlights: [
        "Sub-500ms time-to-first-audio conversational response on standard consumer hardware.",
        "100% offline capable: browser WASM Moonshine STT, Silero VAD, and local llama.cpp GGUF inference.",
        "Sentence-by-sentence streaming TTS architecture eliminating conversational pauses.",
        "Full-stack desktop and web architecture with Express.js, Supabase, and Stripe subscription billing."
      ],
      link: "https://www.nodeosai.com/",
      linkText: "Visit nodeosai.com"
    },
    'aiastro': {
      title: "AI Astro — Generative Birth Chart & Horoscope App",
      subtitle: "Published Production Android App on Google Play Store",
      whatItDoes: "Generates personalized astrological birth charts and delivers deep contextual horoscopes by fusing astronomical birth coordinate calculations with modern Generative AI interpretation models.",
      diagram: `
[ User Birth Time & Coordinates ] ──► [ Astronomical Ephemeris Engine ]
                                                   │
                                                   ▼
                                      [ Planetary Position Mapping ]
                                                   │
                                                   ▼
                                      [ Generative AI Interpretation Model ]
                                        ├─ Personality Profile Synthesis
                                        ├─ Life-Path & Career Guidance
                                        └─ Daily Astrological Insights
                                                   │
                                                   ▼
                                      [ Responsive Mobile UI & Reports ]
      `,
      highlights: [
        "Developed AI-driven astrology analysis and personalized horoscope generation.",
        "Integrated exact astronomical planetary calculations with generative AI narrative models.",
        "Delivered a modern, intuitive, responsive user interface designed for high user retention.",
        "Personalized insights across personality traits, relationship dynamics, career trajectories, and life-path themes.",
        "Published and active on Google Play Store."
      ],
      link: "https://play.google.com/store/apps/details?id=com.allinone.aiastro",
      linkText: "View on Google Play Store"
    },
    'aimusic': {
      title: "AI Music Player — Voice-Controlled P2P Collaborative Audio",
      subtitle: "Published Production Android App on Google Play Store",
      whatItDoes: "An intelligent audio application enabling hands-free voice command playback and real-time synchronized music sharing with friends across different locations using peer-to-peer (P2P) networking.",
      diagram: `
[ User Voice Command ] ──► [ Real-Time Speech Recognition Engine ]
                                          │
                                          ▼
                               [ Intent Parsing & Track Selection ]
                                          │
                                          ▼
                   [ Peer-to-Peer (P2P) Low-Latency Audio Sync Engine ]
                                          │
                     ┌────────────────────┴────────────────────┐
                     ▼                                         ▼
            [ Local Host Playback ]                 [ Remote Peer Playback ]
                     └────────────────────┬────────────────────┘
                                          ▼
                        [ Exact Sub-Millisecond Synchronization ]
      `,
      highlights: [
        "Hands-free voice-based controls for play, pause, skip, and smart track search.",
        "Built peer-to-peer (P2P) communication protocol for direct user-to-user audio synchronization.",
        "Sub-millisecond latency sync ensuring friends hear music at the exact same beat regardless of location.",
        "Collaborative queue management and interactive social listening rooms."
      ],
      link: "https://play.google.com/store/apps/details?id=com.allinone.aimusicplayer",
      linkText: "View on Google Play Store"
    },
    'aicontent': {
      title: "AI Content Writer — Multi-Template & SEO Writing Assistant",
      subtitle: "Published Production Android App on Google Play Store",
      whatItDoes: "Generates structured multi-stage SEO blog posts, marketing campaigns, email sequences, and social media captions with section-by-section regeneration and local draft saving.",
      diagram: `
[ Content Topic & Brief ] ──► [ Multi-Stage SEO Outline Generator ]
                                             │
                                             ▼
                                [ Section-by-Section LLM Drafting ]
                                  ├─ Introduction & Hook
                                  ├─ Core Headings & Value Points
                                  ├─ FAQ Section
                                  └─ Conclusion & Call-to-Action
                                             │
                                             ▼
                                [ Interactive In-App Editor & Export ]
      `,
      highlights: [
        "Engineered multi-stage content planning pipeline preventing context window degradation and generic output.",
        "Independent section regeneration allowing granular editing without rewriting entire drafts.",
        "Built with Android Kotlin, Mobile Ads SDK 25.4, and local draft persistence.",
        "Published live on Google Play Store."
      ],
      link: "https://play.google.com/store/apps/details?id=com.allinone.aicontentwriter",
      linkText: "View on Google Play Store"
    },
    'all-ai': {
      title: "All AI Tool — Multimodal Productivity & Deep-Work Suite",
      subtitle: "Published Android App on Google Play Store & Desktop Suite",
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
        "Published live on Google Play Store with companion open-source tools on GitHub."
      ],
      link: "https://play.google.com/store/apps/details?id=com.allaitool.app",
      linkText: "View on Google Play Store"
    },
    'marketing': {
      title: "Autonomous Marketing Agent — Multi-Agent Growth Employee",
      subtitle: "Autonomous Cross-Platform Digital Marketing & SEO Employee",
      whatItDoes: "Acts as an autonomous marketing employee: connects to Google Analytics (GA4), Search Console, and social channels via Composio; runs competitive SERP gap analysis; drafts briefs; checks claims compliance; and auto-publishes.",
      diagram: `
[ Platform OAuth via Composio ] ──► [ Real Analytics Pull: GA4, GSC, Social ]
                                                   │
                                                   ▼
                                      [ Opportunity & Gap Scoring Engine ]
                                                   │
                                                   ▼
                                      [ Multi-Channel Content Briefs ]
                                                   │
                                                   ▼
                                      [ Automated Claims & Compliance Check ]
                                        ├─ Flagged ──► Human Decision Approval
                                        └─ Clean   ──► Autonomous One-Click Publish
      `,
      highlights: [
        "Full multi-agent loop: telemetry ingestion → opportunity detection → content drafting → compliance audit → multi-channel publishing.",
        "Integrates real Google Search Console keywords, competitor sitemap crawls, and real search volume.",
        "Built in Next.js 15, Electron, SQLite/Drizzle, Composio, and local Ollama/OpenRouter LLMs.",
        "Zero cloud API fees when running with local Ollama models."
      ],
      link: "https://github.com/AmxnCode/marketing-agent",
      linkText: "View Repository on GitHub"
    },
    'iotmcp': {
      title: "IoT-MCP-Servers — Model Context Protocol Bridge for Smart Hardware",
      subtitle: "Connecting LLMs & AI Coding Agents to Physical Sensors & Microcontrollers",
      whatItDoes: "Provides standard Model Context Protocol (MCP) server endpoints enabling AI agents (Claude, Cursor, custom bots) to interact with physical sensors, smart home devices, and microcontrollers (ESP32, Raspberry Pi) over MQTT and WebSockets.",
      diagram: `
[ Claude / Cursor / LLM Agent ]
              │ (JSON-RPC)
              ▼
[ Model Context Protocol (MCP Server) ]
              │
┌─────────────┴─────────────┐
▼                           ▼
[ MQTT Gateway / Broker ]   [ WebSocket / HTTP API ]
│                           │
▼                           ▼
[ ESP32 / Microcontrollers ] [ Smart Home Devices / Sensors ]
      `,
      highlights: [
        "Implemented standard MCP tools and resources for physical hardware control and live sensor telemetry.",
        "Enables autonomous agents to diagnose, query, and trigger physical actuators in smart environments.",
        "Lightweight, resilient architecture supporting MQTT, WebSockets, and serial/USB interfaces.",
        "Open-source codebase on GitHub."
      ],
      link: "https://github.com/AmxnCode/IoT-MCP-Servers",
      linkText: "View Repository on GitHub"
    },
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
      link: "https://github.com/AmxnCode/raip-ai-intelligence-platform",
      linkText: "Inspect GitHub Repository"
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
      link: "https://github.com/AmxnCode/voice-pipeline-py",
      linkText: "View Python SDK Repository"
    }
  };

  modalTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-open-modal');
      const data = projectDetails[projId];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="project-tag" style="margin-bottom:12px; display:inline-block">System &amp; Feature Overview</span>
        <h3>${data.title}</h3>
        <p style="color:var(--text-accent); font-weight:600; margin-bottom:18px;">${data.subtitle}</p>
        
        <div class="arch-header">
          <i data-lucide="info"></i> What It Does &amp; Problem Solved
        </div>
        <p style="color:var(--text-secondary); margin-bottom:20px; font-size:0.95rem; line-height:1.6;">
          ${data.whatItDoes || ''}
        </p>

        <div class="arch-header">
          <i data-lucide="check-circle-2"></i> Key Features &amp; Capabilities
        </div>
        <ul style="list-style: none; display:flex; flex-direction:column; gap:10px; margin-bottom:24px;">
          ${data.highlights.map(h => `<li style="display:flex; gap:10px; color:var(--text-secondary); font-size:0.95rem;"><span style="color:var(--accent-cyan)">✔</span> ${h}</li>`).join('')}
        </ul>

        <div class="arch-header">
          <i data-lucide="git-merge"></i> High-Level System Architecture
        </div>
        <pre class="modal-diagram-box">${data.diagram.trim()}</pre>

        <div style="display:flex; gap:14px; flex-wrap:wrap; margin-top:20px;">
          <a href="${data.link}" target="_blank" class="btn btn-primary" style="font-size:0.9rem; padding:10px 20px;">
            <i data-lucide="external-link"></i> ${data.linkText || 'View Project'}
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
