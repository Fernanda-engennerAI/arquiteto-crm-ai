import { useEffect, useRef } from 'react';

export default function Composer({ value, onChange, onSend, busy, hint }) {
  const ref = useRef(null);

  // Cresce com o texto até 180px
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 180) + 'px';
  }, [value]);

  const submit = (e) => {
    e.preventDefault();
    if (!busy && value.trim()) onSend();
  };

  return (
    <div className="composer">
      <form onSubmit={submit}>
        <textarea
          id="composer-input"
          ref={ref}
          rows={1}
          value={value}
          placeholder="Descreva o requisito ou o problema técnico…"
          aria-label="Mensagem"
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) submit(e);
          }}
        />
        <button className="btn primary" type="submit" disabled={busy || !value.trim()}>Enviar</button>
      </form>
      <div className="hint">{hint}</div>
    </div>
  );
}
