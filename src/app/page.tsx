'use client';

import { useState } from 'react';

interface Profile {
  id: number;
  name: string;
  description: string;
  location: { lat: number; lng: number };
}

const initialProfiles: Profile[] = [
  {
    id: 1,
    name: 'John Doe',
    description: 'Software Engineer at Google',
    location: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: 2,
    name: 'Jane Smith',
    description: 'Data Scientist at Microsoft',
    location: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: 3,
    name: 'Viren Shrama',
    description: 'Data Analyst at Google',
    location: { lat: 17.4065, lng: 78.4772 },
  },
];

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const [newProfile, setNewProfile] = useState<Profile>({
    id: profiles.length + 1, // Ensuring sequential ID
    name: '',
    description: '',
    location: { lat: 0, lng: 0 },
  });

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Function to copy coordinates with error handling
  const copyToClipboard = async (lat: number, lng: number) => {
    try {
      const text = `${lat}, ${lng}`;
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2s
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleAddProfile = () => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1 }]);
    setIsFormVisible(false);
    setNewProfile({ id: profiles.length + 2, name: '', description: '', location: { lat: 0, lng: 0 } });
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} min-h-screen`}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 flex justify-between items-center shadow-md z-10">
        <h1 className="text-2xl font-bold">🌍 Profile Map App</h1>
        <button
          onClick={toggleTheme}
          className="bg-white text-gray-800 py-2 px-5 rounded-full shadow-md hover:bg-gray-200 transition"
        >
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </nav>

      {/* Main Content */}
      <div className="pt-20 flex flex-col items-center py-10 w-full">
        {/* Add Profile Button */}
        <button
          onClick={() => setIsFormVisible(true)}
          className="bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition mb-6"
        >
          ➕ Add New Profile
        </button>

        {/* Profile Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-2xl p-5 flex flex-col items-center transition hover:shadow-2xl cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedProfile(profile)}
            >
              <h2 className="text-xl font-bold">{profile.name}</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm text-center mt-2">{profile.description}</p>
            </div>
          ))}
        </div>

        {/* New Profile Form (Modal) */}
        {isFormVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-96">
              <h3 className="text-2xl font-semibold text-center mb-4">Add New Profile</h3>
              <input
                type="text"
                value={newProfile.name}
                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                className="w-full p-2 border rounded-md mb-3 bg-gray-100 dark:bg-gray-800 dark:text-white"
                placeholder="Enter name"
              />
              <input
                type="text"
                value={newProfile.description}
                onChange={(e) => setNewProfile({ ...newProfile, description: e.target.value })}
                className="w-full p-2 border rounded-md mb-3 bg-gray-100 dark:bg-gray-800 dark:text-white"
                placeholder="Enter description"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  value={newProfile.location.lat}
                  onChange={(e) => setNewProfile({ ...newProfile, location: { ...newProfile.location, lat: +e.target.value } })}
                  className="w-1/2 p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
                  placeholder="Latitude"
                />
                <input
                  type="number"
                  value={newProfile.location.lng}
                  onChange={(e) => setNewProfile({ ...newProfile, location: { ...newProfile.location, lng: +e.target.value } })}
                  className="w-1/2 p-2 border rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white"
                  placeholder="Longitude"
                />
              </div>
              <button
                onClick={handleAddProfile}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600 transition"
              >
                Add Profile
              </button>
              <button
                onClick={() => setIsFormVisible(false)}
                className="w-full bg-gray-500 text-white py-2 px-4 rounded-md mt-2 hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Map View of Selected Profile */}
        {selectedProfile && (
          <div className="mt-8 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {selectedProfile.name}&rsquo;s Location
            </h2>

            {/* Click-to-Copy Coordinates */}
            <div className="flex flex-col items-center">
              <p
                className="text-blue-600 cursor-pointer underline hover:text-blue-800 text-center mt-2"
                onClick={() => copyToClipboard(selectedProfile.location.lat, selectedProfile.location.lng)}
              >
                📍 {selectedProfile.location.lat}, {selectedProfile.location.lng} (Click to Copy)
              </p>

              {/* Copied message */}
              {copied && <p className="text-green-500 text-center mt-2">✔ Coordinates Copied!</p>}
            </div>

            <iframe
              className="w-full h-72 rounded-xl border-2 border-gray-300"
              src={`https://www.google.com/maps?q=${selectedProfile.location.lat},${selectedProfile.location.lng}&output=embed`}
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}
