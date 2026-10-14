import type { Font as FontRegistry } from "@react-pdf/renderer";

// react-pdf reads TTF/WOFF only (not the woff2 Google Fonts serves the site),
// so the résumé pulls the same faces from Fontsource's npm package.
const FONTSOURCE = "https://cdn.jsdelivr.net/npm/@fontsource";

const fontUrl = (family: string, weight: number) =>
  `${FONTSOURCE}/${family}@5/files/${family}-latin-${weight}-normal.woff`;

export interface ResumeFonts {
  serif: string;
  sans: string;
}

export const BRAND_FONTS: ResumeFonts = { serif: "Fraunces", sans: "Inter" };

// Built into every PDF reader, used when the brand fonts can't be loaded.
export const FALLBACK_FONTS: ResumeFonts = { serif: "Times-Roman", sans: "Helvetica" };

let registered = false;

export const registerResumeFonts = (Font: typeof FontRegistry) => {
  // Keep words whole; the default hyphenation splits short labels mid-word.
  Font.registerHyphenationCallback((word) => [word]);

  if (registered) return;
  registered = true;

  Font.register({
    family: BRAND_FONTS.serif,
    fonts: [{ src: fontUrl("fraunces", 400), fontWeight: 400 }],
  });
  Font.register({
    family: BRAND_FONTS.sans,
    fonts: [
      { src: fontUrl("inter", 400), fontWeight: 400 },
      { src: fontUrl("inter", 500), fontWeight: 500 },
      { src: fontUrl("inter", 600), fontWeight: 600 },
    ],
  });
};
