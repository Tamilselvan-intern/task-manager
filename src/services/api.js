const BASE_URL = import.meta.env.VITE_API_URL 
console.log("BASE_URL:", BASE_URL)

export const fetchTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`)
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
};