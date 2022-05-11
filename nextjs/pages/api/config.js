const config = {
  flaskBaseUrl:
    process.env.APP_ENV === "production"
      ? `http://206.189.63.208:80/api`
      : `http://localhost:5001/api/flask`,
  dotnetBaseUrl:
    process.env.APP_ENV === "production"
      ? `http://206.189.63.208:80/api`
      : `http://localhost:5002/api/dotnet`,
};

export default config;
