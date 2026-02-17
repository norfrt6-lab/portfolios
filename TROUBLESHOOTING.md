# Troubleshooting Guide

Common issues and their solutions.

## Display Issues

### Template doesn't display correctly

**Problem**: Page layout is broken or elements are misaligned.

**Solutions**:
1. Clear browser cache (Ctrl+F5 or Cmd+Shift+R)
2. Check if all CSS files are loading correctly
3. Verify file paths are correct
4. Check browser console for errors (F12)

### Images not showing

**Problem**: Images appear as broken links.

**Solutions**:
1. Verify image file paths are correct
2. Check if image files exist in the specified location
3. Ensure image file names match exactly (case-sensitive)
4. Check file extensions (.jpg vs .jpeg, .png, etc.)

### Fonts not loading

**Problem**: Text appears in default system fonts.

**Solutions**:
1. Check internet connection (for Google Fonts)
2. Verify font CDN links are correct
3. Check if fonts are blocked by adblocker
4. Look for console errors related to font loading

## Responsive Issues

### Mobile layout broken

**Problem**: Site doesn't look right on mobile devices.

**Solutions**:
1. Add viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`
2. Check if Bootstrap CSS is properly linked
3. Test with browser DevTools mobile emulation
4. Verify responsive classes are used correctly

### Elements overlapping on smaller screens

**Solutions**:
1. Check CSS media queries
2. Adjust padding and margins for mobile
3. Use Bootstrap responsive utilities
4. Test at different breakpoints

## JavaScript Issues

### Animations not working

**Problem**: Typed.js or other animations don't start.

**Solutions**:
1. Check if jQuery is loaded (if required)
2. Verify JavaScript file paths
3. Check browser console for errors
4. Ensure scripts are loaded in correct order
5. Check if script is placed before closing `</body>` tag

### Interactive features not responding

**Solutions**:
1. Open browser console (F12) and check for errors
2. Verify all required libraries are loaded
3. Check if selectors match element IDs/classes
4. Ensure no JavaScript conflicts

## Deployment Issues

### 404 errors after deployment

**Problem**: Pages work locally but show 404 on server.

**Solutions**:
1. Check file paths are relative, not absolute
2. Verify all files were uploaded
3. Check server directory structure
4. Ensure file names are case-correct

### CSS/JS not loading on deployed site

**Solutions**:
1. Check if paths use `https://` not `http://`
2. Verify CDN links are accessible
3. Check for mixed content warnings (HTTP on HTTPS site)
4. Clear CDN cache if using one

### GitHub Pages not updating

**Solutions**:
1. Check GitHub Actions status
2. Wait 5-10 minutes for propagation
3. Clear browser cache
4. Verify correct branch is selected in settings

## Performance Issues

### Slow loading times

**Solutions**:
1. Compress images (use TinyPNG, ImageOptim)
2. Minify CSS and JavaScript
3. Enable browser caching
4. Use a CDN for static assets
5. Remove unused CSS/JS

### Page freezes or becomes unresponsive

**Solutions**:
1. Check for infinite loops in JavaScript
2. Optimize heavy animations
3. Reduce image file sizes
4. Check browser console for memory leaks

## Browser Compatibility

### Works in Chrome but not Safari/Firefox

**Solutions**:
1. Check CSS vendor prefixes
2. Verify browser support for CSS features
3. Test JavaScript for browser-specific issues
4. Use Autoprefixer for CSS
5. Check Can I Use (caniuse.com) for feature support

### Internet Explorer issues

**Note**: IE is no longer supported by Microsoft. Consider:
1. Adding a message for IE users to upgrade
2. Using polyfills for modern features
3. Testing in IE11 if support is required

## Still Having Issues?

1. **Search GitHub Issues**: Someone may have faced the same problem
2. **Browser DevTools**: Check Console, Network, and Elements tabs
3. **Validate HTML/CSS**: Use W3C validators
4. **Ask for Help**: Open an issue with:
   - Detailed problem description
   - Steps to reproduce
   - Browser and OS information
   - Screenshots
   - Error messages from console

## Useful Tools

- **Browser DevTools** (F12): Debug HTML, CSS, JavaScript
- **Lighthouse**: Performance and accessibility audits
- **W3C Validator**: Validate HTML markup
- **CSS Validator**: Validate CSS syntax
- **Can I Use**: Check browser support
- **PageSpeed Insights**: Performance testing

---

Need more help? [Open an issue](https://github.com/norfrt6-lab/portfolios/issues/new) on GitHub.
Improvement 81
Improvement 82
