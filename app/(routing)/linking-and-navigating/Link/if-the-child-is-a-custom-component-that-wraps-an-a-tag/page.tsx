'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import Link from 'next/link';

interface PassableHrefProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  href?: string;
  className?: string;
  text?: string;
}

// Forward ref to support Next.js <Link>
const PassableHref = React.forwardRef<HTMLAnchorElement, PassableHrefProps>(({ onClick, href, className, text }, ref) => {
    return (
      <a href={href} onClick={onClick} ref={ref} className={className}>
        {text}
      </a>
    );
  }
);
PassableHref.displayName = 'PassableHref'; // Fix React warning

export default function NavLink() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const Links = [
    { textColor: 'text-red-500', text: 'red' },
    { textColor: 'text-blue-500', text: 'blue' },
    { textColor: 'text-green-500', text: 'green' },
    { textColor: 'text-yellow-500', text: 'yellow' },
    { textColor: 'text-purple-500', text: 'purple' },
    { textColor: 'text-orange-500', text: 'orange' },
  ];

  const code = `
interface PassableHrefProps {
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    href?: string;
    className?: string;
    text?: string;
}

// Forward ref to support Next.js <Link>
const PassableHref = React.forwardRef<HTMLAnchorElement, PassableHrefProps>(
    ({ onClick, href, className, text }, ref) => {
    return (
        <a href={href} onClick={onClick} ref={ref} className={className}>
        {text}
        </a>
    );
    }
);
PassableHref.displayName = 'PassableHref'; // Fix React warning

export default function NavLink() {
    const Links = [
    { textColor: 'text-red-500', text: 'red' },
    { textColor: 'text-blue-500', text: 'blue' },
    { textColor: 'text-green-500', text: 'green' },
    { textColor: 'text-yellow-500', text: 'yellow' },
    { textColor: 'text-purple-500', text: 'purple' },
    { textColor: 'text-orange-500', text: 'orange' },
    ];

    return (
    <div className="flex flex-col gap-y-2">
        <p><strong>Output:</strong></p>
        <ul className="list-disc pl-5">
        {Links.map(({ textColor, text }, index) => (
            <li key={index}>
            <Link
                href={\`/LinkComponent-refs/if-the-child-is-a-custom-component-that-wraps-an-a-tag#\${encodeURIComponent(text)}\`}
                replace
                scroll={false} // Removed legacyBehavior and passHref
                className={\`\${textColor} underline\`}
            >
                {text}
            </Link>
            </li>
        ))}
        </ul>
    </div>
    );
}
  `;
  
  return (
    <section className="w-full max-w-[850px] mx-auto pt-12 flex flex-col gap-y-10">
      {/* Title */}
      <div>
        <h1 className="font-bold text-2xl">
          Custom Component that wraps an <span>&lt;a&gt;</span> tag from Next.js Link
        </h1>
        <hr className="border-b-2 border-gray-800" />
      </div>

      {/* Code Block with Copy Button */}
     <div className='relative'>
        <button className='flex gap-x-2 items-center text-[gray] absolute right-6 top-4' onClick={handleCopy}>
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} color='gray'/>
            {copied ? 'Copied!' : 'Copy'}
        </button>
        <SyntaxHighlighter language="javascript" style={oneDark}>
            {code}
        </SyntaxHighlighter>
     </div>

      {/* Output Links */}
      <div className="flex flex-col gap-y-2">
        <p><strong>Output:</strong></p>
        <ul className="list-disc pl-5">
          {Links.map(({ textColor, text }, index) => (
            <li key={index}>
              <Link
                href={`/Link/if-the-child-is-a-custom-component-that-wraps-an-a-tag#${text}`}
                replace
                passHref
                legacyBehavior
                scroll={false}
              >
                <PassableHref className={`${textColor} underline`} text={`${text} link`} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Explanation */}
      <p>
        <strong>Note:</strong> If the child of {'<a>'} is a custom component that wraps an
        {'<a>'} tag, you must add <code>passHref</code> to {'<a>'}. This ensures the {'<a>'}` tag receives
        the `href` attribute, improving accessibility and SEO.
      </p>
    </section>
  );
}
