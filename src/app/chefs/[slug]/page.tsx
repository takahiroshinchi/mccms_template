import { getChef } from '@/libs/microcms';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 60;

export default async function Page({ params }: Props) {
  const chef = await getChef(params.slug);

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
      <h2>{chef.name}</h2>
      <p>{chef.profile}</p>
    </div>
  );
}
