"use client";

import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "@/components/blog/code-block";
import { extractHeadings, slugify } from "@/lib/blog-format";

function flattenToText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenToText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return flattenToText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function ArticleContent({ content, numbered = false }: { content: string; numbered?: boolean }) {
  // Built fresh each render but never mutated during it — reading an
  // immutable lookup while rendering is safe under React's dev-mode double
  // render, unlike incrementing a counter inside the h2 renderer would be.
  const sectionNumbers = new Map(
    numbered ? extractHeadings(content).map((h, i) => [h.slug, i + 1] as const) : []
  );

  return (
    <div
      className="
        max-w-none text-[1.05rem] leading-[1.8] text-foreground
        [&>*+*]:mt-6
        [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:flex [&_h2]:items-baseline [&_h2]:gap-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:scroll-mt-24
        [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:scroll-mt-24
        [&_p]:text-muted-foreground
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_ul]:space-y-2
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-muted-foreground [&_ol]:space-y-2
        [&_li>ul]:mt-2 [&_li>ol]:mt-2
        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-primary/30 hover:[&_a]:decoration-primary
        [&_strong]:text-foreground [&_strong]:font-semibold
        [&_blockquote]:rounded-xl [&_blockquote]:border [&_blockquote]:border-primary/20 [&_blockquote]:bg-primary/5 [&_blockquote]:px-5 [&_blockquote]:py-4 [&_blockquote]:not-italic [&_blockquote]:text-muted-foreground [&_blockquote_p]:m-0
        [&_img]:w-full [&_img]:h-auto [&_img]:rounded-2xl [&_img]:border [&_img]:border-border
        [&_hr]:border-border
        [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
        [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold
        [&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2 [&_td]:text-muted-foreground
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const slug = slugify(flattenToText(children));
            const index = sectionNumbers.get(slug);
            return (
              <h2 id={slug}>
                {index !== undefined && (
                  <span className="font-mono text-base font-normal text-primary">
                    {String(index).padStart(2, "0")}
                  </span>
                )}
                {children}
              </h2>
            );
          },
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className ?? "");
            const codeString = String(children).replace(/\n$/, "");

            if (match) {
              return <CodeBlock language={match[1]} code={codeString} />;
            }

            return (
              <code
                className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
                {...props}
              >
                {children}
              </code>
            );
          },
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith("http");
            return (
              <a href={href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined} {...props}>
                {children}
              </a>
            );
          },
          img: ({ src, alt }) => (
            <figure>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={alt ?? ""} loading="lazy" />
              {alt && <figcaption className="mt-2 text-center text-sm text-muted-foreground">{alt}</figcaption>}
            </figure>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
