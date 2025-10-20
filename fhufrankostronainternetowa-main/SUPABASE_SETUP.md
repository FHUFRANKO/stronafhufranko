# Instrukcja konfiguracji Supabase Storage dla FHU FRANKO

## Krok 1: Utwórz bucket w Supabase

1. Zaloguj się do panelu Supabase: https://app.supabase.com
2. Wybierz swój projekt
3. W menu po lewej stronie kliknij "Storage"
4. Kliknij "Create a new bucket"
5. Wpisz nazwę bucketu: **bus-images**
6. **WAŻNE**: Zaznacz opcję "Public bucket" (aby zdjęcia były publicznie dostępne)
7. Kliknij "Create bucket"

## Krok 2: Konfiguracja polityk bezpieczeństwa (RLS)

Po utworzeniu bucketu, musisz skonfigurować polityki dostępu:

1. Kliknij na bucket "bus-images"
2. Przejdź do zakładki "Policies"
3. Kliknij "New Policy"
4. Wybierz szablon "Allow public read access"
5. Nazwij politykę: "Public read access"
6. Zatwierdź utworzenie

Następnie dodaj politykę dla uploadowania:

1. Kliknij "New Policy" ponownie
2. Wybierz "Custom policy"
3. Nazwa: "Allow authenticated uploads"
4. Target roles: wybierz "authenticated" i "anon"
5. Policy definition:
   - Operation: INSERT
   - WITH CHECK expression: `true`
6. Zatwierdź utworzenie

## Krok 3: Sprawdź konfigurację

Twoja aplikacja jest już skonfigurowana z następującymi danymi:
- Supabase URL: https://jzmcnrzuvdihyxnzfykf.supabase.co
- Bucket name: bus-images

## Testowanie

Po utworzeniu bucketu i polityk, możesz:
1. Przejść do panelu admina: `/admin`
2. Kliknąć "Dodaj Bus" w zakładce Ogłoszenia
3. Wypełnić formularz
4. Przesłać zdjęcia - powinny zostać przesłane do Supabase Storage

## Rozwiązywanie problemów

### Problem: Błąd 403 (Unauthorized) podczas uploadu
**Rozwiązanie**: Upewnij się, że utworzyłeś polityki RLS dla bucketu (krok 2)

### Problem: Zdjęcia nie są widoczne na stronie
**Rozwiązanie**: Upewnij się, że bucket jest publiczny (krok 1, punkt 6)

### Problem: Nie mogę utworzyć bucketu
**Rozwiązanie**: Sprawdź czy masz uprawnienia administratora w projekcie Supabase

## Alternatywna metoda: SQL

Możesz też utworzyć polityki używając SQL w zakładce SQL Editor:

```sql
-- Polityka dla odczytu publicznego
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'bus-images' );

-- Polityka dla uploadu (authenticated i anon)
CREATE POLICY "Allow authenticated uploads"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'bus-images' );
```

## Gotowe!

Po wykonaniu powyższych kroków, system uploadowania zdjęć powinien działać bez problemów.
