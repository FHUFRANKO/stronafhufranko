# Panel Admina - FHU FRANKO

System autoryzacji oparty na Supabase Authentication z zabezpieczeniem endpointów przez JWT.

## 📋 Spis treści

1. [Wymagania](#wymagania)
2. [Konfiguracja Supabase](#konfiguracja-supabase)
3. [Konfiguracja backendu](#konfiguracja-backendu)
4. [Konfiguracja frontendu](#konfiguracja-frontendu)
5. [Uruchomienie](#uruchomienie)
6. [Testowanie](#testowanie)
7. [Struktura projektu](#struktura-projektu)

## Wymagania

- Python 3.9+
- Node.js 16+
- MongoDB
- Konto Supabase (darmowy tier wystarczy)

## Konfiguracja Supabase

### 1. Utwórz projekt w Supabase

Przejdź do [https://app.supabase.com](https://app.supabase.com) i utwórz nowy projekt.

### 2. Dodaj użytkowników administratorów

W panelu Supabase:
1. Przejdź do **Authentication** → **Users**
2. Kliknij **Add user** → **Create new user**
3. Wprowadź email i hasło
4. Zapisz adres email - będzie potrzebny w konfiguracji `ADMIN_EMAILS`

### 3. Pobierz klucze API

W panelu Supabase przejdź do **Settings** → **API**:

- **URL**: Skopiuj `Project URL` (np. `https://xxxxx.supabase.co`)
- **ANON KEY**: Skopiuj `anon` `public` key
- **JWT SECRET**: Skopiuj `JWT Secret` (w sekcji **JWT Settings**)

## Konfiguracja backendu

### 1. Uzupełnij plik `.env`

W katalogu `/app/backend/.env` uzupełnij następujące wartości:

```env
# Supabase Configuration
SUPABASE_URL="https://xxxxx.supabase.co"
SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
SUPABASE_JWT_SECRET="twoj-jwt-secret-z-supabase"

# Admin Configuration
ADMIN_EMAILS="admin@example.com,admin2@example.com"

# API Configuration
API_BASE_URL="https://twoja-domena.com"
```

**WAŻNE:** 
- `ADMIN_EMAILS` - lista emaili rozdzielona przecinkami (bez spacji)
- Tylko użytkownicy z tych emaili będą mieli dostęp do panelu admina

### 2. Zainstaluj zależności

```bash
cd /app/backend
pip install -r requirements.txt
```

### 3. Restart backendu

```bash
sudo supervisorctl restart backend
```

## Konfiguracja frontendu

### 1. Uzupełnij plik `env.js`

W katalogu `/app/frontend/public/env.js` (lub skopiuj z `env.js.template`):

```javascript
window.ENV = window.ENV || {};
Object.assign(window.ENV, {
  SUPABASE_URL: "https://xxxxx.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  API_BASE_URL: "https://twoja-domena.com"
});
```

### 2. Zainstaluj zależności i uruchom

```bash
cd /app/frontend
yarn install
yarn start
```

## Uruchomienie

### Opcja 1: Development (lokalnie)

**Backend:**
```bash
cd /app/backend
uvicorn server:app --reload --host 0.0.0.0 --port 8001
```

**Frontend:**
```bash
cd /app/frontend
yarn start
```

**Dostęp:**
- Panel admina: http://localhost:3000/admin.html
- API: http://localhost:8001/api/

### Opcja 2: Production (Supervisor)

```bash
sudo supervisorctl restart all
sudo supervisorctl status
```

**Dostęp:**
- Panel admina: https://twoja-domena.com/admin
- API: https://twoja-domena.com/api/

## Testowanie

### Test 1: Endpoint /me bez tokenu (oczekiwany wynik: 401)

```bash
curl -i http://localhost:8001/api/me
```

**Oczekiwany wynik:**
```
HTTP/1.1 401 Unauthorized
{"detail":"Authorization header missing"}
```

### Test 2: Logowanie w panelu admina

1. Otwórz http://localhost:3000/admin.html (lub /admin na produkcji)
2. Wprowadź email i hasło użytkownika z Supabase
3. Kliknij "Zaloguj się"

**Przypadek A - Email NIE jest w ADMIN_EMAILS:**
```
"Brak uprawnień administratora dla: user@example.com"
```

**Przypadek B - Email JEST w ADMIN_EMAILS:**
- Panel się otworzy
- Zobaczysz status: "Zalogowano jako: admin@example.com [ADMIN]"
- Możesz testować endpointy API

### Test 3: Dostęp do zabezpieczonych endpointów

**Bez tokenu (401):**
```bash
curl -i http://localhost:8001/api/opinie
```

**Z tokenem użytkownika spoza listy adminów (403):**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
curl -H "Authorization: Bearer $TOKEN" http://localhost:8001/api/opinie
```

**Z tokenem admina (200):**
```bash
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
curl -H "Authorization: Bearer $TOKEN" http://localhost:8001/api/opinie
```

### Test 4: Endpoint /me z tokenem admina

```bash
TOKEN="twoj-token-z-supabase"
curl -H "Authorization: Bearer $TOKEN" http://localhost:8001/api/me
```

**Oczekiwany wynik (admin):**
```json
{
  "email": "admin@example.com",
  "admin": true,
  "user_id": "uuid-user-id",
  "authenticated": true
}
```

**Oczekiwany wynik (nie-admin):**
```json
{
  "email": "user@example.com",
  "admin": false,
  "user_id": "uuid-user-id",
  "authenticated": true
}
```

## Struktura projektu

```
/app
├── backend/
│   ├── server.py          # FastAPI z auth (JWT verify, admin_required)
│   ├── .env               # Konfiguracja z SUPABASE_JWT_SECRET, ADMIN_EMAILS
│   ├── .env.example       # Template konfiguracji
│   └── requirements.txt   # Zawiera PyJWT
│
├── frontend/
│   └── public/
│       ├── index.html     # Główna strona (React app)
│       ├── admin.html     # Panel admina (standalone)
│       ├── env.js         # Konfiguracja środowiska
│       └── env.js.template # Template konfiguracji
│
└── README_ADMIN.md        # Ten plik
```

## Zabezpieczone endpointy

Wszystkie endpointy administracyjne wymagają tokenu JWT i statusu admina:

### Ogłoszenia busów
- `POST /api/ogloszenia` - Dodaj ogłoszenie
- `GET /api/ogloszenia` - Lista wszystkich (admin)
- `PUT /api/ogloszenia/{id}` - Edytuj ogłoszenie
- `DELETE /api/ogloszenia/{id}` - Usuń ogłoszenie
- `POST /api/upload` - Upload zdjęć

### Opinie
- `POST /api/opinie` - Dodaj opinię
- `GET /api/opinie` - Lista wszystkich (admin)
- `PUT /api/opinie/{id}` - Edytuj opinię
- `DELETE /api/opinie/{id}` - Usuń opinię

### Publiczne endpointy (bez autoryzacji)
- `GET /api/ogloszenia/{id}` - Szczegóły pojedynczego busa
- `GET /api/opinie/public` - Publiczne opinie
- `GET /api/stats` - Statystyki

## Rozwiązywanie problemów

### Problem: "Invalid or expired token"

**Przyczyna:** Token JWT wygasł lub jest nieprawidłowy

**Rozwiązanie:**
1. Wyloguj się i zaloguj ponownie w panelu admina
2. Sprawdź czy `SUPABASE_JWT_SECRET` w `.env` jest poprawny

### Problem: "Admin access required"

**Przyczyna:** Email użytkownika nie jest w liście `ADMIN_EMAILS`

**Rozwiązanie:**
1. Sprawdź czy email jest dokładnie taki sam (case-insensitive)
2. Upewnij się że w `ADMIN_EMAILS` nie ma spacji między emailami
3. Restart backendu: `sudo supervisorctl restart backend`

### Problem: "SUPABASE_JWT_SECRET not configured"

**Przyczyna:** Brak zmiennej środowiskowej

**Rozwiązanie:**
1. Dodaj `SUPABASE_JWT_SECRET` do `/app/backend/.env`
2. Restart backendu

### Problem: Panel admina nie ładuje się

**Przyczyna:** Brak pliku `env.js` lub błędna konfiguracja

**Rozwiązanie:**
1. Sprawdź czy `/app/frontend/public/env.js` istnieje
2. Sprawdź czy wartości są poprawnie wypełnione (bez `${...}`)
3. Sprawdź konsolę przeglądarki (F12) dla błędów

## Uwagi bezpieczeństwa

1. **Nigdy nie commituj** plików `.env` z prawdziwymi kluczami do repozytorium
2. **SUPABASE_JWT_SECRET** trzymaj w tajemnicy - to klucz do weryfikacji tokenów
3. **ADMIN_EMAILS** - dodawaj tylko zaufane adresy email
4. Używaj HTTPS w produkcji
5. Regularnie aktualizuj hasła adminów w Supabase
6. Monitoruj logi dostępu do panelu admina

## FAQ

**Q: Jak dodać nowego admina?**  
A: Dodaj jego email do `ADMIN_EMAILS` w `.env` i zrestartuj backend

**Q: Czy mogę używać różnych tokenów JWT?**  
A: Tak, ale musisz używać Supabase jako providera autoryzacji

**Q: Jak sprawdzić czy token jest ważny?**  
A: Wywołaj `GET /api/me` - jeśli zwróci 200, token jest ważny

**Q: Jak długo token jest ważny?**  
A: Domyślnie 1 godzina (konfigurowane w Supabase)

## Kontakt

W razie problemów sprawdź logi backendu:
```bash
tail -f /var/log/supervisor/backend.err.log
tail -f /var/log/supervisor/backend.out.log
```

---

**Autor:** E1 Agent  
**Data:** 2025-10-16  
**Wersja:** 1.0.0
