from sqlalchemy import Column, Integer, String, Float, DateTime
from ..core.database import Base

class SensorReading(Base):
    __tablename__ = "sensor_readings"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime(timezone=True), index=True)
    field_id = Column(String, index=True)
    sensor_type = Column(String, index=True)
    reading_value = Column(Float)
    unit = Column(String)