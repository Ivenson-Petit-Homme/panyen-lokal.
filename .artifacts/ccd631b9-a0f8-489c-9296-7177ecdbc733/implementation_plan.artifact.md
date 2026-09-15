# Global CSS Cleanup & Color Fix

This plan addresses the issue where text colors (specifically white on green backgrounds) are being overridden by aggressive global CSS rules in `src/index.css`.

## User Review Required

> [!IMPORTANT]
> I am removing the "Golden Rule" (Règle d'Or) section from `index.css`. This section used `!important` and universal selectors (`*`) which broke Tailwind's ability to set text colors on a per-component basis.
> After this change, you will be able to use `text-white`, `text-[#E9C46A]`, etc., without them being forced back to black or green by the global CSS.

## Proposed Changes

### [MODIFY] [index.css](file:///C:/Users/ECME/Documents/creation site web/panyen-lokal/src/index.css)
- Remove the aggressive CSS cascade rules that force colors using `!important` and the `*` selector.
- Ensure base styles for `body`, `h1-h6`, and `p` have sensible defaults (black text on white background) without preventing overrides.
- Keep the `@theme` definitions for brand colors.

## Verification Plan

### Automated Tests
- Run `npm run lint` to ensure no issues.

### Manual Verification
- Check the **Navbar**: The text should be white on the dark green background.
- Check the **Footer**: The text and links should be white.
- Check the **Hero Section**: Titles and descriptions should be white/gold as intended.
- Check **Admin Panel**: Sidebar links should respect the colors set in the component.
