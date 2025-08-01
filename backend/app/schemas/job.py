from pydantic import BaseModel
from typing import Any, Optional

class JobSubmission(BaseModel):
    task_id: str
    status: str

class JobStatus(BaseModel):
    task_id: str
    status: str
    result: Optional[Any] = None