"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUrls = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/api/v1/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.ok) {
          const data = await res.json();
          setUrls(data.data);
        } else {
          console.error("Failed to fetch URLs");
        }
      } catch (error) {
        console.error("Error fetching URLs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUrls();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Shortened URLs</h1>
      {urls.length > 0 ? (
        <ul>
          {urls.map((url: any) => (
            <li key={url.shortId} className="mb-2">
              <p>
                <strong>Original URL:</strong> {url.originalUrl}
              </p>
              <p>
                <strong>Short URL:</strong>{" "}
                <a
                  href={`${process.env.NEXT_PUBLIC_REDIRECT_URL}/${url.shortId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`${process.env.NEXT_PUBLIC_REDIRECT_URL}/${url.shortId}`}
                </a>
              </p>
              <p>
                <strong>Clicks:</strong> {url.clicks}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You haven't shortened any URLs yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
