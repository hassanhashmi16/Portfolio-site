import React from "react";

// Minimal, safe inline markup renderer.
// Supports **bold**, *italic*, ==highlight== and newlines -> <br/>.
// Produces React nodes only; never injects raw HTML.

const TOKEN = /\*\*[\s\S]+?\*\*|==[\s\S]+?==|\*[^*\n]+?\*/g;

function renderInline(line, prefix) {
  const nodes = [];
  const re = new RegExp(TOKEN.source, "g");
  let lastIndex = 0;
  let match;
  let i = 0;

  while ((match = re.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }
    const token = match[0];
    const key = `${prefix}-${i}`;
    if (token.startsWith("**")) {
      nodes.push(<strong key={key}>{renderInline(token.slice(2, -2), key)}</strong>);
    } else if (token.startsWith("==")) {
      nodes.push(<span className="mark" key={key}>{renderInline(token.slice(2, -2), key)}</span>);
    } else {
      nodes.push(<em key={key}>{renderInline(token.slice(1, -1), key)}</em>);
    }
    lastIndex = match.index + token.length;
    i += 1;
  }

  if (lastIndex < line.length) nodes.push(line.slice(lastIndex));
  return nodes;
}

export default function RichText({ text = "", as: Tag = "span", className }) {
  const lines = String(text).split("\n");
  const nodes = [];
  lines.forEach((line, index) => {
    if (index > 0) nodes.push(<br key={`br-${index}`} />);
    nodes.push(...renderInline(line, `l${index}`));
  });
  return <Tag className={className}>{nodes}</Tag>;
}
