'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { BlogPost, BlogTag } from '@/content/blog/types';
import { ALL_TAGS, TAG_LABEL } from '@/content/blog/types';

interface BlogListProps {
  posts: BlogPost[];
  activeTags: BlogTag[];
}

export function BlogList({ posts, activeTags }: BlogListProps) {
  const [selected, setSelected] = useState<BlogTag | 'all'>('all');

  const visible = useMemo(() => {
    if (selected === 'all') return posts;
    return posts.filter((p) => p.tags.includes(selected));
  }, [posts, selected]);

  const tagChips = ALL_TAGS.filter((t) => activeTags.includes(t.tag));

  return (
    <div>
      {tagChips.length > 1 ? (
        <div className="flex flex-wrap gap-2">
          <TagButton
            label={`All (${posts.length})`}
            active={selected === 'all'}
            onClick={() => setSelected('all')}
          />
          {tagChips.map((t) => {
            const count = posts.filter((p) => p.tags.includes(t.tag)).length;
            return (
              <TagButton
                key={t.tag}
                label={`${t.label} (${count})`}
                active={selected === t.tag}
                onClick={() => setSelected(t.tag)}
              />
            );
          })}
        </div>
      ) : null}

      <ul className="mt-8 grid gap-5 sm:grid-cols-2">
        {visible.map((p) => {
          const thumb = p.cardImage ?? p.heroImage;
          return (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}/`}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:border-teal-500 hover:shadow-md"
              >
                {thumb ? (
                  <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                    <img
                      src={thumb}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600"
                      >
                        {TAG_LABEL[t]}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>
                  <p className="mt-3 text-xs text-slate-400">
                    <time dateTime={p.datePublished}>
                      {new Date(p.datePublished).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 ? (
        <p className="mt-6 text-sm text-slate-600">No posts with that tag yet.</p>
      ) : null}
    </div>
  );
}

function TagButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold text-white'
          : 'rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:border-teal-500 hover:text-teal-700'
      }
    >
      {label}
    </button>
  );
}
