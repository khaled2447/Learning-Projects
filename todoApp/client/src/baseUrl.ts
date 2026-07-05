const isProduction = import.meta.env.PROD;

const prod = "https://learning-projects-production.up.railway.app/";
const dev = "http://localhost:5173/";

export const finalurl = isProduction ? prod : dev;