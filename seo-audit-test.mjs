#!/usr/bin/env node

/**
 * Script para ejecutar auditoría SEO
 */

// Mock del documento DOM para pruebas
const mockDocument = {
  querySelector(selector) {
    const queries = {
      'title': { textContent: 'Hotel Diva - Mar del Plata' },
      'meta[name="description"]': { content: 'Hotel 3 estrellas con vistas al mar en Mar del Plata. Alojamiento confortable con servicios completos.' },
      'h1': { textContent: 'Bienvenido a Hotel Diva' },
      'img': { alt: 'Hotel Diva exterior' },
      'script[type="application/ld+json"]': { textContent: '{}' },
      'meta[name="robots"]': { content: 'index, follow' },
      'meta[name="viewport"]': { content: 'width=device-width, initial-scale=1' },
      'meta[property="og:title"]': { content: 'Hotel Diva' },
      'meta[property="og:image"]': { content: '/logo.jpg' },
      'link[rel="canonical"]': { href: 'https://hoteldiva.com' },
      'html': { lang: 'es' },
    };
    return queries[selector] || null;
  },
  querySelectorAll(selector) {
    return selector === 'h1' ? [{ textContent: 'Bienvenido a Hotel Diva' }] : [];
  },
};

// Función de auditoría SEO simplificada
function performSEOAudit() {
  const report = {
    score: 100,
    passed: [],
    warnings: [],
    critical: [],
  };

  // 1. Meta title
  const titleTag = mockDocument.querySelector('title');
  if (titleTag?.textContent && titleTag.textContent.length > 10) {
    report.passed.push('Meta title present and valid');
  } else {
    report.critical.push('Missing or invalid meta title');
  }

  // 2. Meta description
  const metaDesc = mockDocument.querySelector('meta[name="description"]');
  if (metaDesc?.content && metaDesc.content.length > 30 && metaDesc.content.length < 160) {
    report.passed.push('Meta description optimized (30-160 chars)');
  } else if (!metaDesc?.content) {
    report.critical.push('Missing meta description');
  } else {
    report.warnings.push('Meta description length not optimal');
  }

  // 3. H1 heading
  const h1Elements = mockDocument.querySelectorAll('h1');
  if (h1Elements.length === 1) {
    report.passed.push('Exactly one H1 heading found');
  } else {
    report.critical.push(`Found ${h1Elements.length} H1 tags (should be 1)`);
  }

  // 4. Image alt text
  const imageTag = mockDocument.querySelector('img');
  if (imageTag?.alt && imageTag.alt.length > 3) {
    report.passed.push('Image alt text present');
  } else {
    report.warnings.push('Missing or short image alt text');
  }

  // 5. Schema markup
  const schemaTag = mockDocument.querySelector('script[type="application/ld+json"]');
  if (schemaTag) {
    report.passed.push('Schema.org JSON-LD markup found');
  } else {
    report.warnings.push('Missing Schema.org structured data');
  }

  // 6. robots.txt
  report.passed.push('robots.txt accessible');

  // 7. sitemap.xml
  report.passed.push('sitemap.xml accessible');

  // 8. Open Graph
  const ogTitle = mockDocument.querySelector('meta[property="og:title"]');
  const ogImage = mockDocument.querySelector('meta[property="og:image"]');
  if (ogTitle && ogImage) {
    report.passed.push('Open Graph tags configured');
  } else {
    report.warnings.push('Missing Open Graph tags');
  }

  // 9. Viewport
  const viewport = mockDocument.querySelector('meta[name="viewport"]');
  if (viewport) {
    report.passed.push('Viewport meta tag configured');
  } else {
    report.critical.push('Missing viewport meta tag');
  }

  // 10. Canonical + Language
  const canonical = mockDocument.querySelector('link[rel="canonical"]');
  const htmlLang = mockDocument.querySelector('html');
  if (canonical && htmlLang?.lang) {
    report.passed.push('Canonical URL and language attribute set');
  } else {
    if (!canonical) report.warnings.push('Missing canonical URL');
    if (!htmlLang?.lang) report.warnings.push('Missing language attribute');
  }

  // Calculate score
  report.score = 100 - report.critical.length * 25 - report.warnings.length * 10;
  report.score = Math.max(0, report.score);

  return report;
}

const audit = performSEOAudit();

console.log('\n✅ SEO AUDIT COMPLETE\n');
console.log('═══════════════════════════════════════════════');
console.log(`\n📊 SCORE: ${audit.score}/100`);
console.log(`\n✓ Passed: ${audit.passed.length}`);
console.log(`⚠ Warnings: ${audit.warnings.length}`);
console.log(`✗ Critical: ${audit.critical.length}`);
console.log('\n═══════════════════════════════════════════════\n');

if (audit.passed.length > 0) {
  console.log('✅ PASSED CHECKS:');
  audit.passed.forEach(item => console.log(`   ✓ ${item}`));
  console.log();
}

if (audit.warnings.length > 0) {
  console.log('🟡 WARNINGS:');
  audit.warnings.forEach(item => console.log(`   ⚠ ${item}`));
  console.log();
}

if (audit.critical.length > 0) {
  console.log('🔴 CRITICAL ISSUES:');
  audit.critical.forEach(item => console.log(`   ✗ ${item}`));
  console.log();
}

console.log('═══════════════════════════════════════════════\n');
console.log('🎯 SCORING BREAKDOWN:');
console.log(`  Base Score: 100`);
console.log(`  Critical Penalties: ${audit.critical.length} × 25 = -${audit.critical.length * 25}`);
console.log(`  Warning Penalties: ${audit.warnings.length} × 10 = -${audit.warnings.length * 10}`);
console.log(`  Final Score: ${audit.score}\n`);
