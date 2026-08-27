import React from 'react';
import {
  Document,
  Font,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import type { CVData, Language, Project } from '../../types';
import { flattenSkills, formatPeriod, profileCopy } from '../profile/profileContent';
import manropeRegular from '@fontsource/manrope/files/manrope-latin-ext-400-normal.woff';
import manropeBold from '@fontsource/manrope/files/manrope-latin-ext-700-normal.woff';
import { buildPdfFileName } from './pdfHelpers';

type CvPdfDocumentProps = {
  data: CVData;
  language: Language;
};

Font.register({
  family: 'Manrope PDF',
  fonts: [
    { src: manropeRegular, fontWeight: 400 },
    { src: manropeBold, fontWeight: 700 },
  ],
});

Font.register({
  family: 'Oxanium PDF',
  src: '/fonts/oxanium-latin-ext-700.ttf',
  fontWeight: 700,
});

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f8fafc',
    color: '#0f172a',
    fontFamily: 'Manrope PDF',
    fontSize: 10,
    lineHeight: 1.32,
    paddingTop: 28,
    paddingBottom: 30,
    paddingHorizontal: 28,
  },
  header: {
    gap: 14,
    paddingBottom: 18,
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#cbd5e1',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
  },
  identity: {
    flexDirection: 'row',
    gap: 16,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  photo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    objectFit: 'cover',
  },
  photoPlaceholder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#dbeafe',
    borderWidth: 1,
    borderColor: '#93c5fd',
  },
  titleBlock: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingTop: 4,
  },
  name: {
    fontFamily: 'Oxanium PDF',
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 2,
    lineHeight: 1.02,
  },
  role: {
    fontFamily: 'Oxanium PDF',
    fontSize: 13,
    color: '#334155',
    lineHeight: 1.08,
  },
  summaryBlock: {
    marginTop: 1,
  },
  summaryLead: {
    color: '#1e293b',
    fontSize: 11,
    lineHeight: 1.26,
    marginBottom: 2,
    textAlign: 'justify',
  },
  summary: {
    color: '#334155',
    fontSize: 11,
    lineHeight: 1.28,
    textAlign: 'justify',
  },
  contact: {
    width: 170,
    alignItems: 'flex-end',
    gap: 6,
    flexShrink: 0,
    paddingTop: 4,
  },
  contactLine: {
    color: '#334155',
    textAlign: 'right',
    fontSize: 10,
  },
  link: {
    color: '#1d4ed8',
    textDecoration: 'none',
    fontSize: 10,
  },
  linkSecondary: {
    color: '#0f172a',
    textDecoration: 'none',
    fontSize: 11,
    fontWeight: 700,
    marginTop: 3,
  },
  grid: {
    flexDirection: 'row',
    gap: 18,
  },
  mainColumn: {
    flexGrow: 1,
    flexBasis: 0,
  },
  sideColumn: {
    width: 170,
    gap: 14,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: '#475569',
    marginBottom: 8,
  },
  companyBlock: {
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  companyName: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 6,
  },
  roleBlock: {
    marginBottom: 8,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#c7d2fe',
  },
  roleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 5,
  },
  roleTitle: {
    fontSize: 11,
    fontWeight: 700,
  },
  period: {
    fontSize: 9,
    color: '#64748b',
  },
  bodyText: {
    color: '#334155',
    lineHeight: 0.8,
  },
  roleDescription: {
    color: '#334155',
    lineHeight: 0.8,
    marginTop: 4,
    marginBottom: 4,
  },
  projectsList: {
    marginTop: 4,
    gap: 2,
  },
  projectLine: {
    color: '#475569',
  },
  educationBlock: {
    marginBottom: 8,
  },
  educationTitle: {
    fontSize: 11,
    fontWeight: 700,
  },
  sideCard: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#dbe4f0',
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
  skillItem: {
    paddingVertical: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#edf2f7',
    color: '#334155',
  },
  skillItemLast: {
    borderBottomWidth: 0,
  },
});

const joinField = (value: string[]) => value.join('');

const resolvePhotoSource = (photo: string) => {
  if (!photo) return null;
  if (photo.startsWith('data:') || photo.startsWith('http://') || photo.startsWith('https://')) return photo;
  if (typeof globalThis === 'undefined') return photo;
  return new URL(photo, globalThis.location.origin).toString();
};

const splitSummary = (summary: string) => {
  const firstSentenceEnd = summary.indexOf('. ');
  if (firstSentenceEnd === -1) {
    return { lead: summary, rest: '' };
  }

  return {
    lead: `${summary.slice(0, firstSentenceEnd)}.`,
    rest: summary.slice(firstSentenceEnd + 2),
  };
};

