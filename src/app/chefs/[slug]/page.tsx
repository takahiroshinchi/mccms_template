import Link from 'next/link';
import { getChef, getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export default async function Page({ params }: Props) {
  const chef = await getChef(params.slug);
  const recipes = await getList({
    limit: LIMIT,
    filters: `chef[equals]${chef.id}`,
  });

  return (
    <div>
      <picture>
        <source
          type="image/webp"
          media="(max-width: 640px)"
          srcSet={`${chef.image?.url}?fm=webp&w=414 1x, ${chef.image?.url}?fm=webp&w=414&dpr=2 2x`}
        />
        <source
          type="image/webp"
          srcSet={`${chef.image?.url}?fm=webp&fit=crop&w=240&h=126 1x, ${chef.image?.url}?fm=webp&fit=crop&w=240&h=126&dpr=2 2x`}
        />
        <img
          src={chef.image?.url}
          alt=""
          className="border-4 border-double border-gray-300"
          width={chef.image?.width}
          height={chef.image?.height}
        />
      </picture>
      <div className="p-10">
        <h2>{chef.name}</h2>
        <p>{chef.profile}</p>
      </div>

      <div className="flex gap-4">
        {recipes.contents.map((recipe) => (
          <div key={recipe.id}>
            <Link href={`/articles/${recipe.id}`} className="block">
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${recipe.thumbnail?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${recipe.thumbnail?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
                />
                <img
                  src={recipe.thumbnail?.url}
                  alt=""
                  className="h-auto w-48 border-4 border-r-4 border-double border-gray-300"
                  width={recipe.thumbnail?.width}
                  height={recipe.thumbnail?.height}
                />
              </picture>
              <span className="">{recipe.title}</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
