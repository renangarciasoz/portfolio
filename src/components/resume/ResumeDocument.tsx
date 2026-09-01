/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { ResumeData } from "./resume.types";

const ACCENT = "#4F46E5";
const INK = "#111318";
const MUTED = "#5B616E";
const LINE = "#E4E5EA";

const styles = StyleSheet.create({
  page: {
    paddingTop: 44,
    paddingBottom: 44,
    paddingHorizontal: 48,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: INK,
    lineHeight: 1.5,
  },
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", letterSpacing: -0.5 },
  role: { fontSize: 12, color: ACCENT, fontFamily: "Helvetica-Bold", marginTop: 2 },
  contactRow: { flexDirection: "row", flexWrap: "wrap", marginTop: 8, gap: 4 },
  contactItem: { fontSize: 9, color: MUTED },
  contactSep: { fontSize: 9, color: LINE, marginHorizontal: 4 },
  link: { color: ACCENT, textDecoration: "none" },
  section: { marginTop: 20 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: MUTED,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: LINE,
  },
  paragraph: { marginBottom: 6, color: INK },
  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 1,
  },
  jobTitle: { fontSize: 11, fontFamily: "Helvetica-Bold" },
  jobPeriod: { fontSize: 9, color: MUTED },
  jobMeta: { fontSize: 9.5, color: MUTED, marginBottom: 4 },
  jobBlock: { marginBottom: 10 },
  jobSummary: { fontSize: 9.5, marginBottom: 3 },
  bulletRow: { flexDirection: "row", marginBottom: 2, paddingLeft: 2 },
  bulletDot: { fontSize: 9.5, color: MUTED, marginRight: 5 },
  bulletText: { fontSize: 9.5, flex: 1, color: INK },
  earlierRow: { flexDirection: "row", marginTop: 4 },
  earlierLabel: { width: 120, fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  earlierText: { flex: 1, fontSize: 9.5, color: MUTED },
  skillRow: { flexDirection: "row", marginBottom: 5 },
  skillCategory: { width: 120, fontFamily: "Helvetica-Bold", fontSize: 9.5 },
  skillItems: { flex: 1, fontSize: 9.5, color: MUTED },
  eduBlock: { marginBottom: 8 },
  eduTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold" },
  eduMeta: { fontSize: 9.5, color: MUTED },
});

export const ResumeDocument = ({ data }: { data: ResumeData }) => (
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
          {[
            data.location,
            data.email,
            data.phone,
            ...data.socials.map((s) => s.name),
          ]
            .filter(Boolean)
            .map((item, index) => (
              <View key={index} style={{ flexDirection: "row" }}>
                {index > 0 && <Text style={styles.contactSep}>|</Text>}
                {item === data.email ? (
                  <Link src={`mailto:${data.email}`} style={styles.link}>
                    {data.email}
                  </Link>
                ) : (
                  <Text style={styles.contactItem}>{item}</Text>
                )}
              </View>
            ))}
        </View>
      </View>

      {/* Summary */}
      {data.summaryParagraphs.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.summary}</Text>
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
          <Text style={styles.sectionTitle}>{data.labels.experience}</Text>
          {data.experience.map((job, i) => (
            <View key={i} style={styles.jobBlock}>
              <View style={styles.jobHeader}>
                <Text style={styles.jobTitle}>{job.title}</Text>
                <Text style={styles.jobPeriod}>{job.period}</Text>
              </View>
              <Text style={styles.jobMeta}>
                {job.company}
                {job.location ? `  ·  ${job.location}` : ""}
              </Text>
              {job.summary ? (
                <Text style={styles.jobSummary}>{job.summary}</Text>
              ) : null}
              {job.highlights?.map((h, j) => (
                <View key={j} style={styles.bulletRow}>
                  <Text style={styles.bulletDot}>•</Text>
                  <Text style={styles.bulletText}>{h}</Text>
                </View>
              ))}
            </View>
          ))}
          {data.earlierCompanies.length > 0 && (
            <View style={styles.earlierRow}>
              <Text style={styles.earlierLabel}>{data.earlierLabel}</Text>
              <Text style={styles.earlierText}>
                {data.earlierCompanies.join("  ·  ")}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.skills}</Text>
          {data.skills.map((group, i) => (
            <View key={i} style={styles.skillRow}>
              <Text style={styles.skillCategory}>{group.category}</Text>
              <Text style={styles.skillItems}>{group.items.join(" · ")}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.education}</Text>
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{data.labels.languages}</Text>
          {data.languages.map((lang, i) => (
            <View key={i} style={styles.skillRow}>
              <Text style={styles.skillCategory}>{lang.name}</Text>
              <Text style={styles.skillItems}>{lang.level}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);
