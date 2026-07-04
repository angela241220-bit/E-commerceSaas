"use client";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Link from "next/link";
// Custom components for MDX
const components = {
    h1: ({ children, ...props }) => (<h1 className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-zinc-900 dark:text-white" {...props}>
      {children}
    </h1>),
    h2: ({ children, ...props }) => (<h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-zinc-900 dark:text-white scroll-mt-20" {...props}>
      {children}
    </h2>),
    h3: ({ children, ...props }) => (<h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-zinc-900 dark:text-white" {...props}>
      {children}
    </h3>),
    h4: ({ children, ...props }) => (<h4 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-zinc-900 dark:text-white" {...props}>
      {children}
    </h4>),
    p: ({ children, ...props }) => (<p className="text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4" {...props}>
      {children}
    </p>),
    a: ({ href, children, ...props }) => {
        const isExternal = href?.startsWith("http");
        if (isExternal) {
            return (<a href={href} target="_blank" rel="noopener noreferrer" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium" {...props}>
          {children}
        </a>);
        }
        return (<Link href={href || "#"} className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium" {...props}>
        {children}
      </Link>);
    },
    ul: ({ children, ...props }) => (<ul className="list-disc list-inside space-y-2 mb-4 text-zinc-700 dark:text-zinc-300 ml-4" {...props}>
      {children}
    </ul>),
    ol: ({ children, ...props }) => (<ol className="list-decimal list-inside space-y-2 mb-4 text-zinc-700 dark:text-zinc-300 ml-4" {...props}>
      {children}
    </ol>),
    li: ({ children, ...props }) => (<li className="leading-relaxed" {...props}>
      {children}
    </li>),
    blockquote: ({ children, ...props }) => (<blockquote className="border-l-4 border-emerald-500 pl-4 py-2 my-6 bg-emerald-50/50 dark:bg-emerald-950/20 text-zinc-700 dark:text-zinc-300 italic" {...props}>
      {children}
    </blockquote>),
    code: ({ children, className, ...props }) => {
        const isInline = !className?.includes("language-");
        if (isInline) {
            return (<code className="px-1.5 py-0.5 bg-zinc-100 dark:bg-zinc-800 rounded text-sm font-mono text-emerald-600 dark:text-emerald-400" {...props}>
          {children}
        </code>);
        }
        return (<code className={className} {...props}>
        {children}
      </code>);
    },
    pre: ({ children, ...props }) => (<pre className="overflow-x-auto p-4 my-6 bg-zinc-900 dark:bg-zinc-950 rounded-xl text-sm" {...props}>
      {children}
    </pre>),
    table: ({ children, ...props }) => (<div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>),
    thead: ({ children, ...props }) => (<thead className="bg-zinc-100 dark:bg-zinc-800" {...props}>
      {children}
    </thead>),
    th: ({ children, ...props }) => (<th className="px-4 py-3 text-left font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-700" {...props}>
      {children}
    </th>),
    td: ({ children, ...props }) => (<td className="px-4 py-3 text-zinc-700 dark:text-zinc-300 border-b border-zinc-200 dark:border-zinc-800" {...props}>
      {children}
    </td>),
    hr: (props) => (<hr className="my-8 border-t border-zinc-200 dark:border-zinc-800" {...props}/>),
    strong: ({ children, ...props }) => (<strong className="font-semibold text-zinc-900 dark:text-white" {...props}>
      {children}
    </strong>),
    em: ({ children, ...props }) => (<em className="italic" {...props}>
      {children}
    </em>),
    img: ({ src, alt }) => (<span className="block my-6">
      <Image src={typeof src === "string" ? src : ""} alt={alt || ""} width={800} height={450} className="rounded-xl w-full"/>
    </span>),
};
export function MDXContent({ source }) {
    return (<article className="prose-custom">
      <MDXRemote {...source} components={components}/>
    </article>);
}
