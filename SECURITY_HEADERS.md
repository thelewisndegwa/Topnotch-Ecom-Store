# Security Headers Configuration

## Current Security Headers

The application includes comprehensive security headers configured in `src/middleware.ts`:

### Headers Applied

1. **X-Content-Type-Options: nosniff**
   - Prevents MIME type sniffing
   - Forces browsers to respect declared content types

2. **X-Frame-Options: DENY**
   - Prevents the page from being embedded in iframes
   - Protects against clickjacking attacks

3. **X-XSS-Protection: 1; mode=block**
   - Enables XSS filtering in older browsers
   - Blocks pages when XSS is detected

4. **Content-Security-Policy (CSP)**
   - Development: Allows `unsafe-eval` and `unsafe-inline` for hot reload
   - Production: Stricter policy, only allows same-origin resources
   - Images: Allows `https:` for external images (Pexels, Unsplash)

5. **Referrer-Policy: strict-origin-when-cross-origin**
   - Controls referrer information sent with requests
   - Sends full URL for same-origin, origin only for cross-origin

6. **Permissions-Policy**
   - Disables geolocation, microphone, camera, payment, USB, etc.
   - Prevents unauthorized access to device features

7. **X-DNS-Prefetch-Control: off**
   - Disables DNS prefetching for privacy

8. **Strict-Transport-Security (HSTS)** - Production Only
   - Forces HTTPS connections
   - Only applied in production when using HTTPS
   - Max age: 1 year (31536000 seconds)
   - Includes subdomains by default

## Development vs Production

### Development (localhost)
- ✅ Security headers applied
- ⚠️ HTTP connection (expected - browsers will warn)
- ⚠️ HSTS not applied (browsers ignore HSTS on localhost)
- ✅ CSP allows `unsafe-eval` for hot reload

### Production (Vercel)
- ✅ All security headers applied
- ✅ HTTPS automatically (Vercel provides SSL)
- ✅ HSTS applied (forces HTTPS)
- ✅ Stricter CSP (no `unsafe-eval`)

## "Insecure Connection" Warning

### Why You See It

**In Development:**
- Running on `http://localhost:3000` (HTTP, not HTTPS)
- Browsers show "Not Secure" warning for HTTP connections
- This is **normal and expected** for local development

**In Production (Vercel):**
- ✅ Automatically uses HTTPS
- ✅ SSL certificate provided by Vercel
- ✅ No "insecure" warnings
- ✅ HSTS header forces HTTPS

### How to Fix in Development

**Option 1: Ignore the Warning (Recommended)**
- The warning is expected for local development
- Production will use HTTPS automatically
- No action needed

**Option 2: Use HTTPS Locally (Advanced)**
If you want HTTPS in development:
```bash
# Install mkcert for local SSL
npm install -g mkcert

# Create local certificate
mkcert localhost

# Update next.config.ts to use HTTPS
# (Requires custom server setup - not recommended for Next.js)
```

**Note:** Using HTTPS locally is complex and not necessary. The warning is harmless in development.

## External Resources

All external resources use HTTPS:
- ✅ Images: `https://images.pexels.com`
- ✅ Images: `https://images.unsplash.com`
- ✅ YouTube: `https://www.youtube.com`
- ✅ Google Fonts: `https://fonts.googleapis.com`

**No mixed content issues** - all external resources are HTTPS.

## SVG Namespace

The `xmlns="http://www.w3.org/2000/svg"` in SVG elements is:
- ✅ Just an XML namespace declaration
- ✅ Not an actual HTTP connection
- ✅ Safe and standard
- ✅ Does not cause security warnings

## Environment Variables

Optional security header customization:

```env
# HSTS Configuration
HSTS_MAX_AGE=31536000
HSTS_INCLUDE_SUBDOMAINS=true
HSTS_PRELOAD=false

# CSP Customization
CSP_HEADER="default-src 'self'; ..."

# Referrer Policy
REFERRER_POLICY=strict-origin-when-cross-origin

# Permissions Policy
PERMISSIONS_POLICY=geolocation=(), microphone=(), ...
```

## Verification

### Check Headers in Browser

1. Open DevTools (F12)
2. Go to Network tab
3. Reload page
4. Click on any request
5. Check "Response Headers" section

### Expected Headers

```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'; ...
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), ...
Strict-Transport-Security: max-age=31536000; includeSubDomains (production only)
```

## Summary

| Aspect | Development | Production (Vercel) |
|--------|-------------|---------------------|
| Protocol | HTTP (localhost) | HTTPS (automatic) |
| Security Warning | ⚠️ Expected | ✅ None |
| HSTS | Not applied | ✅ Applied |
| SSL Certificate | None needed | ✅ Provided by Vercel |
| Security Headers | ✅ All applied | ✅ All applied |
| External Resources | ✅ HTTPS | ✅ HTTPS |

**Conclusion:** The "insecure connection" warning in development is **normal and expected**. In production on Vercel, the site will automatically use HTTPS with all security headers applied.
