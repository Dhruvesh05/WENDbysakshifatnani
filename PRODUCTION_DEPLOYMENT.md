# PRODUCTION DEPLOYMENT GUIDE

## 🚀 Vercel Frontend Deployment

### Environment Variables Setup

The frontend needs to be configured to call the correct backend URL in production.

#### For Vercel Dashboard:

1. Go to your Vercel project: https://vercel.com/dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables (for all environments: Production, Preview, Development):

```
VITE_API_URL = https://wendbysakshifatnani-edtn.onrender.com
```

4. Redeploy your project

#### For GitHub Actions or CI/CD:

The environment variable will be automatically available in your deployment.

---

## 🔧 Debugging Production Issues

### Check the Browser DevTools Console

When the app loads, you should see API configuration logs:

```
[api-config] initialized { API_BASE_URL: 'https://wendbysakshifatnani-edtn.onrender.com' }
[api-config] EmailJS is configured and ready
[api-url-builder] { path: '/api/projects', apiBaseUrl: 'https://wendbysakshifatnani-edtn.onrender.com', finalUrl: 'https://wendbysakshifatnani-edtn.onrender.com/api/projects', isAbsolute: true }
```

### Verify API Calls Are Going to the Correct URL

1. Open **DevTools** (F12)
2. Go to **Network** tab
3. Reload the page
4. Look for `/api/projects` or `/api/contact` requests
5. Check that the URL is: `https://wendbysakshifatnani-edtn.onrender.com/api/*`
6. **NOT**: `http://localhost:5173/api/*` or relative `/api/*`

### Common Issues

#### Issue: API calls to `http://localhost:5173/api/*`
- **Cause**: `VITE_API_URL` environment variable not set on Vercel
- **Fix**: Set `VITE_API_URL=https://wendbysakshifatnani-edtn.onrender.com` in Vercel dashboard

#### Issue: 502 Bad Gateway from Render
- **Cause**: Backend service is sleeping (cold-start)
- **Expected**: Retry system will automatically retry for 20-30 seconds
- **User sees**: "🚀 Server is starting... please wait"
- **Fix**: No action needed, just wait

#### Issue: 404 Not Found for `/api/projects`
- **Cause**: Backend URL is completely wrong
- **Verify**: 
  - Render service is running: https://wendbysakshifatnani-edtn.onrender.com/health
  - Environment variable is set correctly

---

## 📊 Architecture Overview

```
┌─────────────────┐
│  User Browser   │
└────────┬────────┘
         │
         │ fetch('https://wendbysakshifatnani-edtn.onrender.com/api/projects')
         │
    ┌────▼─────────────────────┐
    │   Vercel CDN (Frontend)   │
    │  wen-dbysakshifatnani     │
    │  .vercel.app              │
    └────┬─────────────────────┘
         │
         │ API calls over HTTPS
         │
    ┌────▼──────────────────────┐
    │  Render Backend (Node.js)  │
    │  wendbysakshifatnani-edtn  │
    │  .onrender.com             │
    └────┬──────────────────────┘
         │
    ┌────▼──────────────┐
    │  Supabase DB      │
    │  (PostgreSQL)     │
    └───────────────────┘
```

---

## ✅ After Deployment Checklist

1. **Frontend loads without errors**
   - No "localhost" references in console
   - No CORS errors

2. **API calls are going to correct URL**
   - DevTools Network tab shows `https://wendbysakshifatnani-edtn.onrender.com/*`

3. **Cold-start handling works**
   - First load might show "🚀 Server is starting..."
   - After 20-30 seconds, content loads

4. **All pages work**
   - Home: projects load
   - Projects: filters work, images display
   - Portfolio: gallery displays
   - Contact: form submits successfully

5. **No errors in console**
   - No CORS errors
   - No 404 errors
   - No "unsafe" navigation errors

---

## 🆘 Still Having Issues?

Check the browser console (F12 → Console) for logs starting with `[api-config]` or `[api]`:

```javascript
// Example of successful configuration:
[api-config] initialized { API_BASE_URL: 'https://wendbysakshifatnani-edtn.onrender.com' }
[api-url-builder] { path: '/api/projects', ..., finalUrl: 'https://...onrender.com/api/projects' }
[api] response 200 { endpoint: '...', status: 200, attempt: 1 }

// Example of failed configuration:
[api-config] initialized { API_BASE_URL: '' }
[api-url-builder] { path: '/api/projects', ..., finalUrl: '/api/projects' } // <- This is wrong!
```

If the `API_BASE_URL` is empty `('')`, the environment variable is not set in Vercel.
