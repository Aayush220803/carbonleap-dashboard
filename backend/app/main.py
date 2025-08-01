from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.database import engine, Base
from .api.endpoints import readings, analytics, jobs

# Create DB tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Field Insights Dashboard API")

# --- Add this CORS middleware block ---
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ------------------------------------

# Include your API routers
app.include_router(readings.router, prefix="/api/v1/readings", tags=["Readings"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(jobs.router, prefix="/api/v1/jobs", tags=["Jobs"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Carbonleap Field Insights API"}