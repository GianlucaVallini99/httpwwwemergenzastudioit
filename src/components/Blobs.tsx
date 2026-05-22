// Decorative organic blobs in flyer style.
// Server component — pure markup, no JS runtime needed.
// Position blobs ENTIRELY inside their section (no negative offsets) so
// they read as full round shapes, never clipped by section edges.

type BlobProps = {
  d: 0 | 1 | 2 | 3;
  x: string;
  y: string;
  size: number;
  color: string;
  dots?: 0 | 1 | 2 | 3;
  drift?: 1 | 2 | 3;
  rotate?: number;
  opacity?: number;
};

const BLOB_PATHS = [
  "M40,15 C70,5 130,0 160,30 C195,65 175,120 140,140 C100,165 50,150 25,120 C5,90 10,30 40,15 Z",
  "M30,80 C5,40 50,5 95,15 C135,25 165,60 155,100 C145,140 110,160 75,150 C45,140 50,115 30,80 Z",
  "M50,20 C90,5 140,20 155,55 C175,100 145,140 100,150 C55,160 20,130 15,90 C10,55 25,30 50,20 Z",
  "M60,10 C110,5 160,40 155,90 C150,130 110,155 70,150 C30,145 5,110 10,70 C15,35 35,15 60,10 Z",
];

export function Blob({ d, x, y, size, color, dots = 0, drift = 1, rotate = 0, opacity = 1 }: BlobProps) {
  return (
    <svg
      viewBox="0 0 170 170"
      style={{ left: x, top: y, width: size, height: size, opacity, transform: `rotate(${rotate}deg)` }}
      className={`b-drift-${drift}`}
      aria-hidden="true"
    >
      <path d={BLOB_PATHS[d]} fill={color} />
      {dots >= 1 && <circle cx="55" cy="60" r="6" fill="rgba(0,0,0,.18)" />}
      {dots >= 2 && <circle cx="85" cy="40" r="3.2" fill="rgba(0,0,0,.18)" />}
      {dots >= 3 && <circle cx="40" cy="95" r="2.4" fill="rgba(0,0,0,.18)" />}
    </svg>
  );
}

export function HeroBlobs() {
  return (
    <div className="blob-layer blob-layer--hero" aria-hidden="true">
      <Blob d={0} x="2%"  y="4%"  size={210} color="#0d4a52" drift={1} rotate={10}  dots={2} opacity={0.55} />
      <Blob d={1} x="15%" y="22%" size={110} color="#2d8a8a" drift={2} rotate={-20} opacity={0.5} />
      <Blob d={3} x="calc(100% - 240px)" y="2%"  size={220} color="#1d6b6b" drift={2} rotate={-15} dots={1} opacity={0.5} />
      <Blob d={1} x="calc(100% - 130px)" y="30%" size={100} color="#2d8a8a" drift={3} rotate={40}  opacity={0.45} />
      <Blob d={0} x="3%"  y="calc(100% - 210px)" size={200} color="#2d8a8a" drift={1} rotate={-30} dots={2} opacity={0.5} />
      <Blob d={2} x="22%" y="calc(100% - 130px)" size={110} color="#0d4a52" drift={2} rotate={5}   opacity={0.45} />
      <Blob d={3} x="calc(100% - 200px)" y="calc(100% - 220px)" size={180} color="#2d8a8a" drift={3} rotate={20} opacity={0.4} />
    </div>
  );
}

export function SectionBlobs({ variant = "a" }: { variant?: "a" | "b" | "c" }) {
  if (variant === "a") {
    return (
      <div className="blob-layer" aria-hidden="true">
        <Blob d={1} x="2%"  y="8%"  size={160} color="#0d4a52" drift={1} rotate={20}  dots={2} opacity={0.32} />
        <Blob d={2} x="calc(100% - 200px)" y="4%" size={190} color="#2d8a8a" drift={2} rotate={-20} opacity={0.35} />
        <Blob d={3} x="calc(100% - 160px)" y="calc(100% - 220px)" size={150} color="#1d6b6b" drift={3} rotate={30} opacity={0.28} />
      </div>
    );
  }
  if (variant === "b") {
    return (
      <div className="blob-layer" aria-hidden="true">
        <Blob d={2} x="3%" y="6%" size={210} color="#1d6b6b" drift={1} rotate={-15} dots={1} opacity={0.3} />
        <Blob d={0} x="calc(100% - 220px)" y="55%" size={200} color="#0d4a52" drift={2} rotate={25} dots={2} opacity={0.28} />
      </div>
    );
  }
  return (
    <div className="blob-layer" aria-hidden="true">
      <Blob d={1} x="calc(100% - 200px)" y="4%" size={180} color="#2d8a8a" drift={2} rotate={20} opacity={0.3} />
      <Blob d={3} x="3%" y="calc(100% - 220px)" size={200} color="#0d4a52" drift={1} rotate={-25} dots={2} opacity={0.28} />
    </div>
  );
}
