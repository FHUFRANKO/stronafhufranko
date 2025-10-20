#!/bin/bash
# Test script for Admin Panel Authentication
# Usage: ./test_admin_auth.sh

echo "=== FHU FRANKO Admin Panel - Auth Tests ==="
echo ""

API_URL="http://localhost:8001/api"

# Test 1: Endpoint /me without token (expect 401)
echo "Test 1: GET /me without token (expect 401)"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/me)
if [ "$HTTP_CODE" = "401" ]; then
    echo "✓ PASS: Returned 401 Unauthorized"
else
    echo "✗ FAIL: Expected 401, got $HTTP_CODE"
fi
echo ""

# Test 2: Protected endpoint without token (expect 401)
echo "Test 2: GET /opinie without token (expect 401)"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/opinie)
if [ "$HTTP_CODE" = "401" ]; then
    echo "✓ PASS: Returned 401 Unauthorized"
else
    echo "✗ FAIL: Expected 401, got $HTTP_CODE"
fi
echo ""

# Test 3: Public endpoint (expect 200)
echo "Test 3: GET /opinie/public (expect 200)"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/opinie/public)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ PASS: Returned 200 OK"
else
    echo "✗ FAIL: Expected 200, got $HTTP_CODE"
fi
echo ""

# Test 4: Root endpoint (expect 200)
echo "Test 4: GET / (expect 200)"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ PASS: Returned 200 OK"
else
    echo "✗ FAIL: Expected 200, got $HTTP_CODE"
fi
echo ""

# Test 5: Stats endpoint (expect 200)
echo "Test 5: GET /stats (expect 200)"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $API_URL/stats)
if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ PASS: Returned 200 OK"
else
    echo "✗ FAIL: Expected 200, got $HTTP_CODE"
fi
echo ""

echo "=== Summary ==="
echo "Backend is running and authentication is properly configured."
echo ""
echo "Next steps:"
echo "1. Configure SUPABASE_JWT_SECRET in /app/backend/.env"
echo "2. Add admin emails to ADMIN_EMAILS in /app/backend/.env"
echo "3. Create user in Supabase Authentication"
echo "4. Open admin panel: http://localhost:3000/admin.html (or /admin)"
echo "5. Login with Supabase credentials"
