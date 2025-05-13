import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface SectionImageProps {
  src: string;
  alt?: string;
  position?: "default" | "top" | "bottom" | "left" | "right" | "center" | "absolute";
  priority?: boolean;
  width?: string;
  height?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  customPosition?: React.CSSProperties;
  className?: string;
  overlay?: boolean;
  overlayContent?: React.ReactNode;
  overlayTitle?: string;
  overlayDescription?: string;
  overlayPosition?: "top" | "bottom" | "center";
  overlayClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  imageClassName?: string;
  onClick?: () => void;
  loading?: "lazy" | "eager";
  sizes?: string;
  quality?: number;
}

export interface ButtonProps {
  text: string;
  variant?: "primary" | "secondary" | "magic" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  onClick?: () => void;
}

export interface SectionTextProps {
  title?: string;
  subtitle?: string;
  description?: string;
  textColor?: string;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  button?: React.ReactNode;
  buttonClassname?: string;
  align?: "left" | "center" | "right";
  width?: string;
  titleTag?: React.ElementType;
  subtitleTag?: React.ElementType;
  padding?: string;
  listItems?: Array<{
    title?: string;
    content?: React.ReactNode;
  }>;
  listStyle?: "bullet" | "numbered" | "checkmark" | "none";
  listDirection?: "vertical" | "horizontal";
  contentLayout?: "default" | "columns" | "cards";
  children?: React.ReactNode;
}

export interface SectionContainerProps {
  background?: string;
  backgroundImage?: string;
  backgroundBlurImage?: string;
  backgroundOverlayClassName?: string;
  backgroundOverlay?: string;
  className?: string;
  children: React.ReactNode;
  fullHeight?: boolean;
  padding?: string;
  gap?: string;
  direction?: string;
  alignItems?: string;
  justifyContent?: string;
  containerWidth?: string;
  rounded?: boolean;
  shadow?: boolean;
  id?: string;
}

export interface SectionFeatureProps {
  icon?: React.ReactNode | string;
  iconBg?: string;
  title?: string;
  description?: string;
  className?: string;
  iconSize?: string;
  align?: "left" | "center" | "right";
}

export interface SectionGridProps {
  children: React.ReactNode;
  columns?: string;
  gap?: string;
  className?: string;
}

export const SectionImage = ({ 
 src, 
 alt = "Card image",
 position = "default", 
 priority = false,
 width,
 height,
 objectFit = "contain",
 customPosition = {},
 className = "",
 overlay = false,
 overlayContent,
 overlayTitle,
 overlayDescription,
 overlayPosition = "bottom",
 overlayClassName,
 titleClassName,
 descriptionClassName,
 imageClassName,
 onClick,
 loading = 'lazy',
 sizes = "(max-width: 768px) 100vw, 50vw",
 quality = 100
}) => {
 const positionClasses = {
   default: "w-full md:w-1/2 p-4",
   top: "w-full p-4 order-first",
   bottom: "w-full p-4 order-last",
   left: "w-full md:w-1/2 p-4 order-first md:order-first",
   right: "w-full md:w-1/2 p-4 order-first md:order-last",
   center: "w-full md:w-1/2 p-4 mx-auto",
   absolute: "absolute inset-0",
 };
 
 const imageHeight = height || "h-[300px] md:h-[300px] lg:h-[400px]";
 const imageWidth = width || "w-full";
 
 return (
   <div 
     className={cn(
       positionClasses[position] || positionClasses.default,
       className
     )}
     style={Object.keys(customPosition).length > 0 ? { position: 'relative', ...customPosition } : {}}
     onClick={onClick}
   >
     <div className={cn("relative", imageWidth, imageHeight, imageClassName)}>
       <Image
         src={src}
         alt={alt}
         fill
         priority={priority}
         quality={quality}
         sizes={sizes}
         className={cn(`object-${objectFit}`)}
       />
       
       {overlay && (
         <div className={cn(
           "absolute z-10 p-4",
           overlayPosition === "top" && "top-0 left-0 right-0",
           overlayPosition === "bottom" && "bottom-0 left-0 right-0",
           overlayPosition === "center" && "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
           "bg-black/50",
           overlayClassName
         )}>
           {overlayContent || (
             <>
               {overlayTitle && (
                 <h3 className={cn("text-white text-lg font-bold", titleClassName)}>
                   {overlayTitle}
                 </h3>
               )}
               {overlayDescription && (
                 <p className={cn("text-white text-sm", descriptionClassName)}>
                   {overlayDescription}
                 </p>
               )}
             </>
           )}
         </div>
       )}
     </div>
   </div>
 );
};

interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'magic' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  variant = 'magic',
  size = 'md',
  className,
  icon,
  iconPosition = 'left',
  onClick,
}) => {
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    magic: 'bg-violet-600 hover:bg-violet-700 text-label-regular-white',
    outline: 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
    link: 'bg-transparent underline text-blue-600 hover:text-blue-800 p-0',
  };

  const sizeClasses = {
    sm: 'text-sm px-3 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  };

  return (
    <button
      onClick={onClick}
      aria-label={text}
      className={cn(
        'flex items-center justify-center transition-colors duration-200',
        'rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
        variantClasses[variant],
        sizeClasses[size],
        variant !== 'link' && 'font-medium',
        className
      )}
    >
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {text}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export const SectionText = ({ 
 title, 
 subtitle, 
 description,
 textColor = "text-white",
 className = "",
 titleClassName = "",
 subtitleClassName = "",
 descriptionClassName = "",
 button,
 buttonClassname,
 align = "left",
 width = "w-full md:w-1/2",
 titleTag: TitleTag = "h1",
 subtitleTag: SubtitleTag = "h3",
 padding = "p-6 md:p-8",
 listItems = [],
 listStyle = "bullet",
 listDirection = "vertical",
 contentLayout = "default",
 children
}) => {
 const alignmentClasses = {
   left: "text-left",
   center: "text-center items-center",
   right: "text-right items-end"
 };

 return (
   <div className={cn(
     width,
     padding,
     "flex flex-col justify-center",
     textColor,
     alignmentClasses[align],
     className
   )}>
     {title && (
       <TitleTag className={cn(
         titleClassName
       )}>
         {title}
       </TitleTag>
     )}
     
     {subtitle && (
       <SubtitleTag className={cn(
         subtitleClassName
       )}>
         {subtitle}
       </SubtitleTag>
     )}
     
     {description && (
       <p className={cn(
         descriptionClassName
       )}>
         {description}
       </p>
     )}
     
     {listItems && Array.isArray(listItems) && listItems.length > 0 && (
       <div className={cn(
         "mt-4",
         contentLayout === "columns" && "grid grid-cols-1 md:grid-cols-2 gap-4",
         contentLayout === "cards" && "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
       )}>
         {listItems.map((item, index) => {
           const itemClass = cn(
             "mb-3",
             contentLayout === "cards" && "bg-gray-50 p-3 rounded-md shadow-sm"
           );
           
           const listItemIndicator = () => {
             switch(listStyle) {
               case "bullet":
                 return <span className="mr-2 text-blue-500">•</span>;
               case "numbered":
                 return <span className="mr-2 font-semibold text-blue-500">{index + 1}.</span>;
               case "checkmark":
                 return <span className="mr-2 text-green-500">✓</span>;
               default:
                 return null;
             }
           };

           return (
             <div key={index} className={itemClass}>
               <div className={cn(
                 "flex",
                 listDirection === "horizontal" && "items-center",
                 listDirection === "vertical" && "flex-col"
               )}>
                 <div className={cn(
                   "flex",
                   listDirection === "horizontal" && "mr-4",
                   listDirection === "vertical" && "w-full"
                 )}>
                   {listStyle !== "none" && listItemIndicator()}
                   {item.title && (
                     <span className={cn(
                       "",
                       listDirection === "vertical" ? "block mb-1" : "inline-block"
                     )}>
                       {item.title}
                     </span>
                   )}
                 </div>
                 {item.content && (
                   <div className={cn(
                     "text-gray-700 text-sm",
                     listDirection === "horizontal" && "flex-1"
                   )}>
                     {item.content}
                   </div>
                 )}
               </div>
             </div>
           );
         })}
       </div>
     )}
     {button && (
       <div className={cn(
         "flex",
         buttonClassname

       )}>
         {button}
       </div>
     )}
     {children}
   </div>
 );
};

export const SectionContainer = ({ 
 background = "#0f1e4b",
 backgroundImage,
 backgroundBlurImage,
 backgroundOverlay,
 backgroundImageClassName,
 backgroundOverlayClassName,
 className = "",
 children,
 fullHeight = false,
 padding = "py-12 px-4",
 gap = "gap-4 md:gap-8",
 direction = "flex-col md:flex-row",
 alignItems = "items-center",
 justifyContent = "justify-between",
 containerWidth = "mx-auto",
 rounded = false,
 shadow = false,
 id
}) => {
 return (
   <section 
     className={cn(
       "relative overflow-hidden w-full",
       fullHeight && "min-h-screen",
       padding,
       rounded && "rounded-xl",
       shadow && "shadow-xl",
       className
     )}
     id={id}
   >
     {backgroundImage ? (
       <div className="absolute inset-0 z-11">
         <Image
           src={backgroundImage}
           alt="Background"
           fill
           priority
           quality={100}
           placeholder="blur"
           blurDataURL={backgroundBlurImage}
           className={cn("object-cover bg-blend-overlay", backgroundImageClassName)}
         />
         {backgroundOverlay && (
           <div 
             className={cn(
              "absolute inset-0",
              backgroundOverlayClassName,
             )}
             style={{ background: backgroundOverlay, backdropFilter: 'blur(400px)' }}
           ></div>
         )}
       </div>
     ) : (
       <div 
         className="absolute inset-0 z-0" 
         style={{ background }}
       ></div>
     )}
     <div className={cn(
       "relative z-10 w-full",
       containerWidth
     )}>
       <div className={cn(
         "flex w-full",
         direction,
         gap,
         alignItems,
         justifyContent
       )}>
         {children}
       </div>
     </div>
   </section>
 );
};

export const SectionFeature = ({
 icon,
 iconBg = "bg-blue-500",
 title,
 description,
 className = "",
 iconSize = "w-12 h-12",
 align = "left"
}) => {
 const alignmentClasses = {
   left: "text-left",
   center: "text-center items-center",
   right: "text-right items-end"
 };

 return (
   <div className={cn(
     "flex flex-col p-4",
     alignmentClasses[align],
     className
   )}>
     {icon && (
       <div className={cn(
         "rounded-full flex items-center justify-center mb-4",
         iconBg,
         iconSize,
         align === "center" && "mx-auto"
       )}>
         {typeof icon === 'string' ? (
           <Image
             src={icon}
             alt={title || "Feature icon"}
             width={48}
             height={48}
             className="object-contain"
           />
         ) : (
           icon
         )}
       </div>
     )}
     
     {title && (
       <h3 className="text-lg md:text-xl font-semibold mb-2">
         {title}
       </h3>
     )}
     
     {description && (
       <p className="text-sm md:text-base text-gray-600">
         {description}
       </p>
     )}
   </div>
 );
};

export const SectionGrid = ({
 children,
 columns = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
 gap = "gap-6",
 className = ""
}) => {
 return (
   <div className={cn(
     "grid w-full",
     columns,
     gap,
     className
   )}>
     {children}
   </div>
 );
};


