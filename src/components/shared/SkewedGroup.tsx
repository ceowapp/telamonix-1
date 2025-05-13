import Image from "next/image";
import SkewedRectangle from './SkewedRectangle';

export default function SkewedGroup() {
  return (
    <div className="relative w-full">
      <SkewedRectangle
        color="#7A73FF"
        skewDeg={-3}
        width={330}
        height={50}
        style={{ zIndex: 0, opacity: '80%' }}
      />
      <SkewedRectangle
        color="#00D4FF"
        skewDeg={-3}
        width={260}
        height={50}
        style={{ marginTop: '-36px', zIndex: 1, opacity: '80%' }}
      />
    </div>
  );
}

