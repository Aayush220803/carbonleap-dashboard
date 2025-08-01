import time
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql://carbonleap:secret@db/farm_db"

# --- Retry Connection Logic ---
MAX_RETRIES = 5
RETRY_DELAY = 5 # in seconds
engine = None

for i in range(MAX_RETRIES):
    try:
        engine = create_engine(SQLALCHEMY_DATABASE_URL)
        # Try to connect
        engine.connect()
        print("Database connection successful!")
        break
    except OperationalError:
        print(f"Database connection failed. Retrying in {RETRY_DELAY} seconds... (Attempt {i+1}/{MAX_RETRIES})")
        time.sleep(RETRY_DELAY)

if engine is None:
    print("Could not connect to the database after several retries. Exiting.")
    exit(1)
# ---------------------------

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()