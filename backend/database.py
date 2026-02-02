"""Database configuration with sync sessions."""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from config import settings

# Use sync driver - replace asyncpg with psycopg2
database_url = settings.database_url
if "+asyncpg" in database_url:
    database_url = database_url.replace("+asyncpg", "")

engine_args = {"echo": True, "pool_pre_ping": True}
if "sqlite" in database_url:
    engine_args["connect_args"] = {"check_same_thread": False}

engine = create_engine(database_url, **engine_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    """Yield database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
