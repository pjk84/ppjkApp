const config = {
  FLASK:
    process.env.APP_ENV === "production"
      ? `http://206.189.63.208:80/api/flask`
      : `http://localhost:5001`,
  DOTNET:
    process.env.APP_ENV === "production"
      ? `http://206.189.63.208:80/api/dotnet`
      : `http://localhost:5002`,
};

export default config;
