const isProduction = import.meta.env.PROD;

const prod = "https://learning-projects-production.up.railway.app/";
const dev = "https://localhost:7212/";

export const finalurl = isProduction ? prod : dev;