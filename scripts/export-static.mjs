import { spawnSync } from 'node:child_process';

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const env = { ...process.env };

const build = spawnSync(npm, ['run', 'build'], {
  stdio: 'inherit',
  env,
  shell: process.platform === 'win32',
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status ?? 1);

const exportSite = spawnSync(process.execPath, ['scripts/export-wwwroot.mjs'], {
  stdio: 'inherit',
  env,
});
if (exportSite.error) throw exportSite.error;
process.exit(exportSite.status ?? 1);
