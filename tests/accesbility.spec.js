const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default; // 1
import { createHtmlReport } from 'axe-html-reporter';
const fs = require('fs');

test.describe('homepage', () => { // 2
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('https://www.target.com/'); // 3

    const accessibilityScanResults = await new AxeBuilder({ page })
    // .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze(); // 4
    // reporter = axePlaywright.Reporter('My Report', './reports')
    // reporter.generate(results)
    const reportHTML = createHtmlReport({
        results: accessibilityScanResults,
        options: {
          projectKey: "homepage"
        },
      });
  
    //   if (!fs.existsSync("build/reports/accessibility-report.html")) {
    //     fs.mkdirSync("build/reports", {
    //       recursive: true,
    //     });
    //   }
    //   fs.writeFileSync("build/reports/accessibility-report.html", reportHTML);
  
    //   expect(accessibilityScanResults.violations).toEqual([]);
  });
});