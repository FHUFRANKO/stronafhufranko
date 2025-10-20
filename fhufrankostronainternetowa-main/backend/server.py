from fastapi import FastAPI, APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from supabase import create_client, Client
import base64


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Supabase client
supabase_url = os.environ.get('SUPABASE_URL')
supabase_key = os.environ.get('SUPABASE_ANON_KEY')
supabase_bucket = os.environ.get('SUPABASE_BUCKET', 'bus-images')

supabase: Client = create_client(supabase_url, supabase_key)

# --- AUTH START ---
import jwt
from fastapi import Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

oauth2_scheme = HTTPBearer(auto_error=False)
JWT_SECRET = os.environ.get('SUPABASE_JWT_SECRET', '')
ADMIN_EMAILS = set(e.strip().lower() for e in os.environ.get('ADMIN_EMAILS', '').split(',') if e.strip())

def verify_supabase_token(token: str) -> dict:
    """Verify Supabase JWT token"""
    if not JWT_SECRET:
        raise HTTPException(status_code=500, detail="SUPABASE_JWT_SECRET not configured")
    try:
        payload = jwt.decode(
            token, 
            JWT_SECRET, 
            algorithms=["HS256"], 
            options={"verify_aud": False}
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError as e:
        raise HTTPException(status_code=401, detail=f"Invalid token: {str(e)}")

async def get_current_user(creds: HTTPAuthorizationCredentials = Depends(oauth2_scheme)):
    """Get current authenticated user from JWT token"""
    if not creds:
        raise HTTPException(status_code=401, detail="Authorization header missing")
    
    if not JWT_SECRET:
        raise HTTPException(status_code=500, detail="SUPABASE_JWT_SECRET not configured")
    
    payload = verify_supabase_token(creds.credentials)
    return payload

def admin_required(user: dict = Depends(get_current_user)):
    """Dependency to require admin privileges"""
    email = (user.get('email') or '').lower()
    if email not in ADMIN_EMAILS:
        raise HTTPException(
            status_code=403, 
            detail=f"Admin access required. Email '{email}' is not in admin list."
        )
    return user
# --- AUTH END ---

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Auth endpoint
@api_router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    """Get current user info and admin status"""
    email = (user.get('email') or '').lower()
    return {
        "email": email,
        "admin": email in ADMIN_EMAILS,
        "user_id": user.get('sub'),
        "authenticated": True
    }


# Models
class Bus(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    # Podstawowe informacje
    marka: str
    model: str
    rok: int
    przebieg: int  # km
    paliwo: str
    skrzynia: str
    naped: Optional[str] = None
    
    # Cena
    cenaBrutto: int  # PLN
    cenaNetto: Optional[int] = None
    vat: bool = True
    
    # Specyfikacja techniczna
    typNadwozia: str
    moc: int  # KM
    kubatura: Optional[int] = None  # cm3
    normaSpalania: Optional[str] = None  # np. "8.5 l/100km"
    normaEmisji: str  # Euro 5, Euro 6
    
    # DMC i ładowność
    dmcKategoria: str  # 'do 3.5t', '3.5-7.5t', 'powyżej 7.5t'
    ladownosc: int  # kg
    
    # Wymiary
    wymiarL: Optional[str] = None  # L1, L2, L3, L4
    wymiarH: Optional[str] = None  # H1, H2, H3
    pojemnoscSkrzyni: Optional[int] = None  # m3
    
    # Wyposażenie dodatkowe
    winda: bool = False
    hak: bool = False
    czterykola: bool = False
    klimatyzacja: bool = False
    tempomat: bool = False
    kamera: bool = False
    czujnikiParkowania: bool = False
    
    # Status i oznaczenia
    wyrozniowane: bool = False
    nowosc: bool = False
    flotowy: bool = False
    gwarancja: bool = False
    
    # Pozostałe
    kolor: Optional[str] = None
    pierwszaRejestracja: Optional[str] = None
    miasto: str
    opis: Optional[str] = None
    zdjecia: List[str] = []  # URLs zdjęć
    numerOgloszenia: Optional[str] = None
    dataPublikacji: str = Field(default_factory=lambda: datetime.utcnow().isoformat())


class BusCreate(BaseModel):
    marka: str
    model: str
    rok: int
    przebieg: int
    paliwo: str
    skrzynia: str
    naped: Optional[str] = None
    cenaBrutto: int
    cenaNetto: Optional[int] = None
    vat: bool = True
    typNadwozia: str
    moc: int
    kubatura: Optional[int] = None
    normaSpalania: Optional[str] = None
    normaEmisji: str
    dmcKategoria: str
    ladownosc: int
    wymiarL: Optional[str] = None
    wymiarH: Optional[str] = None
    pojemnoscSkrzyni: Optional[int] = None
    winda: bool = False
    hak: bool = False
    czterykola: bool = False
    klimatyzacja: bool = False
    tempomat: bool = False
    kamera: bool = False
    czujnikiParkowania: bool = False
    wyrozniowane: bool = False
    nowosc: bool = False
    flotowy: bool = False
    gwarancja: bool = False
    kolor: Optional[str] = None
    pierwszaRejestracja: Optional[str] = None
    miasto: str
    opis: Optional[str] = None
    zdjecia: List[str] = []
    numerOgloszenia: Optional[str] = None


class BusUpdate(BaseModel):
    marka: Optional[str] = None
    model: Optional[str] = None
    rok: Optional[int] = None
    przebieg: Optional[int] = None
    paliwo: Optional[str] = None
    skrzynia: Optional[str] = None
    naped: Optional[str] = None
    cenaBrutto: Optional[int] = None
    cenaNetto: Optional[int] = None
    vat: Optional[bool] = None
    typNadwozia: Optional[str] = None
    moc: Optional[int] = None
    kubatura: Optional[int] = None
    normaSpalania: Optional[str] = None
    normaEmisji: Optional[str] = None
    dmcKategoria: Optional[str] = None
    ladownosc: Optional[int] = None
    wymiarL: Optional[str] = None
    wymiarH: Optional[str] = None
    pojemnoscSkrzyni: Optional[int] = None
    winda: Optional[bool] = None
    hak: Optional[bool] = None
    czterykola: Optional[bool] = None
    klimatyzacja: Optional[bool] = None
    tempomat: Optional[bool] = None
    kamera: Optional[bool] = None
    czujnikiParkowania: Optional[bool] = None
    wyrozniowane: Optional[bool] = None
    nowosc: Optional[bool] = None
    flotowy: Optional[bool] = None
    gwarancja: Optional[bool] = None
    kolor: Optional[str] = None
    pierwszaRejestracja: Optional[str] = None
    miasto: Optional[str] = None
    opis: Optional[str] = None
    zdjecia: Optional[List[str]] = None
    numerOgloszenia: Optional[str] = None


# API Routes
@api_router.get("/")
async def root():
    return {"message": "FHU FRANKO API"}


@api_router.post("/upload", response_model=dict, dependencies=[Depends(admin_required)])
async def upload_image(file: UploadFile = File(...)):
    """Upload image to Supabase Storage"""
    try:
        # Read file content
        contents = await file.read()
        
        # Generate unique filename
        file_extension = file.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = f"buses/{unique_filename}"
        
        # Upload to Supabase
        result = supabase.storage.from_(supabase_bucket).upload(
            file_path,
            contents,
            file_options={"content-type": file.content_type}
        )
        
        # Get public URL
        public_url = supabase.storage.from_(supabase_bucket).get_public_url(file_path)
        
        return {
            "success": True,
            "url": public_url,
            "filename": unique_filename
        }
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(e)}")


@api_router.post("/ogloszenia", response_model=Bus, dependencies=[Depends(admin_required)])
async def create_bus(bus_data: BusCreate):
    """Create a new bus listing"""
    bus_dict = bus_data.dict()
    bus_obj = Bus(**bus_dict)
    
    # Generate unique listing number
    if not bus_obj.numerOgloszenia:
        count = await db.buses.count_documents({})
        bus_obj.numerOgloszenia = f"FKBUS{str(count + 1).zfill(6)}"
    
    await db.buses.insert_one(bus_obj.dict())
    return bus_obj


@api_router.get("/ogloszenia", response_model=List[Bus], dependencies=[Depends(admin_required)])
async def get_all_buses():
    """Get all bus listings"""
    buses = await db.buses.find().to_list(1000)
    return [Bus(**bus) for bus in buses]


@api_router.get("/ogloszenia/{bus_id}", response_model=Bus)
async def get_bus_by_id(bus_id: str):
    """Get a single bus listing by ID"""
    bus = await db.buses.find_one({"id": bus_id})
    if not bus:
        raise HTTPException(status_code=404, detail="Bus not found")
    return Bus(**bus)


@api_router.put("/ogloszenia/{bus_id}", response_model=Bus, dependencies=[Depends(admin_required)])
async def update_bus(bus_id: str, bus_update: BusUpdate):
    """Update a bus listing"""
    # Get existing bus
    existing_bus = await db.buses.find_one({"id": bus_id})
    if not existing_bus:
        raise HTTPException(status_code=404, detail="Bus not found")
    
    # Update only provided fields
    update_data = {k: v for k, v in bus_update.dict().items() if v is not None}
    
    if update_data:
        await db.buses.update_one(
            {"id": bus_id},
            {"$set": update_data}
        )
    
    # Get updated bus
    updated_bus = await db.buses.find_one({"id": bus_id})
    return Bus(**updated_bus)


@api_router.delete("/ogloszenia/{bus_id}", dependencies=[Depends(admin_required)])
async def delete_bus(bus_id: str):
    """Delete a bus listing"""
    result = await db.buses.delete_one({"id": bus_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Bus not found")
    return {"success": True, "message": "Bus deleted successfully"}


@api_router.get("/stats")
async def get_stats():
    """Get statistics for admin dashboard"""
    total = await db.buses.count_documents({})
    wyrozniowane = await db.buses.count_documents({"wyrozniowane": True})
    nowe = await db.buses.count_documents({"nowosc": True})
    flotowe = await db.buses.count_documents({"flotowy": True})
    
    return {
        "total": total,
        "wyrozniowane": wyrozniowane,
        "nowe": nowe,
        "flotowe": flotowe
    }


# Opinion Models
class Opinion(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    imie: str  # Imię klienta
    typDzialalnosci: str  # np. "Firma kurierska", "Budownictwo"
    komentarz: str  # Pozytywny komentarz
    ocena: int = 5  # Ocena 1-5
    zakupionyPojazd: Optional[str] = None  # np. "Mercedes Sprinter 2020"
    dataPublikacji: str = Field(default_factory=lambda: datetime.utcnow().isoformat())
    wyswietlaj: bool = True  # Czy wyświetlać na stronie


class OpinionCreate(BaseModel):
    imie: str
    typDzialalnosci: str
    komentarz: str
    ocena: int = 5
    zakupionyPojazd: Optional[str] = None
    wyswietlaj: bool = True


class OpinionUpdate(BaseModel):
    imie: Optional[str] = None
    typDzialalnosci: Optional[str] = None
    komentarz: Optional[str] = None
    ocena: Optional[int] = None
    zakupionyPojazd: Optional[str] = None
    wyswietlaj: Optional[bool] = None


# Opinion Routes
@api_router.post("/opinie", response_model=Opinion, dependencies=[Depends(admin_required)])
async def create_opinion(opinion_data: OpinionCreate):
    """Create a new opinion"""
    opinion_dict = opinion_data.dict()
    opinion_obj = Opinion(**opinion_dict)
    await db.opinions.insert_one(opinion_obj.dict())
    return opinion_obj


@api_router.get("/opinie", response_model=List[Opinion], dependencies=[Depends(admin_required)])
async def get_all_opinions():
    """Get all opinions (for admin)"""
    opinions = await db.opinions.find().to_list(1000)
    return [Opinion(**opinion) for opinion in opinions]


@api_router.get("/opinie/public", response_model=List[Opinion])
async def get_public_opinions():
    """Get only visible opinions (for public page)"""
    opinions = await db.opinions.find({"wyswietlaj": True}).to_list(1000)
    # Sort by date, newest first
    return sorted([Opinion(**opinion) for opinion in opinions], 
                  key=lambda x: x.dataPublikacji, reverse=True)


@api_router.get("/opinie/{opinion_id}", response_model=Opinion)
async def get_opinion_by_id(opinion_id: str):
    """Get a single opinion by ID"""
    opinion = await db.opinions.find_one({"id": opinion_id})
    if not opinion:
        raise HTTPException(status_code=404, detail="Opinion not found")
    return Opinion(**opinion)


@api_router.put("/opinie/{opinion_id}", response_model=Opinion, dependencies=[Depends(admin_required)])
async def update_opinion(opinion_id: str, opinion_update: OpinionUpdate):
    """Update an opinion"""
    existing_opinion = await db.opinions.find_one({"id": opinion_id})
    if not existing_opinion:
        raise HTTPException(status_code=404, detail="Opinion not found")
    
    update_data = {k: v for k, v in opinion_update.dict().items() if v is not None}
    
    if update_data:
        await db.opinions.update_one(
            {"id": opinion_id},
            {"$set": update_data}
        )
    
    updated_opinion = await db.opinions.find_one({"id": opinion_id})
    return Opinion(**updated_opinion)


@api_router.delete("/opinie/{opinion_id}", dependencies=[Depends(admin_required)])
async def delete_opinion(opinion_id: str):
    """Delete an opinion"""
    result = await db.opinions.delete_one({"id": opinion_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Opinion not found")
    return {"success": True, "message": "Opinion deleted successfully"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
