from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from app import crud, schemas
from app.core.database import get_db
from app.tasks.processing import process_batch_analytics

router = APIRouter()

@router.post("/", response_model=schemas.JobSubmission, status_code=202)
async def create_readings(
    readings: List[schemas.ReadingCreate],
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    # 1. Synchronous: Quickly save data to DB
    saved_readings = crud.create_sensor_readings(db=db, readings=readings)

    # 2. Async/Threaded: Offload heavy task to Celery
    task = process_batch_analytics.delay([r.id for r in saved_readings])

    # 3. Respond immediately with a task ID for tracking
    return {"task_id": task.id, "status": "Processing"}