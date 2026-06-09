import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Sidebar from '../components/ui/Sidebar';
import { useAuth } from '../context/AuthContext';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

const initialMessages = [
  {
    type: 'bot',
    text: "Hello! I'm FitYaarBot 🌿 I'm here to listen and support you. How are you feeling today?",
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
  },
];

const AIChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const { getAuthHeader } = useAuth();

  const orb1 = useRef(null);
  const orb2 = useRef(null);
  const headerRef = useRef(null);
  const disclaimerRef = useRef(null);
  const chatBoxRef = useRef(null);
  const inputBarRef = useRef(null);

  useEffect(() => {
    gsap.to(orb1.current, { x: 50, y: -30, duration: 7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to(orb2.current, { x: -40, y: 40, duration: 9, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.fromTo(headerRef.current,     { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration: 0.7 })
      .fromTo(disclaimerRef.current, { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .fromTo(chatBoxRef.current,    { opacity: 0, y: 40, scale: 0.97 }, { opacity: 1, y: 0, scale: 1, duration: 0.75 }, '-=0.3')
      .fromTo(inputBarRef.current,   { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4');
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const time = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    setMessages(prev => [...prev, { type: 'user', text: trimmed, time }]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
        body: JSON.stringify({ history: messages, message: trimmed }),
      });
      if (!res.ok) throw new Error((await res.json()).reply || 'Error');
      const data = await res.json();
      setMessages(prev => [...prev, {
        type: 'bot',
        text: data.reply || "Sorry, I couldn't get a response.",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "I'm having a little trouble connecting. Please try again.",
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <style>{`
        .aichat-root {
          display: flex;
          min-height: 100vh;
          background: var(--bg-primary);
          font-family: 'Plus Jakarta Sans', sans-serif;
          position: relative;
          overflow: hidden;
        }
        .aichat-orb {
          position: fixed; border-radius: 50%;
          pointer-events: none; z-index: 0; filter: blur(90px);
        }
        .aichat-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, var(--orb-1-color), transparent 70%);
          top: -80px; right: 60px;
        }
        .aichat-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, var(--orb-2-color), transparent 70%);
          bottom: 10%; left: 15%;
        }
        .aichat-bg-grid {
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        /* ── Layout ── */
        .aichat-main {
          flex: 1;
          margin-left: 80px;
          position: relative;
          z-index: 1;
          display: flex;
          justify-content: center;
          padding: 44px 32px;
          min-height: 100vh;
          box-sizing: border-box;
        }
        .aichat-inner {
          width: 100%;
          max-width: 760px;
          display: flex;
          flex-direction: column;
        }

        /* ── Chip ── */
        .aichat-chip {
          display: inline-flex; align-items: center; gap: 8px;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          padding: 5px 14px; border-radius: 100px;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--accent-violet-lt);
          margin-bottom: 12px;
          box-shadow: var(--shadow-card);
          width: fit-content;
        }
        .aichat-chip-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent-mint);
          box-shadow: 0 0 0 3px rgba(52,211,153,0.25);
          animation: pulse-g 2s ease-in-out infinite;
        }
        @keyframes pulse-g {
          0%,100% { box-shadow: 0 0 0 3px rgba(52,211,153,0.25); }
          50%      { box-shadow: 0 0 0 7px rgba(52,211,153,0.08); }
        }

        /* ── Header text ── */
        .aichat-title {
          font-family: 'Sora', sans-serif;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 800;
          color: var(--hero-title-color);
          letter-spacing: -0.03em; line-height: 1.05;
          margin-bottom: 8px;
        }
        .aichat-title .grad {
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .aichat-sub {
          font-size: 0.95rem;
          color: var(--hero-sub-color);
          margin-top: 6px; margin-bottom: 24px; line-height: 1.55;
        }

        /* ── Disclaimer ── */
        .aichat-disclaimer {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 14px 18px;
          background: var(--bg-card);
          border: 1px solid var(--border-primary);
          border-left: 3px solid var(--accent-blue);
          border-radius: 14px; margin-bottom: 24px;
        }
        .aichat-disclaimer-icon {
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(96,165,250,0.12);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; font-size: 1rem;
        }
        .aichat-disclaimer p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6; margin: 0;
        }
        .aichat-disclaimer strong { color: var(--accent-blue); }

        /* ── Chat box ── */
        .aichat-box {
          background: var(--bg-secondary);
          border-radius: 24px;
          box-shadow: var(--shadow-card);
          border: 1px solid var(--border-primary);
          display: flex; flex-direction: column;
          overflow: hidden;
          flex: 1;
          min-height: 520px;
        }
        .aichat-box-header {
          padding: 16px 22px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          display: flex; align-items: center; gap: 12px;
          flex-shrink: 0;
        }
        .aichat-bot-avatar {
          width: 42px; height: 42px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
          box-shadow: 0 0 0 2px rgba(255,255,255,0.3);
        }
        .aichat-bot-name {
          font-family: 'Sora', sans-serif;
          font-size: 0.95rem; font-weight: 700; color: white;
        }
        .aichat-bot-status {
          font-size: 0.72rem; color: rgba(255,255,255,0.75);
          display: flex; align-items: center; gap: 5px; margin-top: 2px;
        }
        .status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #34d399; animation: pulse-g 2s infinite;
        }

        /* ── Messages area ── */
        .aichat-messages {
          flex: 1; overflow-y: auto;
          padding: 24px 20px;
          display: flex; flex-direction: column; gap: 18px;
          background: var(--bg-secondary);
        }
        .aichat-messages::-webkit-scrollbar { width: 4px; }
        .aichat-messages::-webkit-scrollbar-thumb {
          background: rgba(124,58,237,0.25); border-radius: 10px;
        }

        /* ── Message rows ── */
        .msg-row { display: flex; gap: 10px; align-items: flex-end; }
        .msg-row.user { justify-content: flex-end; }
        .msg-row.bot  { justify-content: flex-start; }
        .msg-avatar {
          width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem;
        }
        .msg-content { display: flex; flex-direction: column; max-width: 70%; }
        .msg-sender {
          font-size: 0.72rem; font-weight: 600;
          color: var(--accent-violet-lt); margin-bottom: 4px;
        }
        .msg-bubble {
          padding: 12px 16px;
          font-size: 0.9rem; line-height: 1.65;
          box-shadow: 0 2px 12px rgba(0,0,0,0.15);
        }
        .msg-bubble.bot {
          background: rgba(124,58,237,0.18);
          border: 1px solid rgba(124,58,237,0.3);
          color: var(--text-primary);
          border-radius: 4px 18px 18px 18px;
        }
        .msg-bubble.user {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          border-radius: 18px 4px 18px 18px;
        }
        .msg-time {
          font-size: 0.68rem;
          color: var(--text-muted);
          margin-top: 4px;
        }
        .msg-time.user { text-align: right; }

        /* ── Typing dots ── */
        .typing-dots { display: flex; gap: 4px; align-items: center; padding: 4px 0; }
        .typing-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent-violet-lt);
          animation: bounce 1.2s ease-in-out infinite;
        }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%,80%,100% { transform: translateY(0); }
          40%          { transform: translateY(-8px); }
        }

        /* ── Input bar ── */
        .aichat-input-bar {
          padding: 16px 20px;
          background: var(--bg-tertiary);
          border-top: 1px solid var(--border-primary);
          flex-shrink: 0;
        }
        .aichat-form { display: flex; gap: 10px; align-items: center; }
        .aichat-input {
          flex: 1; padding: 13px 20px;
          background: var(--bg-input);
          border: 1.5px solid var(--input-border);
          border-radius: 100px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.9rem;
          color: var(--text-primary);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .aichat-input:focus {
          border-color: var(--accent-violet);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
        }
        .aichat-input::placeholder { color: var(--input-placeholder); }
        .aichat-send-btn {
          width: 46px; height: 46px; border-radius: 50%; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s; flex-shrink: 0;
        }
        .aichat-send-btn.active {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          box-shadow: 0 4px 16px rgba(124,58,237,0.4);
          color: white;
        }
        .aichat-send-btn.active:hover { transform: scale(1.08); }
        .aichat-send-btn.inactive {
          background: var(--bg-input);
          color: var(--text-muted);
          cursor: not-allowed;
        }
        .aichat-hint {
          font-size: 0.72rem;
          color: var(--text-muted);
          text-align: center; margin-top: 10px;
        }
      `}</style>

      <div className="aichat-root">
        <div className="aichat-orb aichat-orb-1" ref={orb1} />
        <div className="aichat-orb aichat-orb-2" ref={orb2} />
        <div className="aichat-bg-grid" />

        <Sidebar />

        <div className="aichat-main">
          <div className="aichat-inner">

            {/* Header */}
            <div ref={headerRef}>
              <div className="aichat-chip">
                <span className="aichat-chip-dot" /> AI Support
              </div>
              <h1 className="aichat-title">
                Talk to <span className="grad">FitYaarBot</span>
              </h1>
              <p className="aichat-sub">
                A safe, private space to share what's on your mind. I'm here to listen.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="aichat-disclaimer" ref={disclaimerRef}>
              <div className="aichat-disclaimer-icon">ℹ️</div>
              <p>
                <strong>Heads up:</strong> FitYaarBot offers emotional support but is not a
                replacement for professional therapy. If you're in crisis, please use the{' '}
                <a href="/crises-support" style={{ color: 'var(--accent-violet-lt)', fontWeight: 600 }}>
                  Crisis Support
                </a>{' '}page.
              </p>
            </div>

            {/* Chat box */}
            <div className="aichat-box" ref={chatBoxRef}>
              <div className="aichat-box-header">
                <div className="aichat-bot-avatar">🤖</div>
                <div>
                  <div className="aichat-bot-name">FitYaarBot</div>
                  <div className="aichat-bot-status">
                    <span className="status-dot" /> Online · Always here for you
                  </div>
                </div>
              </div>

              <div className="aichat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`msg-row ${msg.type}`}>
                    {msg.type === 'bot' && <div className="msg-avatar">🤖</div>}
                    <div className="msg-content">
                      {msg.type === 'bot' && <div className="msg-sender">FitYaarBot</div>}
                      <div className={`msg-bubble ${msg.type}`}>{msg.text}</div>
                      <div className={`msg-time ${msg.type}`}>{msg.time}</div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="msg-row bot">
                    <div className="msg-avatar">🤖</div>
                    <div className="msg-content">
                      <div className="msg-sender">FitYaarBot</div>
                      <div className="msg-bubble bot">
                        <div className="typing-dots">
                          <div className="typing-dot" />
                          <div className="typing-dot" />
                          <div className="typing-dot" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="aichat-input-bar" ref={inputBarRef}>
                <form className="aichat-form" onSubmit={handleSend}>
                  <input
                    className="aichat-input"
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={isTyping ? 'Waiting for response…' : "Share what's on your mind…"}
                    disabled={isTyping}
                  />
                  <button
                    type="submit"
                    className={`aichat-send-btn ${(!input.trim() || isTyping) ? 'inactive' : 'active'}`}
                    disabled={!input.trim() || isTyping}
                  >
                    <PaperAirplaneIcon style={{ width: 18, height: 18 }} />
                  </button>
                </form>
                <p className="aichat-hint">Press Enter to send · This conversation is private</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AIChat;