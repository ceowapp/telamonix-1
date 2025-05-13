import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import RichText from "./RichText";

interface ListItem {
  title?: string;
  content?: string;
}

interface CardProps {
  variant?: 'default' | 'vertical' | 'horizontal' | 'overlay';
  title?: string;
  subtitle?: string;
  description?: string;
  content?: string | React.ReactNode;
  date?: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  layoutClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
  listItems?: ListItem[];
  imageClassName?: string;
  imageClasses?: string;
  contentClassName?: string;
  longContentClassName?: string;
  button?: React.ReactNode;
  buttonClassname?: string;
  cardStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
  subtitleStyle?: React.CSSProperties;
  descriptionStyle?: React.CSSProperties;
  listTitleClassName?: string;
  listContentClassName?: string;
  dateStyle?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  insetStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  children?: React.ReactNode;
  onClick?: () => void;
  overlayPosition?: 'top' | 'bottom' | 'center' | 'full';
  listStyle?: "bullet" | "numbered" | "checkmark" | "none";
  listDirection?: "vertical" | "horizontal";
  contentLayout?: "standard" | "columns" | "cards";
  overlayGradient?: string;
}

const Card: React.FC<CardProps> = ({
  variant = 'default',
  imageWidth,
  imageHeight,
  imagePosition = 'top',
  title,
  subtitle,
  description,
  content,
  listItems,
  listStyle,
  listDirection,
  date,
  image,
  className,
  layoutClassName,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  listTitleClassName = "",
  listContentClassName = "",
  dateClassName,
  children,
  imageClassName,
  button,
  buttonClassname,
  imageClasses,
  contentClassName,
  longContentClassName,
  contentLayout,
  cardStyle,
  titleStyle,
  subtitleStyle,
  descriptionStyle,
  dateStyle,
  imageStyle,
  insetStyle,
  contentStyle,
  onClick,
  overlayPosition = 'bottom',
  overlayGradient = 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
}) => {
  const containerClasses = cn(
    "overflow-hidden transition-all duration-300 relative",
    variant === 'default' && "w-full cursor-pointer",
    variant === 'vertical' && "flex w-full",
    variant === 'horizontal' && "flex max-w-fit",
    variant === 'overlay' && "w-full rounded-xl relative",
    variant === 'horizontal' && imagePosition === 'right' && "flex-row",
    variant === 'horizontal' && imagePosition === 'left' && "flex-row-reverse",
    variant === 'vertical' && imagePosition === 'bottom' && "flex-col-reverse",
    className
  );

  const imageContainerClasses = cn(
    "overflow-hidden",
    variant === 'default' && "relative w-full",
    variant === 'vertical' && "p-4 rounded-3xl",
    variant === 'horizontal' && (imageWidth && imageHeight ? 
      "flex items-center rounded-md" : 
      "relative w-full h-full flex-shrink-0"),
    variant === 'overlay' && "absolute inset-0 w-full h-full",
    imageClassName
  );

  const computedImageClasses = cn(
    variant === 'default' && "transition-transform duration-300",
    variant === 'default' && !insetStyle && "w-full h-full object-cover rounded-2xl",
    variant !== 'default' && variant !== 'overlay' && "object-cover rounded-md",
    variant === 'overlay' && "object-cover w-full h-full",
    imageClasses
  );

  const overlayClasses = cn(
    "absolute z-10",
    overlayPosition === 'bottom' && "bottom-0 left-0 right-0",
    overlayPosition === 'top' && "top-0 left-0 right-0",
    overlayPosition === 'center' && "flex items-center justify-center inset-0",
    overlayPosition === 'full' && "inset-0",
  );

  const contentContainerClasses = cn(
    variant === 'default' && "flex flex-col flex-grow",
    variant === 'horizontal' && "flex flex-col justify-start items-start flex-grow",
    variant === 'vertical' && imagePosition === 'top' && "relative mt-4",
    variant === 'vertical' && imagePosition === 'bottom' && "mb-4",
    variant === 'overlay' && "relative z-20 p-4",
    contentClassName
  );

  const defaultLayoutClasses = cn(
    "relative w-full h-full",
    variant === 'horizontal' && "flex justify-start items-start gap-3",
    variant === 'default' && "p-3 sm:p-4 flex",
    variant === 'default' && (imagePosition === 'top' || imagePosition === 'left') && "flex-col",
    variant === 'default' && imagePosition === 'bottom' && "flex-col-reverse",
    variant === 'default' && imagePosition === 'right' && "flex-row",
    variant === 'default' && imagePosition === 'left' && "flex-row-reverse",
    layoutClassName
  );

  return (
    <div 
      className={containerClasses}
      style={cardStyle}
      onClick={onClick}
    >
      {insetStyle && variant === 'default' && (
        <div 
          className="absolute inset-0 rounded-2xl"
          style={insetStyle}
        />
      )}
      
      {variant === 'overlay' ? (
        <>
          {image && (
            <div className={imageContainerClasses} style={imageStyle}>
              <Image
                src={image}
                alt={title || "Card image"}
                fill
                className={computedImageClasses}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                priority
              />
            </div>
          )}
          
          {overlayPosition && (
            <div 
              className={overlayClasses}
              style={{ 
                background: overlayGradient,
                height: overlayPosition === 'bottom' ? '50%' : overlayPosition === 'top' ? '50%' : '100%'
              }}
            />
          )}
          
          <div className={contentContainerClasses} style={contentStyle}>
            {title && (
              <h3 
                className={cn(
                  "font-semibold mb-2 text-white",
                  titleClassName
                )}
                style={titleStyle}
              >
                {title}
              </h3>
            )}
            
            {subtitle && (
              <h3 
                className={cn(
                  "text-gray-200",
                  subtitleClassName
                )}
                style={subtitleStyle}
              >
                {subtitle}
              </h3>
            )}
            {date && (
              <p 
                className={cn(
                  "text-gray-300 text-xs sm:text-sm mb-2",
                  dateClassName
                )}
                style={dateStyle}
              >
                {date}
              </p>
            )}
            {description && (
              <p 
                className={cn(
                  "text-gray-200",
                  descriptionClassName
                )}
                style={descriptionStyle}
              >
                {description}
              </p>
            )}
            {content && (
              <RichText 
                className={longContentClassName}       
                data={content} 
                enableGutter={false} 
              />
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
                        return <span className="mr-2 text-grey-500">•</span>;
                      case "numbered":
                        return <span className="mr-2 font-semibold text-grey-500">{index + 1}.</span>;
                      case "checkmark":
                        return <span className="mr-2 text-grey-500">✓</span>;
                      default:
                        return null;
                    }
                  };
                  
                  return (
                    <div key={index} className={itemClass}>
                      <div className="flex items-start">
                        {listStyle !== "none" && (
                          <div className="flex-shrink-0 mt-1">
                            {listItemIndicator()}
                          </div>
                        )}
                        <div className="flex-1">
                          {item.title && (
                            <span className={cn(
                              "font-semibold text-gray-800",
                              listTitleClassName
                            )}>
                              {item.title}
                            </span>
                          )}
                          {item.title && item.content && " "}
                          {item.content && (
                            <span className={cn(
                             "text-gray-700 text-sm",
                             listContentClassName
                            )}>
                              {item.content}
                            </span>
                          )}
                        </div>
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
        </>
      ) : (
        <div className={defaultLayoutClasses}>
          <div className={imageContainerClasses} style={imageStyle}>
            {image && (
              (imageWidth && imageHeight) ? (
                <Image
                  src={image}
                  alt={title || "Card image"}
                  width={imageWidth}
                  height={imageHeight}
                  className={computedImageClasses}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  priority
                />
              ) : (
                <Image
                  src={image}
                  alt={title || "Card image"}
                  fill
                  className={computedImageClasses}
                />
              )
            )}
          </div>
          <div className={contentContainerClasses} style={contentStyle}>
            {title && (
              <h3 
                className={cn(
                  variant === 'default' && "font-semibold mb-6",
                  variant !== 'default' && "text-xl font-semibold",
                  titleClassName
                )}
                style={titleStyle}
              >
                {title}
              </h3>
            )}
            
            {subtitle && (
              <h3 
                className={cn(
                  "text-gray-500",
                  subtitleClassName
                )}
                style={subtitleStyle}
              >
                {subtitle}
              </h3>
            )}
            {date && (
              <p 
                className={cn(
                  "text-gray-500 text-xs sm:text-sm mb-2",
                  dateClassName
                )}
                style={dateStyle}
              >
                {date}
              </p>
            )}
            {description && (
              <p 
                className={cn(
                  variant === 'default',
                  variant !== 'default' && "text-gray-500",
                  descriptionClassName
                )}
                style={descriptionStyle}
              >
                {description}
              </p>
            )}
            {content && (
              <RichText 
                className={longContentClassName}       
                data={content} 
                enableGutter={false} 
              />
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
                      <div className="flex items-start">
                        {listStyle !== "none" && (
                          <div className="flex-shrink-0 mt-1">
                            {listItemIndicator()}
                          </div>
                        )}
                        <div className="flex-1">
                          {item.title && (
                            <span className={cn(
                              "font-semibold text-gray-800",
                              listTitleClassName
                            )}>
                              {item.title}
                            </span>
                          )}
                          {item.title && item.content && " "}
                          {item.content && (
                            <span className={cn(
                             "text-gray-700 text-sm",
                             listContentClassName
                            )}>
                              {item.content}
                            </span>
                          )}
                        </div>
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
        </div>
      )}
    </div>
  );
};

export default Card;

