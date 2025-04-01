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
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            {profile.name} - {profile.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
