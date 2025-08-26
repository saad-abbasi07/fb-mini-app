"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* -----------------------------
   Minimal inline icon component
----------------------------- */
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d={path} />
  </svg>
);

/* -----------------------------
   Fake random feed generator
----------------------------- */
function useRandomFeed() {
  return useMemo(() => {
    const posts = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      author: `User ${i + 1}`,
      time: `${i + 1}h`,
      content: "This is a random post for demo purposes 🎉",
      image: `https://picsum.photos/seed/${i}/500/300`,
      likes: Math.floor(Math.random() * 300),
      comments: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 20),
    }));
    return posts;
  }, []);
}

/* -----------------------------
   Top Navigation Bar
----------------------------- */
const TopNav = ({ user, onLogout }) => (
  <header className="sticky top-0 z-20 bg-white shadow flex items-center justify-between px-4 py-2">
    <div className="flex items-center gap-2">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
        alt="Facebook"
        className="w-8 h-8"
      />
      <input
        type="text"
        placeholder="Search Facebook"
        className="bg-gray-100 rounded-full px-4 py-1 text-sm focus:outline-none"
      />
    </div>
    <nav className="flex gap-4 text-gray-600">
      <button className="hover:text-blue-600">Home</button>
      <button className="hover:text-blue-600">Friends</button>
      <button className="hover:text-blue-600">Groups</button>
      <button className="hover:text-blue-600">Marketplace</button>
    </nav>
    <div className="flex items-center gap-3">
      <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer font-semibold text-gray-700">
        {user?.name?.[0] || "U"}
      </div>
      <button 
        onClick={onLogout}
        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  </header>
);

/* -----------------------------
   Sidebar Navigation
----------------------------- */
const SideNav = ({ user }) => (
  <aside className="hidden lg:block w-64 p-4 space-y-2 text-gray-700">
    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
      <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="Profile" className="w-6 h-6" />
      <span>Profile</span>
    </div>
    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
      <img src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png" alt="Friends" className="w-6 h-6" />
      <span>Friends</span>
    </div>
    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
      <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Marketplace" className="w-6 h-6" />
      <span>Marketplace</span>
    </div>
    <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg">
      <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Watch" className="w-6 h-6" />
      <span>Watch</span>
    </div>
  </aside>
);

/* -----------------------------
   Stories Section
----------------------------- */
const Stories = () => (
  <section className="flex gap-3 overflow-x-auto p-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="w-28 h-44 flex-shrink-0 rounded-xl bg-cover bg-center relative cursor-pointer shadow"
        style={{ backgroundImage: `url(https://picsum.photos/seed/story${i}/200/300)` }}
      >
        <span className="absolute bottom-2 left-2 text-white text-sm font-semibold drop-shadow">
          User {i + 1}
        </span>
      </div>
    ))}
  </section>
);

/* -----------------------------
   Feed Section
----------------------------- */
const Feed = () => {
  const posts = useRandomFeed();
  const [likes, setLikes] = useState(posts.map(p => p.likes));
  const [liked, setLiked] = useState(posts.map(() => false));

  const toggleLike = (i: number) => {
    setLiked(prev => prev.map((l, idx) => (idx === i ? !l : l)));
    setLikes(prev =>
      prev.map((count, idx) =>
        idx === i ? (liked[i] ? posts[i].likes : posts[i].likes + 1) : count
      )
    );
  };

  return (
    <div className="space-y-6">
      {posts.map((post, i) => (
        <article key={post.id} className="bg-white rounded-lg shadow p-4">
          <header className="flex items-center gap-3">
            <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center">{post.author[0]}</div>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-xs text-gray-500">{post.time} ago</p>
            </div>
          </header>
          <p className="mt-3 text-gray-800">{post.content}</p>
          <img src={post.image} alt="" className="w-full rounded-lg mt-3" />
          <div className="flex justify-between text-sm text-gray-600 mt-3">
            <span>{likes[i]} Likes</span>
            <span>{post.comments} Comments · {post.shares} Shares</span>
          </div>
          <div className="flex justify-around mt-2 border-t pt-2 text-gray-700 text-sm">
            {/* Professional Like Button */}
            <button
              onClick={() => toggleLike(i)}
              className={`flex items-center gap-1 hover:text-blue-600 ${liked[i] ? "text-blue-600 font-semibold" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Like
            </button>
            {/* Professional Comment Button */}
            <button className="flex items-center gap-1 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M21 6h-2v9H5v2c0 .55.45 1 1 1h12l4 4V7c0-.55-.45-1-1-1z"/>
              </svg>
              Comment
            </button>
            {/* Professional Share Button */}
            <button className="flex items-center gap-1 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7a2.99 2.99 0 000-1.39l7.05-4.11c.53.5 1.23.82 2.04.82 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .26.04.51.1.75L8.05 8.14C7.53 7.66 6.85 7.36 6.09 7.36 4.43 7.36 3.09 8.7 3.09 10.36s1.34 3 3 3c.76 0 1.44-.3 1.96-.77l7.05 4.11c-.06.24-.1.49-.1.75 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z"/>
              </svg>
              Share
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

/* -----------------------------
   Right Sidebar
----------------------------- */
const RightSidebar = () => (
  <aside className="hidden lg:block w-72 p-4 space-y-4">
    <div>
      <h2 className="font-semibold mb-2">Sponsored</h2>
      <div className="bg-gray-200 h-32 rounded-lg"></div>
    </div>
    <div>
      <h2 className="font-semibold mb-2">Contacts</h2>
      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <span>User {i + 1}</span>
          </li>
        ))}
      </ul>
    </div>
  </aside>
);

/* -----------------------------
   Main Page
----------------------------- */
export default function FacebookLikePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth-token");
      const userData = localStorage.getItem("user");
      
      if (!token) {
        router.push("/login");
        return;
      }
      
      try {
        if (userData) {
          setUser(JSON.parse(userData));
        }
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("auth-token");
        localStorage.removeItem("user");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <TopNav user={user} onLogout={handleLogout} />
      <main className="flex max-w-7xl mx-auto pt-4 gap-4">
        <SideNav user={user} />
        <div className="flex-1 max-w-2xl">
          <Stories />
          <Feed />
        </div>
        <RightSidebar />
      </main>
    </div>
  );
}
