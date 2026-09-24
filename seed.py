from database import SessionLocal
from models import FIR

db = SessionLocal()

data = [
    FIR(
        fir_id="FIR001",
        crime_type="Human Trafficking",
        district="Bengaluru",
        state="Karnataka",
        status="Under Investigation",
        priority="HIGH"
    ),
    FIR(
        fir_id="FIR002",
        crime_type="Cyber Exploitation",
        district="Mysuru",
        state="Karnataka",
        status="Active",
        priority="HIGH"
    ),
    FIR(
        fir_id="FIR003",
        crime_type="Online Harassment",
        district="Mangaluru",
        state="Karnataka",
        status="Pending",
        priority="MEDIUM"
    ),
    FIR(
        fir_id="FIR004",
        crime_type="Stalking",
        district="Hubballi",
        state="Karnataka",
        status="Under Investigation",
        priority="MEDIUM"
    ),
    FIR(
        fir_id="FIR005",
        crime_type="Cyber Exploitation",
        district="Belagavi",
        state="Karnataka",
        status="Active",
        priority="HIGH"
    ),
]

db.add_all(data)
db.commit()
db.close()

print("Synthetic FIR data added successfully!")