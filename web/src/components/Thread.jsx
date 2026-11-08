import { useEffect, useRef } from 'react';
import Markdown from './Markdown.jsx';
import { SUGGESTIONS } from '../content.js';

function Notice({ code, text }) {
  return (
    <div className="notice" role="status">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M8 4.5v4.2M8 11v.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
      <div>
        {text} {code && <code>({code})</code>}
      </div>
    </div>
  );
}

export default function Thread({ messages, busy, onPickSuggestion }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy]);

  return (
    <div className="scroll" ref={scrollRef}>
      <div className="thread">
        {messages.length === 0 && (
          <div className="welcome">
            <h2>Descreva o cenário técnico</h2>
            <p>
              Requisitos, integrações, modelagem de dados ou problemas de arquitetura em CRM e sistemas
              corporativos, para qualquer segmento de negócio.
            </p>
            <div className="suggest">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => onPickSuggestion(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => {
          if (m.role === 'user') {
            return (
              <div className="msg user" key={m.id}>
                <span className="who">{m.label || 'Você'}</span>
                <div className="body">{m.content}</div>
              </div>
            );
          }
          if (m.role === 'assistant') {
            return (
              <div className="msg assistant" key={m.id}>
                <span className="who">Arquiteto CRM AI</span>
                <div className="body"><Markdown>{m.content}</Markdown></div>
              </div>
            );
          }
          if (m.role === 'example') {
            return (
              <div className="msg example" key={m.id}>
                <span className="tag">exemplo estático · não é resposta de IA</span>
                <div className="body"><Markdown>{m.content}</Markdown></div>
              </div>
            );
          }
          if (m.role === 'notice') {
            return <Notice key={m.id} code={m.code} text={m.content} />;
          }
          return null;
        })}

        {busy && (
          <div className="typing" role="status">
            <span className="d" /><span className="d" /><span className="d" /> Processando…
          </div>
        )}
      </div>
    </div>
  );
}
