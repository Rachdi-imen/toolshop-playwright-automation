import * as allure from 'allure-js-commons';

export async function addAllureMeta(options: {
  epic?: string;
  feature?: string;
  story?: string;
  severity?: 'blocker' | 'critical' | 'normal' | 'minor' | 'trivial';
  tags?: string[];
}) {
  if (options.epic) await allure.epic(options.epic);
  if (options.feature) await allure.feature(options.feature);
  if (options.story) await allure.story(options.story);
  if (options.severity) await allure.severity(options.severity);
  if (options.tags) {
    for (const tag of options.tags) {
      await allure.tag(tag);
    }
  }
}