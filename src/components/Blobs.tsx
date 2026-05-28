// Decorative round blobs — server component, no JS runtime needed.

type BlobProps = {
  x: string;
  y: string;
  size: number;
  color: string;
  drift?: 1 | 2 | 3;
  opacity?: number;
};

const BLOB_RADIUS = 80;

export function Blob({ x, y, size, color, drift = 1, opacity = 1 }: BlobProps) {
  return (
    <svg
      viewBox="0 0 170 170"
      style={{ left: x, top: y, width: size, height: size, opacity }}
      className={`b-drift-${drift}`}
      aria-hidden="true"
    >
      <circle cx="85" cy="85" r={BLOB_RADIUS} fill={color} />
    </svg>
  );
}

export function HeroBlobs() {
  return (
    <div className="blob-layer blob-layer--hero" aria-hidden="true">
      <Blob x="2%"  y="4%"  size={210} color="#0d4a52" drift={1} opacity={0.55} />
      <Blob x="15%" y="22%" size={110} color="#2d8a8a" drift={2} opacity={0.5} />
      <Blob x="calc(100% - 240px)" y="2%"  size={220} color="#1d6b6b" drift={2} opacity={0.5} />
      <Blob x="calc(100% - 130px)" y="30%" size={100} color="#2d8a8a" drift={3} opacity={0.45} />
      <Blob x="3%"  y="calc(100% - 210px)" size={200} color="#2d8a8a" drift={1} opacity={0.5} />
      <Blob x="22%" y="calc(100% - 130px)" size={110} color="#0d4a52" drift={2} opacity={0.45} />
      <Blob x="calc(100% - 200px)" y="calc(100% - 220px)" size={180} color="#2d8a8a" drift={3} opacity={0.4} />
    </div>
  );
}

export function SectionBlobs({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  if (variant === "a") {
    return (
      <div className="blob-layer" aria-hidden="true">
        <Blob x="2%"  y="8%"  size={160} color="#0d4a52" drift={1} opacity={0.32} />
        <Blob x="calc(100% - 200px)" y="4%" size={190} color="#2d8a8a" drift={2} opacity={0.35} />
        <Blob x="calc(100% - 160px)" y="calc(100% - 220px)" size={150} color="#1d6b6b" drift={3} opacity={0.28} />
      </div>
    );
  }
  if (variant === "b") {
    return (
      <div className="blob-layer" aria-hidden="true">
        <Blob x="3%" y="6%" size={210} color="#1d6b6b" drift={1} opacity={0.3} />
        <Blob x="calc(100% - 220px)" y="55%" size={200} color="#0d4a52" drift={2} opacity={0.28} />
      </div>
    );
  }
  return (
    <div className="blob-layer" aria-hidden="true">
      <Blob x="calc(100% - 200px)" y="4%" size={180} color="#2d8a8a" drift={2} opacity={0.3} />
      <Blob x="3%" y="calc(100% - 220px)" size={200} color="#0d4a52" drift={1} opacity={0.28} />
    </div>
  );
}
