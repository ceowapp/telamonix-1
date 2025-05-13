interface DividerProps {
  width?: string;
  color?: string;
  className?: string;
}

const Divider: React.FC<DividerProps> = ({ 
  width = "w-full", 
  color = "border-[#D1D1D1]", 
  className = "" 
}) => {
  return (
    <div className={`border-t ${width} ${color} ${className}`} />
  );
};

export default Divider;