from fastapi import APIRouter
from celery.result import AsyncResult
from app import schemas
from app.tasks.main import celery_app

# This line was missing or in the wrong place
router = APIRouter()

@router.get("/{task_id}", response_model=schemas.JobStatus)
def get_task_status(task_id: str):
    task_result = AsyncResult(task_id, app=celery_app)
    return {
        "task_id": task_id,
        "status": task_result.status,
        "result": task_result.result if task_result.ready() else None
    }