const renderProjectSummary = (projects?: Project[]) => {
  if (!projects?.length) return null;
  return projects.slice(0, 3).map((project) => (
    <Text key={`${project.name}-${project.from}`} style={styles.projectLine}>
      {'• '} {project.name}
    </Text>
  ));
};

export const CvPdfDocument: React.FC<CvPdfDocumentProps> = ({ data, language }) => {
  const copy = profileCopy[language];
  const skills = flattenSkills(data.skills).slice(0, 30);
  const photoSource = resolvePhotoSource(data.personalInfo.profilePhoto);
  const summary = splitSummary(data.summary);
  const pdfTitle = `${data.personalInfo.name} CV`;
  const pdfKeywords = [
    data.personalInfo.name,
    data.personalInfo.title,
    'Curriculum Vitae',
    'CV',
    'Oxanium',
    'Manrope',
  ];

  return (
    <Document
      title={pdfTitle}
      author={data.personalInfo.name}
      subject="Curriculum Vitae"
      creator="AI Enhanced CV Builder"
      producer="AI Enhanced CV Builder"
      keywords={pdfKeywords}
      language={language}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.identity}>
              {photoSource ? <Image src={photoSource} style={styles.photo} /> : <View style={styles.photoPlaceholder} />}
              <View style={styles.titleBlock}>
                <Text style={styles.name}>{data.personalInfo.name}</Text>
                <Text style={styles.role}>{data.personalInfo.title}</Text>
              </View>
            </View>

            <View style={styles.contact}>
              <Text style={styles.contactLine}>{joinField(data.personalInfo.email)}</Text>
              <Text style={styles.contactLine}>{joinField(data.personalInfo.phone)}</Text>
              <Text style={styles.contactLine}>{data.personalInfo.address}</Text>
              <Link src={`https://${joinField(data.personalInfo.linkedin)}`} style={styles.link}>
                {joinField(data.personalInfo.linkedin)}
              </Link>
              <Link src="https://krocek.cz" style={styles.linkSecondary}>
                krocek.cz
              </Link>
            </View>
          </View>

          <View style={styles.summaryBlock}>
            <Text style={styles.summaryLead}>{summary.lead}</Text>
            {!!summary.rest && <Text style={styles.summary}>{summary.rest}</Text>}
          </View>
        </View>

        <View style={styles.grid}>
          <View style={styles.mainColumn}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{copy.experienceSection}</Text>
              {data.companies.map((company, companyIndex) => (
                <View key={`${company.name}-${companyIndex}`} style={styles.companyBlock}>
                  <Text style={styles.companyName}>{company.name}</Text>
                  {company.roles.map((role, roleIndex) => (
                    <View key={`${role.title}-${roleIndex}`} style={styles.roleBlock}>
                      <View style={styles.roleHeader}>
                        <Text style={styles.roleTitle}>{role.title}</Text>
                        <Text style={styles.period}>{formatPeriod(role.projects ?? [], language)}</Text>
                      </View>
                      <Text style={styles.roleDescription}>{role.description}</Text>
                      <View style={styles.projectsList}>{renderProjectSummary(role.projects)}</View>
                    </View>
                  ))}
                </View>
              ))}
            </View>

            {!!data.educations.length && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {data.educations.map((education, index) => (
                  <View key={`${education.degree}-${index}`} style={styles.educationBlock}>
                    <Text style={styles.educationTitle}>{education.degree}</Text>
                    <Text style={styles.bodyText}>{education.institution}</Text>
                    <Text style={styles.period}>{`${education.from} - ${education.to ?? copy.present}`}</Text>
                    <Text style={styles.bodyText}>{education.description}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.sideColumn}>
            <View style={styles.sideCard}>
              <Text style={styles.sectionTitle}>{copy.skills}</Text>
              {skills.map((skill, index) => (
                <Text
                  key={skill}
                  style={[styles.skillItem, index === skills.length - 1 ? styles.skillItemLast : null]}
                >
                  {skill}
                </Text>
              ))}
            </View>

            {!!data.aboutMe.length && (
              <View style={styles.sideCard}>
                <Text style={styles.sectionTitle}>{copy.about}</Text>
                {data.aboutMe.slice(0, 4).map((line, index) => (
                  <Text key={`${line}-${index}`} style={styles.bodyText}>
                    {'• '} {line}
                  </Text>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
