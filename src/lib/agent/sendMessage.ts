export async function sendMessage(message: string) {
  const res = await fetch("/api/refund", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  return data.reply;
}