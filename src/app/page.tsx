import ArticleList from '@/components/ArticleList';
import Pagination from '@/components/Pagination';
import { LIMIT } from '@/constants';
import { getChefList, getList } from '@/libs/microcms';
import Link from 'next/link';
import styles from './index.module.css';

export const revalidate = 60;

export default async function Page() {
  const data = await getList({
    limit: LIMIT,
  });
  const chefs = await getChefList({
    limit: LIMIT,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />

      {chefs.contents.map((chef) => (
        <div key={chef.id}>
          <Link href={`/chefs/${chef.id}`} className={styles.chef}>
            <picture>
              <source
                type="image/webp"
                srcSet={`${chef.image?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${chef.image?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
              />
              <img
                src={chef.image?.url}
                alt=""
                className={styles.chefIcon}
                width={chef.image?.width}
                height={chef.image?.height}
              />
            </picture>
            <span className={styles.chefName}>{chef.name}</span>
          </Link>
        </div>
      ))}
    </>
  );
}
