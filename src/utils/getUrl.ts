const getUrl = (path: string) => {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${path}`;
  } else {
    return `http://localhost:3000${path}`;
  }
};

export default getUrl;
