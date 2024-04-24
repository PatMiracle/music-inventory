const BASE_URL = "http://localhost:3000/inventory";

export async function fetchItems(path: string): Promise<[]> {
  const res = await fetch(`${BASE_URL}${path}`);
  const data = await res.json();
  return data;
}
