

export default async function getAllQuestion() {
    const response = await fetch("/eng.json"); // ✅ Fetch from public folder
    const data = await response.json();
    console.log(data)
    return data;
}