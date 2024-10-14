from fastapi import FastAPI
from server.routes.recipe import router as RecipeRouter
from server.routes.user import router as UserRouter
from server.routes.review import router as ReviewRouter
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://0.0.0.0:8000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(RecipeRouter, tags=["Recipe"], prefix="/recipes")
app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(ReviewRouter, tags=["Review"], prefix="/reviews")


@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the recipes app!"}
'''
@app.on_event("startup")
def startup_db_client():
    app.mongodb_client = MongoClient(config["ATLAS_URI"])
    app.database = app.mongodb_client[config["DB_NAME"]]
    #uri = "mongodb+srv://barnalisg72:AzLrhX9E17eUCYwg@mycluster.f6ieway.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster"

    # Create a new client and connect to the server
    #client = MongoClient(uri, tls=True, tlsAllowInvalidCertificates=True, server_api=ServerApi('1'))
    print("Connected to the MongoDB database!")

@app.on_event("shutdown")
def shutdown_db_client():
    app.mongodb_client.close()

'''