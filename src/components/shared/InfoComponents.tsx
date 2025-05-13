import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import RichText from "./RichText";

type ObjectFitType = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';

interface ImageContainerProps {
  src: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  overlayTitle?: string;
  overlayDescription?: string;
  objectFit?: ObjectFitType;
  aspectRatio?: string;
  overlay?: boolean | React.ReactNode;
  overlayClassName?: string;
  overlayTitleClassName?: string;
  overlayDescriptionClassName?: string;
  imageClassName?: string;
  onClick?: () => void;
  loading?: 'eager' | 'lazy';
}

const ImageContainer: React.FC<ImageContainerProps> = ({ 
  src, 
  alt,
  className,
  priority = false,
  overlayTitle,
  overlayDescription,
  objectFit = "cover",
  aspectRatio = "aspect-video",
  overlay,
  overlayClassName,
  overlayTitleClassName,
  overlayDescriptionClassName,
  imageClassName,
  onClick,
  loading,
}) => {
  const hasOverlayContent = overlay || overlayTitle || overlayDescription;
  
  return (
    <div 
      className={cn(
        "relative w-full h-full", 
        aspectRatio, 
        className,
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <Image
        src={src}
        alt={alt || "image"}
        fill
        priority={priority}
        loading={loading}
        className={cn(`object-${objectFit}`, imageClassName)}
      />
      
      {hasOverlayContent && (
        <div className={cn(
          "absolute inset-0 z-10", 
          overlayClassName
        )}>
          {overlay === true ? (
            <>
              {overlayTitle && (
                <h3 className={cn("text-sm text-gray-500 mb-2", overlayTitleClassName)}>
                  {overlayTitle}
                </h3>
              )}
              {overlayDescription && (
                <h2 className={cn("text-xl font-semibold mb-4", overlayDescriptionClassName)}>
                  {overlayDescription}
                </h2>
              )}
            </>
          ) : overlay}
        </div>
      )}
    </div>
  );
};

interface ListItem {
  title?: string;
  content?: string;
}

interface InformationContainerProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  content?: string | React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  button?: React.ReactNode;
  showButton?: boolean;
  buttonClassName?: string;
  listItems?: ListItem[];
  descriptionClassName?: string;
  contentClassName?: string;
  listTitleClassName?: string;
  listContentClassName?: string;
  padding?: string;
  children?: React.ReactNode;
  buttonText?: string;
  contentLayout?: "standard" | "columns" | "cards";
  listStyle?: "bullet" | "numbered" | "checkmark" | "none";
  listDirection?: "vertical" | "horizontal";
  onClick?: () => void;
}

const InformationContainer: React.FC<InformationContainerProps> = ({
  title,
  subtitle,
  description,
  content,
  className,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  contentClassName,
  showButton,
  button,
  buttonText,
  buttonClassName,
  padding = "p-0",
  children,
  listItems,
  listTitleClassName = "",
  listContentClassName = "",
  contentLayout = "standard",
  listStyle = "bullet",
  listDirection = "horizontal",
  onClick,
}) => {
  return (
    <div 
      className={cn(
        "w-full", 
        padding,
        className,
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      {title && (
        <h2 className={cn(
          "text-title-large-teriary mb-2",
          titleClassName
        )}>
          {title}
        </h2>
      )}
      {subtitle && (
        <h3 className={cn(
          "mb-2",
          subtitleClassName
        )}>
          {subtitle}
        </h3>
      )}
      {description && (
        <p className={cn(
          "text-body-large-black mb-4",
          descriptionClassName
        )}>
          {description}
        </p>
      )}
      {content && (
        <RichText 
          className={contentClassName}       
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
                        "text-body-large-black",
                        listTitleClassName
                      )}>
                        {item.title}
                      </span>
                    )}
                    {item.title && item.content && " "}
                    {item.content && (
                      <span className={cn(
                      "text-body-large-black",
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
         buttonClassName
       )}>
         {button}
       </div>
     )}
     {showButton && (
        <div className="w-full h-full flex items-start justify-start">
          <button className={cn("px-6 py-2 bg-buttonColor text-title-regular-white rounded-full hover:bg-violet-600 transition-all duration-300 transform hover:scale-105 hover:shadow-md mt-6", buttonClassName)}>
            {buttonText}
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

interface InfoCardProps {
  imgSrc: string;
  imgAlt?: string;
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  content?: string | React.ReactNode;
  button?: string | React.ReactNode;
  showButton?: boolean;
  buttonText?: string;
  buttonClassName?: string;
  listItems?: ListItem[];
  overlayTitle?: string;
  overlayDescription?: string;
  cardContainerClassName?: string;
  listTitleClassName?: string;
  listContentClassName?: string;
  order?: "imageFirst" | "infoFirst";
  className?: string;
  imageContainerClassName?: string;
  infoContainerClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  contentClassName?: string;
  imageObjectFit?: ObjectFitType;
  imagePriority?: boolean;
  aspectRatio?: string;
  overlay?: boolean | React.ReactNode;
  overlayClassName?: string;
  imageClassName?: string;
  layout?: "horizontal" | "vertical" | "responsive";
  breakpoint?: "sm" | "md" | "lg" | "xl" | "2xl";
  gap?: string;
  widthRatio?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  imageOnClick?: () => void;
  contentOnClick?: () => void;
  loading?: 'eager' | 'lazy';
  padding?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  imgSrc,
  imgAlt,
  title,
  subtitle,
  listItems,
  description,
  content,
  overlayTitle,
  overlayDescription,
  order = "imageFirst",
  className,
  imageContainerClassName,
  infoContainerClassName,
  titleClassName,
  descriptionClassName,
  contentClassName,
  overlayTitleClassName,
  overlayDescriptionClassName,
  listTitleClassName = "",
  listContentClassName = "",
  subtitleClassName,
  cardContainerClassName,
  imageObjectFit = "cover",
  imagePriority = false,
  showButton,
  buttonText,
  aspectRatio = "aspect-video",
  overlay,
  overlayClassName,
  imageClassName,
  layout = "responsive",
  breakpoint = "lg",
  gap = "gap-6 sm:gap-6 lg:gap-8",
  widthRatio = "w-full lg:w-1/2",
  children,
  button,
  buttonClassName,
  onClick,
  imageOnClick,
  contentOnClick,
  loading,
  padding,
}) => {
  const isHorizontal = layout === "horizontal" || layout === "responsive";
  const flexDirection = isHorizontal 
    ? `flex-col ${breakpoint}:flex-row justify-between` 
    : "flex-col";
  const containerWidthClass = isHorizontal ? widthRatio : "w-full";
  const imageOrder = order === "infoFirst" 
    ? `order-first lg:order-last` 
    : "";
  const contentOrder = order === "infoFirst" 
    ? `order-last lg:order-first` 
    : "";

  return (
    <div 
      className={cn(
        "flex w-full mx-auto py-4",
        flexDirection,
        gap,
        className,
        onClick && "cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className={`${cn(
        containerWidthClass,
        cardContainerClassName,
        "flex-shrink-0",
      )} ${imageOrder}`}>
        <ImageContainer 
          src={imgSrc} 
          alt={imgAlt}
          className={imageContainerClassName}
          overlayTitle={overlayTitle}
          overlayDescription={overlayDescription}
          priority={imagePriority}
          objectFit={imageObjectFit}
          aspectRatio={aspectRatio}
          overlay={overlay}
          overlayClassName={overlayClassName}
          overlayTitleClassName={overlayTitleClassName}
          overlayDescriptionClassName={overlayDescriptionClassName}
          imageClassName={imageClassName}
          onClick={imageOnClick}
          loading={loading}
        />
      </div>
      
      <div className={cn(
        containerWidthClass,
        contentOrder
      )}>
        <InformationContainer 
          title={title}
          subtitle={subtitle}
          listItems={listItems} 
          description={description}
          content={content} 
          button={button}
          className={infoContainerClassName}
          titleClassName={titleClassName}
          subtitleClassName={subtitleClassName}
          descriptionClassName={descriptionClassName}
          listTitleClassName={listTitleClassName}
          listContentClassName={listContentClassName}
          contentClassName={contentClassName} 
          showButton={showButton}
          buttonText={buttonText}
          buttonClassName={buttonClassName}
          onClick={contentOnClick}
          padding={padding}
        >
          {children}
        </InformationContainer>
      </div>
    </div>
  );
};

interface InfoSubsectionProps {
  title?: string;
  items: InfoCardProps[];
  className?: string;
  titlePosition?: "start" | "end" | "center";
  titleClassName?: string;
  lineColor?: string;
  dotColor?: string;
  gap?: string;
  showDivider?: boolean;
  dividerClassName?: string;
  showButton?: boolean;
  buttonLink?: string;
  buttonText?: string;
  buttonClassName?: string;
  footerClassName?: string;
  footerText?: string;
}

export const InfoSubsection: React.FC<InfoSubsectionProps> = ({
  title,
  items,
  className,
  titlePosition = "start",
  titleClassName,
  lineColor = "border-gradient-blue",
  dotColor = "bg-text-gradient-blue",
  gap = "space-y-4",
  showDivider = false,
  dividerClassName,
  showButton,
  buttonText,
  buttonLink = '/contact',
  footerText,
  footerTextClassName,
  buttonClassName,
}) => {
  const renderTitleBlock = () => (
    <h2 className={cn("text-xl font-bold text-black", titleClassName)}>
      {title}
    </h2>
  );
  
  const renderDivider = () => {
    if (!showDivider) return null;
    switch (titlePosition) {
      case "start":
        return (
          <>
            <span className={cn("w-4 h-4 rounded-full ml-4", dotColor)} />
            <div className={cn("flex-grow border-t border-[2px]", lineColor)} />
          </>
        );
      case "end":
        return (
          <>
            <div className={cn("flex-grow border-t border-[2px]", lineColor)} />
            <span className={cn("w-4 h-4 rounded-full mr-4", dotColor)} />
          </>
        );
      case "center":
        return (
          <>
            <div className={cn("flex-grow border-t border-[2px]", lineColor)} />
            <span className={cn("w-4 h-4 rounded-full mx-4", dotColor)} />
            <div className={cn("flex-grow border-t border-[2px]", lineColor)} />
          </>
        );
    }
  };
  
  return (
    <div className={cn("my-8 w-full", className)}>
      {title && (
        <div className={cn(
          "flex items-center mb-4",
          titlePosition === 'center' ? 'justify-center' : '',
          dividerClassName,
        )}>
          {titlePosition === "end" && renderDivider()}
          {renderTitleBlock()}
          {(titlePosition === "start" || titlePosition === "center") && renderDivider()}
        </div>
      )}
      <div className={cn(gap)}>
        {items.map((item, index) => (
          <InfoCard key={index} {...item} />
        ))}
      </div>
      {footerText && (
        <p className={cn(
          "text-body-large-black text-center mt-10",
          footerTextClassName
        )}>
          {footerText}
        </p>
      )}
      {showButton && (
        <div className="w-full h-full flex items-center justify-center">
          <Link href={buttonLink}>
            <button className={cn("px-6 py-2 bg-buttonColor text-title-regular-white rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-md mt-6", buttonClassName)}>
              {buttonText}
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
  background?: string;
  textColor?: string;
  padding?: string;
  border?: boolean;
  borderColor?: string;
  alignment?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export const Header: React.FC<HeaderProps> = ({
  children,
  className,
  background = 'bg-white',
  textColor,
  padding = 'px-6 py-4',
  border = false,
  borderColor = 'border-white',
  alignment = 'center',
}) => {
  const bgStyle = background ? { background } : {};
  
  const alignmentClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div
      className={cn(
        'flex w-full items-center',
        alignmentClasses[alignment],
        border && `border-b ${borderColor}`,
        background,
        padding,
        textColor,
        className
      )}
      style={bgStyle}
    >
      {children}
    </div>
  );
};

interface FooterProps {
  children: React.ReactNode;
  className?: string;
  background?: string;
  textColor?: string;
  padding?: string;
  border?: boolean;
  borderColor?: string;
  alignment?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
}

export const Footer: React.FC<FooterProps> = ({
  children,
  className,
  background = 'bg-white',
  textColor,
  padding = 'px-6 py-4',
  border = false,
  borderColor = 'border-gray-200',
  alignment = 'center',
}) => {
  const bgStyle = background ? { background } : {};
  const alignmentClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  };

  return (
    <div
      className={cn(
        'flex w-full items-center',
        alignmentClasses[alignment],
        border && `border-t ${borderColor}`,
        background,
        padding,
        textColor,
        className
      )}
      style={bgStyle}
    >
      {children}
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
    magic: 'bg-violet-600 hover:bg-violet-700 text-white',
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

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  childrenClassName?: string;
  background?: string;
  textColor?: string;
  padding?: string;
  margin?: string;
  width?: string;
  maxWidth?: string;
  rounded?: boolean;
  shadow?: boolean;
  border?: boolean;
  borderColor?: string;
  withHeader?: boolean;
  headerChildren?: React.ReactNode;
  headerClassName?: string;
  headerBorder?: boolean;
  headerBackground?: string;
  headerPadding?: string;
  headerAlignment?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  withFooter?: boolean;
  footerChildren?: React.ReactNode;
  footerClassName?: string;
  footerBorder?: boolean;
  footerBackground?: string;
  footerPadding?: string;
  footerAlignment?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  
  id?: string;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className,
  background,
  textColor,
  childrenClassName,
  padding = 'p-0',
  margin = 'my-0',
  width = 'w-full',
  maxWidth = 'max-w-full',
  rounded = false,
  shadow = false,
  border = false,
  borderColor = 'border-gray-200',
  withHeader = false,
  headerChildren,
  headerClassName,
  headerBorder = true,
  headerBackground = 'bg-white',
  headerPadding = 'px-6 py-4',
  headerAlignment = 'center',
  withFooter = false,
  footerChildren,
  footerClassName,
  footerBorder = false,
  footerBackground = 'bg-white',
  footerPadding = 'px-6 py-4',
  footerAlignment = 'center',
  id,
}) => {
  const bgStyle = background ? { background } : {};

  return (
    <section
      id={id}
      className={cn(
        width,
        margin,
        'mx-auto',
        maxWidth,
        textColor,
        rounded && 'rounded-lg',
        shadow && 'shadow-md',
        border && `border ${borderColor}`,
        'overflow-hidden',
        className
      )}
      style={bgStyle}
    >
      <div className={cn(padding, 'h-full', childrenClassName)}>
        {withHeader && (
          <Header
            className={headerClassName}
            background={headerBackground}
            padding={headerPadding}
            border={headerBorder}
            borderColor={borderColor}
            alignment={headerAlignment}
          >
            {headerChildren}
          </Header>
        )}
        {children}
        {withFooter && (
          <Footer
            className={footerClassName}
            background={footerBackground}
            padding={footerPadding}
            border={footerBorder}
            borderColor={borderColor}
            alignment={footerAlignment}
          >
            {footerChildren}
          </Footer>
        )}
      </div>
    </section>
  );
};


