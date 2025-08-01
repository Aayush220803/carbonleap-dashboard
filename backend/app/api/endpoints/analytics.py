from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Optional
from app import crud, schemas
from app.core.database import get_db

router = APIRouter()

@router.get("/", response_model=schemas.AnalyticsResponse)
def get_analytics(
    field_id: Optional[str] = None,
    sensor_type: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Fetches aggregated statistics for sensor readings.
    """
    stats = crud.get_aggregated_stats(db, field_id=field_id, sensor_type=sensor_type)
    return stats