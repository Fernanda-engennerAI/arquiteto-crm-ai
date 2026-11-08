import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// react-markdown não interpreta HTML bruto por padrão:
// uma resposta com <script> aparece como texto, não executa.
const components = {
  table: ({ node, ...props }) => (
    <div className="tbl"><table {...props} /></div>
  ),
  a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />,
};

export default function Markdown({ children }) {
  return (
    <div className="md">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
