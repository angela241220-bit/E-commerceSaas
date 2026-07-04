import Image from "next/image";
import Link from "next/link";
// Custom components for MDX - these are RSC-compatible (no hooks)
export const mdxComponents = {
    h1: ({ children, ...props }) => (<h1 className="text-3xl md:text-4xl font-bold mt-10 mb-6 text-foreground" {...props}>
      {children}
    </h1>),
    h2: ({ children, ...props }) => (<h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-foreground scroll-mt-20" {...props}>
      {children}
    </h2>),
    h3: ({ children, ...props }) => (<h3 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-foreground" {...props}>
      {children}
    </h3>),
    h4: ({ children, ...props }) => (<h4 className="text-lg md:text-xl font-semibold mt-6 mb-2 text-foreground" {...props}>
      {children}
    </h4>),
    p: ({ children, ...props }) => (<p className="text-muted-foreground leading-relaxed mb-4" {...props}>
      {children}
    </p>),
    a: ({ href, children, ...props }) => {
        const isExternal = href?.startsWith("http");
        if (isExternal) {
            return (<a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium" {...props}>
          {children}
        </a>);
        }
        return (<Link href={href || "#"} className="text-primary hover:underline font-medium">
        {children}
      </Link>);
    },
    ul: ({ children, ...props }) => (<ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground ml-4" {...props}>
      {children}
    </ul>),
    ol: ({ children, ...props }) => (<ol className="list-decimal list-inside space-y-2 mb-4 text-muted-foreground ml-4" {...props}>
      {children}
    </ol>),
    li: ({ children, ...props }) => (<li className="leading-relaxed" {...props}>
      {children}
    </li>),
    blockquote: ({ children, ...props }) => (<blockquote className="border-l-4 border-primary pl-4 py-2 my-6 bg-accent/50 text-muted-foreground italic" {...props}>
      {children}
    </blockquote>),
    code: ({ children, className, ...props }) => {
        const isInline = !className?.includes("language-");
        if (isInline) {
            return (<code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono text-primary" {...props}>
          {children}
        </code>);
        }
        return (<code className={className} {...props}>
        {children}
      </code>);
    },
    pre: ({ children, ...props }) => (<pre className="overflow-x-auto p-4 my-6 bg-secondary rounded-xl text-sm" {...props}>
      {children}
    </pre>),
    table: ({ children, ...props }) => (<div className="overflow-x-auto my-6">
      <table className="w-full border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>),
    thead: ({ children, ...props }) => (<thead className="bg-muted" {...props}>
      {children}
    </thead>),
    th: ({ children, ...props }) => (<th className="px-4 py-3 text-left font-semibold text-foreground border-b border-border" {...props}>
      {children}
    </th>),
    td: ({ children, ...props }) => (<td className="px-4 py-3 text-muted-foreground border-b border-border" {...props}>
      {children}
    </td>),
    hr: (props) => (<hr className="my-8 border-t border-border" {...props}/>),
    strong: ({ children, ...props }) => (<strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>),
    em: ({ children, ...props }) => (<em className="italic" {...props}>
      {children}
    </em>),
    img: ({ src, alt }) => (<span className="block my-6">
      <Image src={typeof src === "string" ? src : ""} alt={alt || ""} width={800} height={450} className="rounded-xl w-full"/>
    </span>),
};
