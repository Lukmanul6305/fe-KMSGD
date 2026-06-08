const API_URL = import.meta.env.VITE_BACKEND_API;

interface LoginPayload {
  username: string;
  password: string;
}

export async function loginAdmin(payload: LoginPayload) {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Login gagal");
  }

  return data;
}
