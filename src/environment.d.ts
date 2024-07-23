declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      JWT_PRIVATE_KEY: string;
      SALT_ROUNDS: string;
      HOST: string;
    }
  }
}

export {}
