const getUrl = (path: string) => {
  if (typeof window !== "undefined") return path;
  if (process.env.NEXTAUTH_URL) {
    return `${process.env.NEXTAUTH_URL}${path}`;
  } else {
    return `http://localhost:3000${path}`;
  }
};

export default getUrl;
