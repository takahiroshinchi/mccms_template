import Link from 'next/link';
import { formatRichText } from '@/libs/utils';
import { type Article } from '@/libs/microcms';
import PublishedDate from '../Date';
import styles from './index.module.css';
import TagList from '../TagList';

type Props = {
  data: Article;
};

export default function Article({ data }: Props) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>{data.title}</h1>
      <TagList tags={data.tags} />
      <p className={styles.description}>{data.description}</p>
      <div className={styles.meta}>
        {data.chef && (
          <div>
            <Link href={`/chefs/${data.chef?.id}`} className={styles.chef}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${data.chef?.image?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${data.chef?.image?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
                />
                <img
                  src={data.chef?.image?.url}
                  alt=""
                  className={styles.chefIcon}
                  width={data.chef?.image?.width}
                  height={data.chef?.image?.height}
                />
              </picture>
              <span className={styles.chefName}>{data.chef?.name}</span>
            </Link>
          </div>
        )}
        <PublishedDate date={data.publishedAt || data.createdAt} />
      </div>
      <picture>
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcSet={`${data.thumbnail?.url}?fm=webp&w=414 1x, ${data.thumbnail?.url}?fm=webp&w=414&dpr=2 2x`}
        />
        <source
          type="image/webp"
          srcSet={`${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504 1x, ${data.thumbnail?.url}?fm=webp&fit=crop&w=960&h=504&dpr=2 2x`}
        />
        <img
          src={data.thumbnail?.url}
          alt=""
          className={styles.thumbnail}
          width={data.thumbnail?.width}
          height={data.thumbnail?.height}
        />
      </picture>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{
          __html: `${formatRichText(data.content)}`,
        }}
      />
    </main>
  );
}
