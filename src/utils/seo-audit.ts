/**
 * SEO Audit Utilities
 * Validación de mejores prácticas de SEO
 */

export interface SEOAuditResult {
  category: string;
  passed: boolean;
  message: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface SEOAuditReport {
  timestamp: string;
  score: number;
  results: SEOAuditResult[];
  summary: {
    critical: number;
    warnings: number;
    passed: number;
  };
}

/**
 * Auditoría completa de SEO
 */
export function performSEOAudit(): SEOAuditReport {
  const results: SEOAuditResult[] = [];
  const timestamp = new Date().toISOString();

  // 1. Meta tags
  const titleTag = document.querySelector('title');
  results.push({
    category: 'Meta Tags - Title',
    passed: !!titleTag && titleTag.textContent!.length > 0,
    message: titleTag ? `Title: "${titleTag.textContent}"` : 'No title tag found',
    severity: !titleTag ? 'critical' : 'info',
  });

  const metaDescription = document.querySelector('meta[name="description"]');
  results.push({
    category: 'Meta Tags - Description',
    passed: !!metaDescription && metaDescription.getAttribute('content')!.length > 0,
    message: metaDescription ? `Description: "${metaDescription.getAttribute('content')}"` : 'No meta description',
    severity: !metaDescription ? 'critical' : 'info',
  });

  // 2. Heading hierarchy
  const h1s = document.querySelectorAll('h1');
  results.push({
    category: 'Heading Hierarchy - H1',
    passed: h1s.length === 1,
    message: h1s.length === 1 ? 'Perfect: Exactly one H1' : `Found ${h1s.length} H1 tags (should be 1)`,
    severity: h1s.length !== 1 ? 'warning' : 'info',
  });

  // 3. Images with alt text
  const images = document.querySelectorAll('img');
  let imagesWithAlt = 0;
  images.forEach(img => {
    if (img.getAttribute('alt') || img.getAttribute('aria-hidden')) {
      imagesWithAlt++;
    }
  });
  results.push({
    category: 'Accessibility - Image Alt Text',
    passed: imagesWithAlt === images.length,
    message: `${imagesWithAlt}/${images.length} images have alt text or are hidden`,
    severity: imagesWithAlt < images.length ? 'warning' : 'info',
  });

  // 4. Schema markup
  const schemaOrg = document.querySelector('script[type="application/ld+json"]');
  results.push({
    category: 'Structured Data - Schema.org',
    passed: !!schemaOrg,
    message: schemaOrg ? 'Schema.org JSON-LD found' : 'No Schema.org markup detected',
    severity: !schemaOrg ? 'warning' : 'info',
  });

  // 5. Robots.txt
  fetch('/robots.txt')
    .then(r => r.ok)
    .catch(() => false)
    .then(exists => {
      results.push({
        category: 'Robots.txt',
        passed: exists,
        message: exists ? 'robots.txt is accessible' : 'robots.txt not found',
        severity: !exists ? 'warning' : 'info',
      });
    });

  // 6. Sitemap.xml
  fetch('/sitemap.xml')
    .then(r => r.ok)
    .catch(() => false)
    .then(exists => {
      results.push({
        category: 'Sitemap.xml',
        passed: exists,
        message: exists ? 'sitemap.xml is accessible' : 'sitemap.xml not found',
        severity: !exists ? 'warning' : 'info',
      });
    });

  // 7. Open Graph tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  results.push({
    category: 'Social Media - Open Graph',
    passed: !!ogTitle && !!ogImage,
    message: `OG Title: ${ogTitle ? 'yes' : 'no'}, OG Image: ${ogImage ? 'yes' : 'no'}`,
    severity: (!ogTitle || !ogImage) ? 'warning' : 'info',
  });

  // 8. Mobile viewport
  const viewport = document.querySelector('meta[name="viewport"]');
  results.push({
    category: 'Mobile - Viewport',
    passed: !!viewport,
    message: viewport ? 'Viewport meta tag present' : 'No viewport tag',
    severity: !viewport ? 'critical' : 'info',
  });

  // 9. Canonical URL
  const canonical = document.querySelector('link[rel="canonical"]');
  results.push({
    category: 'Canonical URL',
    passed: !!canonical,
    message: canonical ? `Canonical: ${canonical.getAttribute('href')}` : 'No canonical URL',
    severity: !canonical ? 'warning' : 'info',
  });

  // 10. Language attribute
  const htmlLang = document.documentElement.getAttribute('lang');
  results.push({
    category: 'Internationalization - Lang Attribute',
    passed: !!htmlLang,
    message: htmlLang ? `Language: ${htmlLang}` : 'No language specified',
    severity: !htmlLang ? 'warning' : 'info',
  });

  // Calculate score
  const critical = results.filter(r => r.severity === 'critical' && !r.passed).length;
  const warnings = results.filter(r => r.severity === 'warning' && !r.passed).length;
  const passed = results.filter(r => r.passed).length;

  const score = Math.max(0, 100 - (critical * 25) - (warnings * 10));

  return {
    timestamp,
    score: Math.round(score),
    results,
    summary: {
      critical,
      warnings,
      passed,
    },
  };
}

/**
 * Log SEO Audit Report
 */
export function logSEOAuditReport() {
  const report = performSEOAudit();
  console.group('📋 SEO Audit Report');
  console.log(`Score: ${report.score}/100`);
  console.log(`⏰ ${new Date(report.timestamp).toLocaleString()}`);
  console.table(report.summary);
  console.table(
    report.results.map(r => ({
      Category: r.category,
      Status: r.passed ? '✅' : r.severity === 'critical' ? '❌' : '⚠️',
      Message: r.message,
    }))
  );
  console.groupEnd();
  
  return report;
}
