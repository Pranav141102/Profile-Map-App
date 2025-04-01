"use client";

import { useState } from "react";

interface Profile {
  id: number;
  name: string;
  description: string;
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "John Doe",
    description: "Software Engineer at Google",
  },
  {
    id: 2,
    name: "Jane Smith",
    description: "Data Scientist at Microsoft",
  },
];

export default function Admin() {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Profile List */}
      <ul className="bg-white shadow-lg rounded-xl p-5 max-w-lg mx-auto">
        {profiles.map((profile) => (
          <li
            key={profile.id}
            className="p-3 border-b last:border-none hover:bg-gray-200 cursor-pointer rounded-md transition"
            onClick={() => setSelectedProfile(profile)}
          >
            <strong>{profile.name}</strong> - {profile.description}
          </li>
        ))}
      </ul>

      {/* Selected Profile Details */}
      {selectedProfile && (
        <div className="mt-6 p-4 bg-white shadow-lg rounded-xl max-w-lg mx-auto text-center">
          <h2 className="text-xl font-semibold">{selectedProfile.name}</h2>
          <p className="text-gray-600">{selectedProfile.description}</p>
        </div>
      )}
    </div>
  );
}
