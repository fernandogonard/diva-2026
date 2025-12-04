/**
 * Script de prueba para auditoría SEO
 * Ejecutar: ts-node test-seo-audit.ts
 */

import { performSEOAudit, logSEOAuditReport } from './src/utils/seo-audit';

// Ejecutar auditoría SEO
const auditResult = performSEOAudit();

// Log del resultado
console.log('\n✅ SEO AUDIT COMPLETE\n');
logSEOAuditReport(auditResult);

// Exportar métricas
console.log('\n📊 METRICS SUMMARY:');
console.log(`Score: ${auditResult.score}/100`);
console.log(`Critical Issues: ${auditResult.critical.length}`);
console.log(`Warnings: ${auditResult.warnings.length}`);
console.log(`Passed Checks: ${auditResult.passed.length}/10`);

// Detalles de puntuación
console.log('\n🎯 SCORING BREAKDOWN:');
console.log(`Base Score: 100`);
console.log(`Critical Penalties: ${auditResult.critical.length} × 25 = ${auditResult.critical.length * 25}`);
console.log(`Warnings Penalties: ${auditResult.warnings.length} × 10 = ${auditResult.warnings.length * 10}`);
console.log(`Final Score: ${auditResult.score}`);

// Recomendaciones
if (auditResult.critical.length > 0) {
  console.log('\n🔴 CRITICAL ISSUES (Fix immediately):');
  auditResult.critical.forEach((issue) => {
    console.log(`  - ${issue}`);
  });
}

if (auditResult.warnings.length > 0) {
  console.log('\n🟡 WARNINGS (Should improve):');
  auditResult.warnings.forEach((warning) => {
    console.log(`  - ${warning}`);
  });
}

console.log('\n✅ PASSED CHECKS:');
auditResult.passed.forEach((check) => {
  console.log(`  ✓ ${check}`);
});
