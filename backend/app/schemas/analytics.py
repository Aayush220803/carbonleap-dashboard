from pydantic import BaseModel
from typing import List
from .reading import Reading # Import the existing Reading schema

class AnalyticsResponse(BaseModel):
    latest_readings: List[Reading]
    total_count: int