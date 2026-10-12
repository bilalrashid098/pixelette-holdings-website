import Link from 'next/link';
import { ArrowUpRightIcon } from './Icons';

export type InsightArticleCardProps = {
  category: string;
  title: string;
  summary: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  variant?: 'featured' | 'supporting';
};

/**
 * Editorial article card for the Insights landing page.
 * The whole surface is one semantic link so the card is fully clickable.
 */
export function InsightArticleCard({
  category,
  title,
  summary,
  href,
  imageSrc,
  imageAlt,
  variant = 'supporting',
}: InsightArticleCardProps) {
  const isFeatured = variant === 'featured';

  return (
    <Link
      href={href}
      className={isFeatured ? 'insight-card insight-card--featured' : 'insight-card insight-card--supporting'}
    >
      <div className="insight-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          width={isFeatured ? 1200 : 800}
          height={isFeatured ? 675 : 600}
          loading={isFeatured ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
      <div className="insight-card__body">
        <p className="eyebrow">{category}</p>
        <h2 className={isFeatured ? 'insight-card__title insight-card__title--featured' : 'insight-card__title'}>
          {title}
        </h2>
        <p className="insight-card__summary">{summary}</p>
        {isFeatured ? (
          <span className="insight-card__cta">
            Read article <ArrowUpRightIcon />
          </span>
        ) : (
          <span className="insight-card__arrow" aria-hidden="true">
            <ArrowUpRightIcon size={14} />
          </span>
        )}
      </div>
    </Link>
  );
}
