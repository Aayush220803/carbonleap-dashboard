from sqlalchemy.orm import Session
from . import models, schemas
from typing import List

def create_sensor_readings(db: Session, readings: List[schemas.ReadingCreate]):
    db_readings = [models.SensorReading(**r.model_dump()) for r in readings]
    db.add_all(db_readings)
    db.commit()
    # Refresh to get IDs
    for reading in db_readings:
        db.refresh(reading)
    return db_readings

def get_aggregated_stats(db: Session, field_id: str | None, sensor_type: str | None):
    # This is a placeholder for your analytics logic.
    # A real implementation would query an analytics table or perform complex aggregations.
    query = db.query(models.SensorReading)
    if field_id:
        query = query.filter(models.SensorReading.field_id == field_id)
    if sensor_type:
        query = query.filter(models.SensorReading.sensor_type == sensor_type)
        
    latest_readings = query.order_by(models.SensorReading.timestamp.desc()).limit(10).all()
    
    return {"latest_readings": latest_readings, "total_count": query.count()}