from celery import Celery

# Define the Celery app
celery_app = Celery(
    "tasks",
    broker="redis://redis:6379/0",
    backend="redis://redis:6379/0",
    include=["app.tasks.processing"] # Points to your tasks file
)

celery_app.conf.update(
    task_track_started=True,
)