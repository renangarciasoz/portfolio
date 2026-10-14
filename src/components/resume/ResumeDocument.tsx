import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { FALLBACK_FONTS, ResumeFonts } from "./fonts";
import { ResumeData } from "./resume.types";

// Same warm, near-monochrome palette as the site's light theme.
const INK = "#1C1A17";
const MUTED = "#6E685E";
const ACCENT = "#7A6E5D";
const LINE = "#DDD8CE";

const LABEL_WIDTH = 150;

// react-pdf resolves a unitless lineHeight against the style's own fontSize
// (or its 18pt default), not the inherited one, so text styles set both.
const BODY = 9.5;

const createStyles = ({ serif, sans }: ResumeFonts) =>
  StyleSheet.create({
    page: {
      paddingTop: 48,
      paddingBottom: 48,
      paddingHorizontal: 52,
      fontSize: BODY,
      fontFamily: sans,
      color: INK,
    },
    name: {
      fontFamily: serif,
      fontSize: 28,
      lineHeight: 1.15,
      letterSpacing: -0.4,
    },
    role: {
      fontSize: 11,
      fontWeight: 500,
      color: ACCENT,
      lineHeight: 1.4,
      marginTop: 4,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      marginTop: 10,
    },
    contactItem: { fontSize: 8.5, color: MUTED, lineHeight: 1.4 },
    contactSep: { fontSize: 8.5, color: MUTED, lineHeight: 1.4, marginHorizontal: 6 },
    contactLink: { color: MUTED, textDecoration: "none" },
    section: { marginTop: 22 },
    sectionTitle: {
      fontSize: 8,
      fontWeight: 600,
      color: ACCENT,
      letterSpacing: 1.6,
      marginBottom: 10,
      paddingBottom: 5,
      borderBottomWidth: 0.75,
      borderBottomColor: LINE,
    },
    paragraph: { fontSize: BODY, lineHeight: 1.55, marginBottom: 6 },
    jobBlock: { marginBottom: 12 },
    jobHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    jobTitle: { fontSize: 10.5, fontWeight: 600, lineHeight: 1.35 },
    jobPeriod: { fontSize: 8.5, color: MUTED, lineHeight: 1.35, marginLeft: 12 },
    jobMeta: { fontSize: 9, color: MUTED, lineHeight: 1.4, marginTop: 1, marginBottom: 4 },
    jobSummary: { fontSize: BODY, lineHeight: 1.5, marginBottom: 3 },
    bulletRow: { flexDirection: "row", marginBottom: 2 },
    bulletDot: { width: 10, fontSize: BODY, color: ACCENT, lineHeight: 1.5 },
    bulletText: { flex: 1, fontSize: BODY, lineHeight: 1.5 },
    labelRow: { flexDirection: "row", marginBottom: 4 },
    label: { width: LABEL_WIDTH, fontSize: BODY, fontWeight: 600, lineHeight: 1.45 },
    labelValue: { flex: 1, fontSize: BODY, color: MUTED, lineHeight: 1.45 },
    eduBlock: { marginBottom: 8 },
    eduTitle: { fontSize: 10, fontWeight: 600, lineHeight: 1.4 },
    eduMeta: { fontSize: 9, color: MUTED, lineHeight: 1.4 },
  });

type Styles = ReturnType<typeof createStyles>;

// Uppercased here rather than with textTransform, which drops the
// letter spacing around accented capitals (FORMAÇÃO, EXPERIÊNCIA).
const SectionTitle = ({
  styles,
  locale,
  children,
}: {
  styles: Styles;
  locale: string;
  children: string;
}) => (
  <Text style={styles.sectionTitle} minPresenceAhead={60}>
    {children.toLocaleUpperCase(locale)}
  </Text>
);

export const ResumeDocument = ({
  data,
  fonts = FALLBACK_FONTS,
}: {
  data: ResumeData;
  fonts?: ResumeFonts;
}) => {
  const styles = createStyles(fonts);

  const contacts = [
    { label: data.location },
    { label: data.email, href: `mailto:${data.email}` },
    { label: data.phone },
    ...data.socials.map((s) => ({ label: s.name, href: s.href })),
  ].filter((c): c is { label: string; href?: string } => Boolean(c.label));

  return (
    <Document
      author={data.name}
      title={`${data.name}, ${data.role}`}
      language={data.locale}
    >
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.role}>{data.role}</Text>
          <View style={styles.contactRow}>
            {contacts.map((contact, index) => (
              <View
                key={index}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                {index > 0 && <Text style={styles.contactSep}>·</Text>}
                {contact.href ? (
                  <Link
                    src={contact.href}
                    style={[styles.contactItem, styles.contactLink]}
                  >
                    {contact.label}
                  </Link>
                ) : (
                  <Text style={styles.contactItem}>{contact.label}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Summary */}
        {data.summaryParagraphs.length > 0 && (
          <View style={styles.section}>
            <SectionTitle styles={styles} locale={data.locale}>
              {data.labels.summary}
            </SectionTitle>
            {data.summaryParagraphs.map((p, i) => (
              <Text key={i} style={styles.paragraph}>
                {p}
              </Text>
            ))}
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <SectionTitle styles={styles} locale={data.locale}>
              {data.labels.experience}
            </SectionTitle>
            {data.experience.map((job, i) => (
              <View key={i} style={styles.jobBlock}>
                {/* Keep the title with its company and first lines. */}
                <View wrap={false} minPresenceAhead={40}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>{job.title}</Text>
                    <Text style={styles.jobPeriod}>{job.period}</Text>
                  </View>
                  <Text style={styles.jobMeta}>
                    {job.company}
                    {job.location ? `  ·  ${job.location}` : ""}
                  </Text>
                </View>
                {job.summary ? (
                  <Text style={styles.jobSummary}>{job.summary}</Text>
                ) : null}
                {job.highlights?.map((h, j) => (
                  <View key={j} style={styles.bulletRow} wrap={false}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{h}</Text>
                  </View>
                ))}
              </View>
            ))}
            {data.earlierCompanies.length > 0 && (
              <View style={styles.labelRow} wrap={false}>
                <Text style={styles.label}>{data.earlierLabel}</Text>
                <Text style={styles.labelValue}>
                  {data.earlierCompanies.join("  ·  ")}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <View style={styles.section}>
            <SectionTitle styles={styles} locale={data.locale}>
              {data.labels.skills}
            </SectionTitle>
            {data.skills.map((group, i) => (
              <View key={i} style={styles.labelRow} wrap={false}>
                <Text style={styles.label}>{group.category}</Text>
                <Text style={styles.labelValue}>
                  {group.items.join("  ·  ")}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <SectionTitle styles={styles} locale={data.locale}>
              {data.labels.education}
            </SectionTitle>
            {data.education.map((edu, i) => (
              <View key={i} style={styles.eduBlock} wrap={false}>
                <Text style={styles.eduTitle}>{edu.title}</Text>
                <Text style={styles.eduMeta}>
                  {edu.institution}
                  {edu.detail ? `  ·  ${edu.detail}` : ""}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <View style={styles.section} wrap={false}>
            <SectionTitle styles={styles} locale={data.locale}>
              {data.labels.languages}
            </SectionTitle>
            {data.languages.map((lang, i) => (
              <View key={i} style={styles.labelRow}>
                <Text style={styles.label}>{lang.name}</Text>
                <Text style={styles.labelValue}>{lang.level}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
