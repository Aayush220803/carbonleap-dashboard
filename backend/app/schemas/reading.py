from pydantic import BaseModel
from datetime import datetime

class ReadingBase(BaseModel):
    timestamp: datetime
    field_id: str
    sensor_type: str
    reading_value: float
    unit: str

class ReadingCreate(ReadingBase):
    pass

class Reading(ReadingBase):
    id: int
    class Config:
        from_attributes = True # orm_mode = True for Pydantic v1