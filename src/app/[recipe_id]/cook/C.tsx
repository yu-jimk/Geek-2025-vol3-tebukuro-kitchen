import RecipeHeader from "@/app/conponents/RecipeHeader";

const C = ({
  params,
  searchParams,
}: {
  params: { recipe_id: number };
  searchParams: { from?: string };
}) => {
  const from = searchParams?.from;

  return (
    <div>
      <RecipeHeader
        bgColor="bg-orange-400"
        textColor="text-white"
        title="基本のチャーハン"
        link={
          from === "favorites"
            ? `/${params.recipe_id}?from=favorites`
            : `/${params.recipe_id}`
        }
        iconFill="white"
      />
    </div>
  );
};

export default C;
