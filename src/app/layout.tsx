import Link from 'next/link';
import { getTagList, getChefList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import '../styles/globals.css';
import styles from './layout.module.css';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: '一流レシピ',
  description: 'A simple blog presented by microCMS',
  openGraph: {
    title: '一流レシピ',
    description: 'A simple blog presented by microCMS',
    images: '/og-image.png',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  const chefs = await getChefList({
    limit: LIMIT,
  });
  return (
    <html lang="ja">
      <body>
        <Header />
        <Nav tags={tags.contents} />
        <main className={styles.main}>{children}</main>

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

        <Footer />
      </body>
    </html>
  );
}
