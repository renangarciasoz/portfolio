import { Box, Container, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  /** Small uppercase label shown above the heading. */
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  /** Removes the default top spacing (used for the first section). */
  disableTopSpacing?: boolean;
}

export const Section = ({
  id,
  eyebrow,
  title,
  children,
  disableTopSpacing,
}: SectionProps) => (
  <Box
    component="section"
    id={id}
    sx={{
      scrollMarginTop: { xs: 80, md: 96 },
      py: disableTopSpacing ? { xs: 0, md: 0 } : { xs: 9, md: 16 },
    }}
  >
    <Container maxWidth="lg">
      {(eyebrow || title) && (
        <Box sx={{ mb: { xs: 4, md: 7 } }}>
          {eyebrow && (
            <Typography
              variant="overline"
              component="p"
              color="text.secondary"
              sx={{ display: "block", mb: 2, opacity: 0.8 }}
            >
              {eyebrow}
            </Typography>
          )}
          {title && (
            <Typography
              component="h2"
              variant="h3"
              sx={{ fontSize: { xs: "2rem", md: "2.9rem" } }}
            >
              {title}
            </Typography>
          )}
        </Box>
      )}
      {children}
    </Container>
  </Box>
);
