// tslint:disable:non-literal-fs-path
import * as benchmark from "benchmark";
import * as fs from "fs";
import * as path from "path";

const caseSubstring = process.argv.length === 3 ? process.argv[2] : "";
const casesDir = path.join(__dirname, "./cases");
const files = fs.readdirSync(casesDir);
for (const file of files) {
  const testName = file.substring(0, file.indexOf(".js"));
  if (!file.endsWith(".js") || testName.indexOf(caseSubstring) === -1) {
    continue;
  }

  // tslint:disable-next-line:no-var-requires non-literal-require
  const m = require(path.join(__dirname, "./cases", file));
  const bench = new benchmark(file, {
    fn: m.fn,
    setup: m.setup,
  });

  process.stdout.write(`${file}\t`);
  bench.run();
  process.stdout.write(`${(bench.stats.mean * 1e9).toFixed(2)}ns\n`);
}
