
import React from 'react';
import { validateUrl } from '@/utils/validation';

interface SecureExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const SecureExternalLink: React.FC<SecureExternalLinkProps> = ({ 
  href, 
  children, 
  className,
  onClick 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!validateUrl(href)) {
      e.preventDefault();
      console.warn('Invalid URL blocked:', href);
      return;
    }
    
    onClick?.();
  };

  // Only add security attributes for external links
  const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
  
  return (
    <a
      href={href}
      onClick={handleClick}
      className={className}
      {...(isExternal && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      {children}
    </a>
  );
};

export default SecureExternalLink;
