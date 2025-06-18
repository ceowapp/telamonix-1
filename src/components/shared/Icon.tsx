import Image from 'next/image';

const Icon = ({ src, alt, size = 24, className = '' }) => {
  return (
    <div className={`relative flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt || 'Icon'}
        fill
        className="object-contain"
      />
    </div>
  );
};

export default Icon;