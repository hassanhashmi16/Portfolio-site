function ArrowHead({ id }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0,0 L10,5 L0,10 z" fill="currentColor" />
      </marker>
    </defs>
  );
}

function Box({ x, y, w = 300, h = 50, children, strong = false }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="1.5" fill={strong ? "currentColor" : "none"} stroke="currentColor" strokeOpacity={strong ? 1 : 0.35} strokeWidth="1" />
      <text x={x + 15} y={y + h / 2 + 3.5} fontSize="11.5" fill={strong ? "var(--surface)" : "currentColor"} fontFamily="var(--mono)" letterSpacing="0.02em">{children}</text>
    </g>
  );
}

function Label({ x, y, children, anchor = "start" }) {
  return <text x={x} y={y} fontSize="9" fill="currentColor" fillOpacity="0.55" textAnchor={anchor} fontFamily="var(--mono)" letterSpacing="0.16em">{children}</text>;
}

function RequestFlow() {
  const items = [
    "Public repo + question",
    "Bounded job queue",
    "Collect & index sources",
    "Hybrid retrieval + rerank",
    "Agent investigation",
    "Citation + grounding checks",
    "Cited report · uncertainty",
  ];
  const x = 170, w = 300, h = 50, gap = 26, top = 34;
  return (
    <svg viewBox="0 0 640 560" role="img" aria-label="WhyTheDiff request flow">
      <ArrowHead id="rf" />
      {items.map((label, i) => {
        const y = top + i * (h + gap);
        const strong = i === items.length - 1;
        return (
          <g key={label}>
            <Box x={x} y={y} w={w} h={h} strong={strong}>{label}</Box>
            {i < items.length - 1 && (
              <line x1={x + w / 2} y1={y + h} x2={x + w / 2} y2={y + h + gap} stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" markerEnd="url(#rf)" />
            )}
          </g>
        );
      })}
    </svg>
  );
}

function Retrieval() {
  const ingest = ["Source articles", "Chunks 500 / 75", "Embeddings", "pgvector store"];
  const query = ["Question", "Dense + keyword", "Rank fusion (RRF)", "Rerank", "Answer + sources"];
  const lx = 24, rx = 336, w = 280, h = 46, gap = 20;
  return (
    <svg viewBox="0 0 640 420" role="img" aria-label="RAG assistant retrieval pipeline">
      <ArrowHead id="rg" />
      <Label x={lx} y={20}>INGEST</Label>
      <Label x={rx} y={20}>QUERY</Label>
      {ingest.map((label, i) => {
        const y = 38 + i * (h + gap);
        return (
          <g key={label}>
            <Box x={lx} y={y} w={w} h={h}>{label}</Box>
            {i < ingest.length - 1 && <line x1={lx + w / 2} y1={y + h} x2={lx + w / 2} y2={y + h + gap} stroke="currentColor" strokeOpacity="0.35" markerEnd="url(#rg)" />}
          </g>
        );
      })}
      {query.map((label, i) => {
        const y = 38 + i * (h + gap);
        const strong = i === query.length - 1;
        return (
          <g key={label}>
            <Box x={rx} y={y} w={w} h={h} strong={strong}>{label}</Box>
            {i < query.length - 1 && <line x1={rx + w / 2} y1={y + h} x2={rx + w / 2} y2={y + h + gap} stroke="currentColor" strokeOpacity="0.35" markerEnd="url(#rg)" />}
          </g>
        );
      })}
      <line x1={lx + w} y1={38 + (h + gap) * 3 + h / 2} x2={rx} y2={38 + (h + gap) * 3 + h / 2} stroke="currentColor" strokeOpacity="0.25" strokeDasharray="3 4" markerEnd="url(#rg)" />
    </svg>
  );
}

function AgentLoop() {
  const items = ["Topic + session", "Recall memory", "Choose tool", "Validate + execute", "Append observation", "Save checkpoint"];
  const x = 150, w = 300, h = 50, gap = 22, top = 30;
  const lastY = top + (items.length - 1) * (h + gap);
  return (
    <svg viewBox="0 0 640 520" role="img" aria-label="Research briefing agent loop">
      <ArrowHead id="al" />
      {items.map((label, i) => {
        const y = top + i * (h + gap);
        const strong = i === 2;
        return (
          <g key={label}>
            <Box x={x} y={y} w={w} h={h} strong={strong}>{label}</Box>
            {i < items.length - 1 && <line x1={x + w / 2} y1={y + h} x2={x + w / 2} y2={y + h + gap} stroke="currentColor" strokeOpacity="0.35" markerEnd="url(#al)" />}
          </g>
        );
      })}
      <path d={`M ${x + w} ${lastY + h / 2} H 560 V ${top + 2 * (h + gap) + h / 2} H ${x + w}`} fill="none" stroke="currentColor" strokeOpacity="0.35" markerEnd="url(#al)" />
      <Label x={566} y={lastY + h / 2 - 10} anchor="start">REPEAT</Label>
      <line x1={x + w / 2} y1={lastY + h} x2={x + w / 2} y2={lastY + h + 30} stroke="currentColor" strokeOpacity="0.35" markerEnd="url(#al)" />
      <text x={x + w / 2 + 12} y={lastY + h + 26} fontSize="10.5" fill="currentColor" fillOpacity="0.7" fontFamily="var(--mono)">Briefing written</text>
    </svg>
  );
}

export default function ProjectDiagram({ type }) {
  return (
    <div className="diagram" aria-hidden="false">
      {type === "retrieval" ? <Retrieval /> : type === "agent-loop" ? <AgentLoop /> : <RequestFlow />}
    </div>
  );
}
