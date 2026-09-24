from sqlalchemy import Column, Integer, String
from database import Base


class FIR(Base):
    __tablename__ = "firs"

    id = Column(Integer, primary_key=True, index=True)
    fir_id = Column(String, unique=True, index=True)
    crime_type = Column(String)
    district = Column(String)
    state = Column(String)
    status = Column(String)
    priority = Column(String)


Base.metadata.create_all(bind=__import__("database").engine)