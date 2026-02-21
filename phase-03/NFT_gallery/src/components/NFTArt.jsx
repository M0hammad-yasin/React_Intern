/**
 * NFTArt — Generates unique SVG artwork for each NFT
 *
 * Instead of external images, each NFT gets a uniquely generated
 * SVG based on its metadata. This showcases creative CSS/SVG work
 * while keeping the project self-contained.
 *
 * In production, replace the <svg> with an <img src={nft.imageUrl} />
 */
const NFTArt = ({ nft, large = false }) => {
  const size = large ? 600 : 400;
  const seed = parseInt(nft.id, 10);

  // Deterministic pseudo-random from seed
  const rng = (n) => {
    const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };

  const renderArt = () => {
    switch (nft.pattern) {
      case 'abstract-1':
        return <AbstractFlowArt nft={nft} rng={rng} size={size} />;
      case 'abstract-2':
        return <AbstractWaveArt nft={nft} rng={rng} size={size} />;
      case 'photography-1':
        return <SolarArt nft={nft} rng={rng} size={size} />;
      case 'photography-2':
        return <ArchitectureArt nft={nft} rng={rng} size={size} />;
      case 'pixel-1':
        return <PixelGridArt nft={nft} rng={rng} size={size} seed={seed} />;
      case 'pixel-2':
        return <GhostArt nft={nft} rng={rng} size={size} />;
      case 'generative-1':
        return <ReactionDiffusionArt nft={nft} rng={rng} size={size} />;
      case 'generative-2':
        return <MatrixArt nft={nft} rng={rng} size={size} />;
      case '3d-1':
        return <Sculpture3DArt nft={nft} rng={rng} size={size} />;
      case '3d-2':
        return <ChromeArt nft={nft} rng={rng} size={size} />;
      case 'ai-1':
        return <LatentSpaceArt nft={nft} rng={rng} size={size} />;
      case 'ai-2':
        return <NeuralBloomArt nft={nft} rng={rng} size={size} />;
      default:
        return <AbstractFlowArt nft={nft} rng={rng} size={size} />;
    }
  };

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden="true"
    >
      <defs>
        <filter id={`blur-${nft.id}`}>
          <feGaussianBlur stdDeviation="2" />
        </filter>
        <filter id={`glow-${nft.id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      {renderArt()}
    </svg>
  );
};

/* ========== Art Generators ========== */

const AbstractFlowArt = ({ nft, rng, size: s }) => {
  const paths = Array.from({ length: 8 }, (_, i) => {
    const cx = rng(i * 4) * s;
    const cy = rng(i * 4 + 1) * s;
    const r  = 80 + rng(i * 4 + 2) * 120;
    return { cx, cy, r, opacity: 0.4 + rng(i) * 0.5 };
  });
  return (
    <g>
      <rect width={s} height={s} fill="#0D0020" />
      <defs>
        <radialGradient id="ag1" cx="30%" cy="40%">
          <stop offset="0%" stopColor="#9B6EFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0D0020" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ag2" cx="70%" cy="60%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0D0020" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={s * 0.3} cy={s * 0.4} rx={s * 0.4} ry={s * 0.35} fill="url(#ag1)" />
      <ellipse cx={s * 0.7} cy={s * 0.6} rx={s * 0.35} ry={s * 0.4} fill="url(#ag2)" />
      {paths.map((p, i) => (
        <circle key={i} cx={p.cx} cy={p.cy} r={p.r}
          fill="none" stroke={i % 2 ? '#9B6EFF' : '#00E5FF'}
          strokeWidth="0.5" strokeOpacity={p.opacity * 0.4}
        />
      ))}
      <line x1="0" y1={s * 0.5} x2={s} y2={s * 0.48} stroke="#00E5FF" strokeWidth="0.3" strokeOpacity="0.3" />
      <text x={s * 0.05} y={s * 0.95} fontFamily="monospace" fontSize={s * 0.03} fill="#9B6EFF" opacity="0.5">
        QD-001 // QUANTUM DRIFT
      </text>
    </g>
  );
};

const AbstractWaveArt = ({ nft, rng, size: s }) => {
  const waves = Array.from({ length: 12 }, (_, i) => {
    const y = (s / 12) * i + s * 0.1;
    const amp = 20 + rng(i) * 40;
    const points = Array.from({ length: 20 }, (_, j) => {
      const x = (s / 19) * j;
      const dy = Math.sin((j / 19) * Math.PI * (2 + rng(i)) + rng(i * 3) * 6) * amp;
      return `${x},${y + dy}`;
    }).join(' ');
    return { points, i };
  });
  return (
    <g>
      <rect width={s} height={s} fill="#1A0800" />
      <defs>
        <linearGradient id="wg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#FFB830" />
        </linearGradient>
      </defs>
      {waves.map(({ points, i }) => (
        <polyline key={i} points={points}
          fill="none"
          stroke={i < 6 ? '#FF6B35' : '#FFB830'}
          strokeWidth="1.5"
          strokeOpacity={0.3 + (i / 12) * 0.5}
        />
      ))}
      <text x={s * 0.05} y={s * 0.95} fontFamily="monospace" fontSize={s * 0.03} fill="#FF6B35" opacity="0.5">
        NM-007 // NEON MERIDIAN II
      </text>
    </g>
  );
};

const SolarArt = ({ rng, size: s }) => {
  const rays = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * Math.PI * 2;
    const len = s * (0.3 + rng(i) * 0.15);
    return { angle, len };
  });
  return (
    <g>
      <rect width={s} height={s} fill="#1A0E00" />
      <defs>
        <radialGradient id="solar" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#FFF8D0" stopOpacity="1" />
          <stop offset="20%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#FF8800" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#1A0E00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="corona" cx="50%" cy="50%">
          <stop offset="50%" stopColor="transparent" />
          <stop offset="70%" stopColor="#FFD700" stopOpacity="0.2" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx={s / 2} cy={s / 2} r={s * 0.45} fill="url(#corona)" />
      {rays.map((r, i) => (
        <line key={i}
          x1={s / 2 + Math.cos(r.angle) * s * 0.12}
          y1={s / 2 + Math.sin(r.angle) * s * 0.12}
          x2={s / 2 + Math.cos(r.angle) * r.len}
          y2={s / 2 + Math.sin(r.angle) * r.len}
          stroke="#FFD700" strokeWidth="0.8" strokeOpacity="0.4"
        />
      ))}
      <circle cx={s / 2} cy={s / 2} r={s * 0.12} fill="url(#solar)" />
    </g>
  );
};

const ArchitectureArt = ({ rng, size: s }) => {
  const servers = Array.from({ length: 6 }, (_, row) =>
    Array.from({ length: 4 }, (_, col) => ({ row, col }))
  ).flat();
  return (
    <g>
      <rect width={s} height={s} fill="#000814" />
      {servers.map(({ row, col }, i) => {
        const x = s * 0.1 + col * (s * 0.22);
        const y = s * 0.08 + row * (s * 0.15);
        return (
          <g key={i}>
            <rect x={x} y={y} width={s * 0.18} height={s * 0.12}
              rx="3" fill="#001428" stroke="#003366" strokeWidth="0.5" strokeOpacity="0.8"
            />
            <circle cx={x + s * 0.03} cy={y + s * 0.06} r={s * 0.01}
              fill={rng(i) > 0.5 ? '#4488FF' : '#4DFFB4'}
              opacity={0.6 + rng(i * 2) * 0.4}
            />
          </g>
        );
      })}
      <defs>
        <radialGradient id="arch" cx="50%" cy="80%">
          <stop offset="0%" stopColor="#4488FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width={s} height={s} fill="url(#arch)" />
    </g>
  );
};

const PixelGridArt = ({ rng, size: s, seed }) => {
  const GRID = 16;
  const cell = s / GRID;
  const pixels = Array.from({ length: GRID * GRID }, (_, i) => i);
  const palette = ['#000D1A', '#001A33', '#003366', '#0055AA', '#00E5FF', '#33EEFF', '#80F4FF'];
  return (
    <g>
      {pixels.map((i) => {
        const x = (i % GRID) * cell;
        const y = Math.floor(i / GRID) * cell;
        const v = rng(i + seed * 0.1);
        const colorIdx = v < 0.5 ? 0 : v < 0.7 ? 1 : v < 0.82 ? 2 : v < 0.9 ? 3 : v < 0.95 ? 4 : v < 0.98 ? 5 : 6;
        return (
          <rect key={i} x={x} y={y} width={cell} height={cell}
            fill={palette[colorIdx]}
          />
        );
      })}
      <text x={s * 0.05} y={s * 0.95} fontFamily="monospace" fontSize={s * 0.04} fill="#00E5FF" opacity="0.6">
        CV_003
      </text>
    </g>
  );
};

const GhostArt = ({ rng, size: s }) => {
  const pixels = [
    [0,0,1,1,1,1,0,0],
    [0,1,1,1,1,1,1,0],
    [1,1,0,1,1,0,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1],
    [1,0,1,1,1,1,0,1],
  ];
  const cell = s / 10;
  const ox = s * 0.1, oy = s * 0.1;
  return (
    <g>
      <rect width={s} height={s} fill="#080C14" />
      {pixels.map((row, ri) =>
        row.map((on, ci) =>
          on ? (
            <rect key={`${ri}-${ci}`}
              x={ox + ci * cell} y={oy + ri * cell}
              width={cell - 1} height={cell - 1}
              fill={ri < 2 || (ri === 2 && (ci === 2 || ci === 5)) ? '#ffffff' : '#B0C4DE'}
            />
          ) : null
        )
      )}
      <text x={s * 0.05} y={s * 0.95} fontFamily="monospace" fontSize={s * 0.04} fill="#4488FF" opacity="0.5">
        GP_008
      </text>
    </g>
  );
};

const ReactionDiffusionArt = ({ rng, size: s }) => {
  const spots = Array.from({ length: 30 }, (_, i) => ({
    cx: rng(i * 2) * s,
    cy: rng(i * 2 + 1) * s,
    r: 20 + rng(i * 3) * 60,
    opacity: 0.05 + rng(i) * 0.2,
  }));
  return (
    <g>
      <rect width={s} height={s} fill="#1A001A" />
      <defs>
        <filter id="rd-blur">
          <feGaussianBlur stdDeviation="12" />
        </filter>
      </defs>
      {spots.map((sp, i) => (
        <circle key={i} cx={sp.cx} cy={sp.cy} r={sp.r}
          fill={i % 3 === 0 ? '#FF4D8D' : i % 3 === 1 ? '#660033' : '#330033'}
          opacity={sp.opacity}
          filter="url(#rd-blur)"
        />
      ))}
      {Array.from({ length: 20 }, (_, i) => (
        <circle key={`ring-${i}`}
          cx={rng(i + 100) * s} cy={rng(i + 200) * s}
          r={5 + rng(i) * 20}
          fill="none"
          stroke="#FF4D8D"
          strokeWidth="0.5"
          strokeOpacity="0.3"
        />
      ))}
      <text x={s * 0.05} y={s * 0.95} fontFamily="monospace" fontSize={s * 0.03} fill="#FF4D8D" opacity="0.5">
        MV4 // MORPHOGENESIS
      </text>
    </g>
  );
};

const MatrixArt = ({ rng, size: s }) => {
  const chars = '01アイウエオカキク'.split('');
  const cols = 20;
  const rows = 20;
  return (
    <g>
      <rect width={s} height={s} fill="#001A04" />
      {Array.from({ length: cols * rows }, (_, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const v = rng(i);
        const char = chars[Math.floor(v * chars.length)];
        const brightness = v > 0.95 ? '#7AFF8A' : v > 0.8 ? '#4DB858' : '#1A6626';
        return (
          <text key={i}
            x={(col / cols) * s + s / cols / 2}
            y={(row / rows) * s + s / rows * 0.8}
            fontFamily="monospace"
            fontSize={s / cols * 0.8}
            fill={brightness}
            textAnchor="middle"
            opacity={0.3 + v * 0.7}
          >
            {char}
          </text>
        );
      })}
    </g>
  );
};

const Sculpture3DArt = ({ rng, size: s }) => {
  const rings = Array.from({ length: 8 }, (_, i) => {
    const ry = s * (0.05 + i * 0.04);
    const rx = s * (0.28 - Math.abs(i - 3.5) * 0.04);
    const cy = s * 0.5 + (i - 3.5) * s * 0.06;
    return { rx, ry, cy };
  });
  return (
    <g>
      <rect width={s} height={s} fill="#050810" />
      <defs>
        <radialGradient id="sculpt" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#8A9BBE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1A2040" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <ellipse cx={s / 2} cy={s / 2} rx={s * 0.28} ry={s * 0.35} fill="url(#sculpt)" />
      {rings.map((r, i) => (
        <ellipse key={i} cx={s / 2} cy={r.cy} rx={r.rx} ry={r.ry}
          fill="none" stroke="#8A9BBE" strokeWidth="0.8" strokeOpacity="0.4"
        />
      ))}
      {/* Highlight */}
      <ellipse cx={s * 0.38} cy={s * 0.35} rx={s * 0.06} ry={s * 0.08}
        fill="white" opacity="0.15"
      />
    </g>
  );
};

const ChromeArt = ({ rng, size: s }) => {
  return (
    <g>
      <rect width={s} height={s} fill="#060810" />
      <defs>
        <linearGradient id="chrome-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8899CC" />
          <stop offset="25%" stopColor="#C0D8FF" />
          <stop offset="50%" stopColor="#3344AA" />
          <stop offset="75%" stopColor="#C0D8FF" />
          <stop offset="100%" stopColor="#8899CC" />
        </linearGradient>
        <radialGradient id="chrome-body" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="40%" stopColor="#C0D8FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#182040" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {/* Body */}
      <ellipse cx={s / 2} cy={s * 0.55} rx={s * 0.22} ry={s * 0.32} fill="url(#chrome-body)" />
      {/* Head */}
      <circle cx={s / 2} cy={s * 0.28} r={s * 0.14} fill="url(#chrome-body)" />
      {/* Reflection lines */}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i}
          x1={s * 0.28 + rng(i) * s * 0.1} y1={s * 0.55 + i * s * 0.04}
          x2={s * 0.72 - rng(i) * s * 0.1} y2={s * 0.55 + i * s * 0.04}
          stroke="#C0D8FF" strokeWidth="0.3" strokeOpacity="0.3"
        />
      ))}
      {/* Highlight */}
      <ellipse cx={s * 0.43} cy={s * 0.24} rx={s * 0.04} ry={s * 0.06} fill="white" opacity="0.4" />
    </g>
  );
};

const LatentSpaceArt = ({ rng, size: s }) => {
  const points = Array.from({ length: 200 }, (_, i) => ({
    x: rng(i * 2) * s,
    y: rng(i * 2 + 1) * s,
    r: 1 + rng(i * 3) * 4,
    c: rng(i) > 0.5 ? '#4DFFB4' : rng(i) > 0.25 ? '#00E5FF' : '#007755',
    op: 0.2 + rng(i) * 0.7,
  }));
  return (
    <g>
      <rect width={s} height={s} fill="#001A0D" />
      <defs>
        <filter id="ls-blur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {/* Connections */}
      {points.slice(0, 40).map((p, i) => {
        const next = points[(i + 1) % 40];
        const dist = Math.hypot(next.x - p.x, next.y - p.y);
        if (dist > s * 0.3) return null;
        return (
          <line key={`l${i}`} x1={p.x} y1={p.y} x2={next.x} y2={next.y}
            stroke="#4DFFB4" strokeWidth="0.4" strokeOpacity="0.15"
          />
        );
      })}
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r}
          fill={p.c} opacity={p.op}
        />
      ))}
      <text x={s * 0.05} y={s * 0.95} fontFamily="monospace" fontSize={s * 0.03} fill="#4DFFB4" opacity="0.5">
        LATENT_SPACE_7 // seed:8847291
      </text>
    </g>
  );
};

const NeuralBloomArt = ({ rng, size: s }) => {
  const petals = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const r = s * 0.18;
    return {
      x: s / 2 + Math.cos(angle) * r,
      y: s / 2 + Math.sin(angle) * r,
      rx: s * (0.04 + rng(i) * 0.06),
      ry: s * (0.08 + rng(i + 10) * 0.08),
      angle: (angle * 180) / Math.PI,
    };
  });
  return (
    <g>
      <rect width={s} height={s} fill="#1A001A" />
      <defs>
        <radialGradient id="bloom-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#5C0066" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#1A001A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={s / 2} cy={s / 2} r={s * 0.42} fill="url(#bloom-bg)" />
      {petals.map((p, i) => (
        <ellipse key={i}
          cx={p.x} cy={p.y} rx={p.rx} ry={p.ry}
          fill="#FF9EFF" fillOpacity="0.25"
          stroke="#FF9EFF" strokeWidth="0.5" strokeOpacity="0.5"
          transform={`rotate(${p.angle}, ${p.x}, ${p.y})`}
        />
      ))}
      {/* Center */}
      <circle cx={s / 2} cy={s / 2} r={s * 0.06} fill="#FF9EFF" opacity="0.7" />
      <circle cx={s / 2} cy={s / 2} r={s * 0.03} fill="white" opacity="0.5" />
    </g>
  );
};

export default NFTArt;
