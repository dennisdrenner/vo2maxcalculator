import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostSlugs } from '@/content/blog';
import { SITE_URL } from '@/lib/seo';

interface MarkdownBodyProps {
  source: string;
}

const BLOG_SLUGS = new Set(getPostSlugs());

function rewriteHref(href: string): { href: string; internal: boolean } {
  let h = href;
  if (h.startsWith(SITE_URL)) h = h.slice(SITE_URL.length) || '/';
  if (h === '/' || h.startsWith('/')) {
    const cleaned = h.split('?')[0].split('#')[0].replace(/\/$/, '');
    const slugCandidate = cleaned.replace(/^\//, '');
    if (BLOG_SLUGS.has(slugCandidate)) {
      return { href: `/blog/${slugCandidate}/`, internal: true };
    }
    return { href: h, internal: true };
  }
  return { href: h, internal: false };
}

export function MarkdownBody({ source }: MarkdownBodyProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ node, ...props }) => (
            <h2 className="mt-10 text-2xl font-bold text-slate-900" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="mt-8 text-xl font-semibold text-slate-900" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="mt-3 text-slate-700" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-700" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-slate-700" {...props} />
          ),
          li: ({ node, ...props }) => <li className="text-slate-700" {...props} />,
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-slate-900" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="mt-4 border-l-4 border-teal-200 bg-teal-50 px-4 py-3 text-slate-700"
              {...props}
            />
          ),
          hr: () => <hr className="my-10 border-slate-200" />,
          img: ({ node, src, alt, ...rest }) => (
            <img
              src={src}
              alt={alt ?? ''}
              loading="lazy"
              className="mt-4 w-full rounded-2xl md:float-right md:ml-6 md:mt-2 md:mb-2 md:w-72"
              {...rest}
            />
          ),
          table: ({ node, ...props }) => (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full border-collapse text-sm" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => <thead className="bg-slate-50" {...props} />,
          th: ({ node, ...props }) => (
            <th
              className="border border-slate-200 px-3 py-2 text-left font-semibold text-slate-900"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-slate-200 px-3 py-2 text-slate-700" {...props} />
          ),
          code: (props: ComponentPropsWithoutRef<'code'>) => (
            <code
              className="rounded bg-slate-100 px-1 py-0.5 font-mono text-[0.9em] text-slate-800"
              {...props}
            />
          ),
          a: ({ node, href, children, ...rest }) => {
            const raw = href ?? '';
            const { href: target, internal } = rewriteHref(raw);
            if (internal) {
              return (
                <Link href={target} className="text-teal-700 underline hover:text-teal-800">
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={target}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-700 underline hover:text-teal-800"
                {...rest}
              >
                {children}
              </a>
            );
          },
        }}
      >
        {source}
      </ReactMarkdown>
    </div>
  );
}
