# DEPLOYMENT CHECKLIST - QUICK REFERENCE

## ✅ Code is Ready
- [x] Frontend builds successfully (`npm run build` ✓ 3.82s)
- [x] Backend builds successfully (`npm run build` ✓ 1.78s)
- [x] All API calls properly configured
- [x] Retry logic fixed
- [x] Debug logging added
- [x] Works on Vercel, Render, and localhost

## 📋 What You Need To Do

### Step 1: Configure Vercel Environment Variable (CRITICAL)

**Link**: https://vercel.com/dashboard

1. Go to your project settings
2. Click **Settings** → **Environment Variables**
3. **Add** new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://wendbysakshifatnani-edtn.onrender.com`
   - **Environments**: Select all (Production, Preview, Development)
4. **Save**

⚠️ **Without this step, API calls will fail in production!**

### Step 2: Trigger Vercel Redeploy

Choose one:

**Option A: Git push** (Recommended)
```bash
git add .
git commit -m "Fix: API URL configuration for production"
git push origin main
# Vercel automatically rebuilds
```

**Option B: Manual redeploy**
1. Go to Vercel project
2. Click **Deployments**
3. Click on latest deployment → **Redeploy**

### Step 3: Verify Deployment

1. Wait for build to complete (2-3 minutes)
2. Visit: https://wen-dbysakshifatnani.vercel.app/
3. Open **DevTools** (F12 → Console)
4. Look for logs starting with `[api-config]`:
   ```
   [api-config] initialized { API_BASE_URL: 'https://wendbysakshifatnani-edtn.onrender.com' }
   ```
5. If you see ✅ → Setup is correct!
6. If you see empty string → Env var not set, go back to Step 1

### Step 4: Test Functionality

| Feature | Test | Expected |
|---------|------|----------|
| **Home loads** | Visit homepage | Projects load after 20-30s |
| **Projects page** | Click "Projects" | Shows all projects |
| **Portfolio page** | Click "Portfolio" | Shows gallery |
| **Contact form** | Submit contact | Shows success message |
| **No errors** | F12 Console | No red errors |

---

## 🔍 Debugging

### If API calls are still going to localhost:

**Check 1**: Verify env var is set
```
Go to Vercel → Settings → Environment Variables
Should show: VITE_API_URL = https://wendbysakshifatnani-edtn.onrender.com
```

**Check 2**: Hard refresh browser
```
Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
Clear cache and reload
```

**Check 3**: Check deployment logs
```
Go to Vercel → Deployments → Latest → View Details
Look for "Build Logs" - should show env var being used
```

### If backend returns 502:

This is **expected** on first request (cold-start). Retry system handles it:
- System automatically retries up to 5 times
- User sees: "🚀 Server is starting... please wait"
- Should recover within 20-30 seconds

The `502` means Render server is starting, not a code error.

### If backend returns 404:

**Check**:
1. Is Render service running? 
   - Visit: https://wendbysakshifatnani-edtn.onrender.com/health
   - Should return 200 OK

2. Is endpoint correct?
   - DevTools → Network tab → Click request → Check full URL
   - Should be: `https://wendbysakshifatnani-edtn.onrender.com/api/projects`
   - NOT: `http://localhost:5173/api/projects`

---

## 🎯 Success Criteria

✅ Setup is complete when:
- [ ] Vercel dashboard shows `VITE_API_URL` env var set
- [ ] Frontend loads without localhost errors
- [ ] DevTools Console shows correct API_BASE_URL
- [ ] API calls go to `.onrender.com` domain
- [ ] Projects/portfolio data loads (after possible cold-start wait)
- [ ] Contact form can submit

---

## 📞 Still Having Issues?

Check these files for help:
- **Overview**: [API_FIX_SUMMARY.md](API_FIX_SUMMARY.md)
- **Full Guide**: [PRODUCTION_DEPLOYMENT.md](PRODUCTION_DEPLOYMENT.md)
- **Code**: [src/app/lib/api.ts](src/app/lib/api.ts#L35-L90)

Key logs to look for in DevTools Console:
- `[api-config] initialized` → Shows current API URL
- `[api-url-builder]` → Shows what URL is being called
- `[api] response` → Shows API response status
