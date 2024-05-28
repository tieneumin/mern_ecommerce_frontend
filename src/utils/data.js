// console.log(process.env.NODE_ENV); // "development" for http://localhost:5000
// `npm run build` turns this to "production"

export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : "http://10.1.104.3:5000";
