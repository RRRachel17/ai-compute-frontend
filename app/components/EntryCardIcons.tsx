export type EntryCardIconName = "usage" | "knowledge" | "chat" | "quality";

export function EntryCardIcon({ name }: { name: EntryCardIconName }) {
  switch (name) {
    case "usage":
      return <UsageCardIcon />;
    case "knowledge":
      return <KnowledgeCardIcon />;
    case "chat":
      return <ChatCardIcon />;
    case "quality":
      return <QualityCardIcon />;
  }
}

export function UsageCardIcon() {
  return (
    <div className="usage-card-bg" aria-hidden="true">
      <svg viewBox="0 0 220 180" role="img">
        <path
          className="usage-gauge usage-gauge-soft"
          d="M42 126a68 68 0 0 1 136 0"
        />
        <path
          className="usage-gauge usage-gauge-strong"
          d="M56 126a54 54 0 0 1 108 0"
        />
        <path
          className="usage-trend-line"
          d="M36 132l30-28 30 12 31-42 31 18 30-44"
        />
        <path className="usage-fill" d="M42 126a68 68 0 0 1 109-54l-39 55Z" />
        <circle className="usage-node" cx="66" cy="104" r="5" />
        <circle
          className="usage-node usage-node-delay"
          cx="127"
          cy="74"
          r="5"
        />
        <circle className="usage-node usage-node-soft" cx="188" cy="48" r="4" />
        <line className="usage-tick" x1="50" y1="126" x2="38" y2="126" />
        <line className="usage-tick" x1="72" y1="78" x2="64" y2="68" />
        <line className="usage-tick" x1="148" y1="78" x2="156" y2="68" />
        <line className="usage-tick" x1="170" y1="126" x2="182" y2="126" />
      </svg>
    </div>
  );
}

export function KnowledgeCardIcon() {
  return (
    <div className="knowledge-card-bg" aria-hidden="true">
      <div className="knowledge-card-bg-inner">
        <div className="knowledge-language-circle">
          <svg viewBox="0 0 220 220" role="img">
            <circle
              className="knowledge-ring knowledge-ring-soft"
              cx="110"
              cy="110"
              r="78"
            />
            <circle
              className="knowledge-ring knowledge-ring-strong"
              cx="110"
              cy="110"
              r="54"
            />
            <path
              className="knowledge-arc knowledge-arc-large"
              d="M45 132c18 46 90 54 126 18 34-34 26-93-13-119"
            />
            <path
              className="knowledge-arc knowledge-arc-small"
              d="M58 85c28-44 96-39 119 8 18 37-4 85-43 98"
            />
            <circle className="knowledge-node" cx="64" cy="78" r="6" />
            <circle className="knowledge-node" cx="170" cy="94" r="5" />
            <circle className="knowledge-node" cx="132" cy="178" r="4" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function ChatCardIcon() {
  return (
    <div className="chat-card-bg" aria-hidden="true">
      <svg viewBox="0 0 240 180" role="img">
        <path
          className="chat-flow-line chat-flow-line-primary"
          d="M28 122C54 70 97 58 128 88s58 34 88-16"
        />
        <path
          className="chat-flow-line chat-flow-line-secondary"
          d="M24 70c34 22 64 18 92-10 32-32 58-26 92 10"
        />
        <rect
          className="chat-bubble chat-bubble-left"
          x="26"
          y="30"
          width="76"
          height="42"
          rx="18"
        />
        <rect
          className="chat-bubble chat-bubble-right"
          x="128"
          y="96"
          width="84"
          height="44"
          rx="19"
        />
        <circle className="chat-dot chat-dot-one" cx="56" cy="51" r="4" />
        <circle className="chat-dot chat-dot-two" cx="72" cy="51" r="4" />
        <circle className="chat-dot chat-dot-three" cx="88" cy="51" r="4" />
        <circle className="chat-node" cx="126" cy="87" r="7" />
        <circle className="chat-node chat-node-soft" cx="202" cy="73" r="5" />
      </svg>
    </div>
  );
}

export function QualityCardIcon() {
  return (
    <div className="quality-card-bg" aria-hidden="true">
      <svg viewBox="0 0 220 220" role="img">
        <path
          className="quality-scan-frame"
          d="M52 44h116a16 16 0 0 1 16 16v100a16 16 0 0 1-16 16H52a16 16 0 0 1-16-16V60a16 16 0 0 1 16-16Z"
        />
        <path className="quality-check" d="M68 111l27 27 58-66" />
        <path
          className="quality-grid-line"
          d="M62 78h96M62 146h96M84 58v104M136 58v104"
        />
        <line className="quality-scan-line" x1="46" y1="96" x2="174" y2="96" />
        <circle className="quality-node" cx="62" cy="78" r="5" />
        <circle
          className="quality-node quality-node-delay"
          cx="158"
          cy="146"
          r="5"
        />
      </svg>
    </div>
  );
}
