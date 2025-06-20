import os
import uvicorn

port = int(os.getenv("PORT", 8000))
reload_mode = os.getenv("RELOAD", "false").lower() == "true"

if __name__ == "__main__":
    uvicorn.run("server.app:app", host="0.0.0.0", port=port, reload=reload_mode, log_level="debug")