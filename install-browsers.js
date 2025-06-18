import { install } from 'playwright/install';

install({
  browsers: ['chromium'],
  cacheDir: '.playwright-cache'
});