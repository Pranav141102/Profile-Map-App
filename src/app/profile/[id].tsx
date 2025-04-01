"use client";

import { useParams, useRouter } from "next/navigation";

const profiles = [
  {
    id: 1,
    name: "John Doe",
    description: "Software Engineer at Google",
    image: "/profile1.jpg",
    location: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 2,
    name: "Jane Smith",
    description: "Data Scientist at Microsoft",
    image: "/profile2.jpg",
    location: { lat: 40.7128, lng: -74.0060 },
  },
];

export default function ProfileDetail() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string; // Ensure it's treated as a string
  const profile = profiles.find((p) => p.id === Number(id));

  if (!profile)
    return <p className="text-center text-red-500 text-xl font-semibold">❌ Profile not found!</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold">{profile.name}</h1>
      <p className="text-lg text-gray-600">{profile.description}</p>

      {/* Google Maps Embed */}
      <iframe
        width="80%"
        height="300"
        className="rounded-lg shadow-md border border-gray-300"
        src={`https://www.google.com/maps?q=${profile.location.lat},${profile.location.lng}&output=embed`}
      ></iframe>

      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
      >
        🔙 Back
      </button>
    </div>
  );
}
