'use client'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons'
 
// Define the props type for MyButton
interface PassableHrefProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  href?: string
  className?: string
}
 
// Use React.ForwardRefRenderFunction to properly type the forwarded ref
const PassableHref: React.ForwardRefRenderFunction<HTMLAnchorElement, PassableHrefProps> = ({ onClick, href, className}, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={className}>
      link
    </a>
  )
}
// Use React.forwardRef to wrap the component
const ForwardedPassableHref = React.forwardRef(PassableHref)

const NonPassableHref: React.FC<{ className?: string }> = ({ className }) => {
   return <a className={className}>red link</a>;
}

export default function Page(){

    const code = `
'use client'

import Link from 'next/link'
import React from 'react'

interface PassableHrefProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  href?: string
  className?: string
}

// Use React.ForwardRefRenderFunction to properly type the forwarded ref
const PassableHref: React.ForwardRefRenderFunction<HTMLAnchorElement, PassableHrefProps> = ({ onClick, href, className}, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} className={className}>
      link
    </a>
  )
}
// Use React.forwardRef to wrap the component
const ForwardedPassableHref = React.forwardRef(PassableHref)

const NonPassableHref: React.FC<{ className?: string }> = ({ className }) => {
  return <a className={className}>red link</a>;
}

export default function Page(){

  return (
              <div>
        <div>
            <p>
                <strong>With using React.ForwardRefRenderFunction: </strong>
                <Link href="/LinkComponent-refs/nesting-functional-component/test" className="underline" passHref legacyBehavior>
                  <ForwardedPassableHref className='underline'/>
                </Link>
            </p>
        </div>

        <div>
            <p>
                <strong>Without using React.ForwardRefRenderFunction: </strong>
                <Link href="/LinkComponent-refs/nesting-functional-component/test"  passHref legacyBehavior>
                    <NonPassableHref className="underline"/>
                </Link>
            </p>
        </div>
      </div>
    );
  }
  `
      const [copied, setCopied] = useState(false)

      const handleCopy = async () => {
        try {
          await navigator.clipboard.writeText(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000) // Reset after 2s
        } catch (err) {
          console.error('Failed to copy: ', err)
        }
      }

    return (
        <section className="w-full max-w-[850px] mx-auto pt-[50px] flex flex-col gap-y-[30px] ">
            <div>
                <h1 className="font-bold text-[2rem]">Nesting a functional component</h1>      
                <hr className="border-b-[2px] border-[#222126]" />
            </div>

            <p className='flex items-center gap-x-[10px]'>
                <strong>Description:</strong>
                <br/>forwardRef is a React function that allows a component to pass down a ref to one of its child elements. This is useful when you need direct access to a DOM element or a child component&apos;s instance.
            </p>

            <div>
                <p>
                    <strong>Example:</strong>
                </p>

              <div className='relative'>
                  <button className='flex gap-x-2 items-center text-[gray] absolute right-6 top-3' onClick={handleCopy}>
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} color='gray'/>
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <SyntaxHighlighter language="javascript" style={oneDark}>
                      {code}
                  </SyntaxHighlighter>
                </div>
            </div>

            <div className='flex flex-col gap-y-[10px]'>
              <p>
                  <strong>Output: </strong>
              </p>

                <div>
                  <div>
                      <p>
                          <strong>With using React.ForwardRefRenderFunction: </strong>
                          <Link href="/Link/nesting-functional-component/test" className="underline" passHref legacyBehavior>
                            <ForwardedPassableHref className='underline'/>
                          </Link>
                      </p>
                  </div>

                  <div>
                      <p>
                          <strong>Without using React.ForwardRefRenderFunction: </strong>
                          <Link href="/Link/nesting-functional-component/test"  passHref legacyBehavior>
                              <NonPassableHref className="text-[red] underline"/>
                          </Link>
                      </p>
                  </div>
              </div>
            </div>
        </section>
    )
}