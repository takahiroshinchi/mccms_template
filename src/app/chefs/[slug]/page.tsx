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
          srcSet={`${chef.image?.url}?fm=webp&fit=crop&w=48&h=48 1x, ${chef.image?.url}?fm=webp&fit=crop&w=48&h=48&dpr=2 2x`}
        />
        <img
          src={chef.image?.url}
          alt=""
          className="aspect-video w-full"
          width={chef.image?.width}
          height={chef.image?.height}
        />
      </picture>
      <h2>{chef.name}</h2>
      <p>{chef.profile}</p>
    </div>
  );
}
