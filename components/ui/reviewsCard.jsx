import Image from "next/image";

export default function ReviewsCard({
  profilePic,
  name,
  occupation,
  rating,
  comment,
}) {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14 rounded-full overflow-hidden">
          <Image
            src={profilePic}
            alt={name}
            fill
            className="object-cover"
            sizes="56px"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-gray-500">{occupation}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-yellow-400">
        {"★".repeat(Math.floor(rating))}
        {"☆".repeat(5 - Math.floor(rating))}
        <span className="text-sm text-gray-600 ml-2">{rating.toFixed(1)}</span>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">“{comment}”</p>
    </div>
  );
}
