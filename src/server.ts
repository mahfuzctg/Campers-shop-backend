// src/server.ts
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function main() {
  try {
    // Ensure that config.database_url and config.port are defined
    if (!config.database_url || !config.port) {
      throw new Error(
        "Database URL or port is not defined in the configuration."
      );
    }

    await mongoose.connect(config.database_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Error starting the server:", err);
  }
}

main();
