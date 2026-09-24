from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal
from models import FIR

app = FastAPI(title="CrimeIntel AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "CrimeIntel AI Backend is running"}


@app.get("/api/stats")
def stats():
    db = SessionLocal()

    total_firs = db.query(FIR).count()
    active_cases = db.query(FIR).filter(
        FIR.status == "Active"
    ).count()
    women_safety = db.query(FIR).filter(
        FIR.crime_type.in_([
            "Human Trafficking",
            "Cyber Exploitation",
            "Online Harassment",
            "Stalking"
        ])
    ).count()
    high_priority = db.query(FIR).filter(
        FIR.priority == "HIGH"
    ).count()

    db.close()

    return {
        "total_firs": total_firs,
        "active_cases": active_cases,
        "women_safety_cases": women_safety,
        "high_priority": high_priority
    }


@app.get("/api/firs")
def get_firs():
    db = SessionLocal()

    firs = db.query(FIR).all()

    result = [
        {
            "fir_id": fir.fir_id,
            "crime_type": fir.crime_type,
            "district": fir.district,
            "state": fir.state,
            "status": fir.status,
            "priority": fir.priority
        }
        for fir in firs
    ]

    db.close()

    return result