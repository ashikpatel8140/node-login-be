const appConfig: Config = {
  PORT: Number(process.env.PORT) || 5000,
  MONGO_URI: process.env.MONGO_URI as string || "mongodb://localhost:27017/test_axios",
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY as string || "JWTAVI",
  SALT_ROUNDS: process.env.SALT_ROUNDS as string || "10",
  HOST: process.env.HOST as string || "127.0.0.1",
};

interface Config {
  PORT: number
  MONGO_URI: string
  JWT_PRIVATE_KEY: string
  SALT_ROUNDS: string
  HOST: string
}

export default appConfig;
