const BASE_URL = import.meta.env.VITE_API_URL 
console.log("BASE_URL:", BASE_URL)

export const fetchTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`)
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return res.json();
};

//post 
export const addTaskAPI = async (title) => {
  // console.log(JSON.stringify({ title }))
  const res = await fetch(`${BASE_URL}/addtasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });
  return res.json();
}; 

// DELETE
export const deleteTaskAPI = async (id) => {
  await fetch(`${BASE_URL}/deletetasks/${id}`, {
    method: "DELETE",
  });
};
//UPDATE
export const toggleTaskAPI = async(id) =>{
  await fetch(`${BASE_URL}/tasks/${id}`,{
    method:"PUT"
  })
}