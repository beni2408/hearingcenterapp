export default function BTEcard({
  image,
  name,
  description,
}: {
  image: string;
  name: string;
  description: string;
}) {
  return (
    <div className="w-[380px] h-[500px] rounded-lg">
      <img src={image} className="rounded-lg w-[380px] h-[320px]" alt="" />
      <h2 className="text-xl font-bold text-blue-900 mb-4 mt-3">{name}</h2>
      <p className="text-gray-600 leading-relaxed text-sm text-justify">
        {description}
      </p>
    </div>
  );
}
