import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

const corePackageJsonPath = path.join(
	repoRoot,
	"packages",
	"react-canvas-fiber",
	"package.json",
);
const coreChangelogPath = path.join(
	repoRoot,
	"packages",
	"react-canvas-fiber",
	"CHANGELOG.md",
);
const releaseNotesPath = path.join(repoRoot, ".release-notes.md");
const rootChangelogPath = path.join(repoRoot, "CHANGELOG.md");

async function readJson(filePath) {
	const text = await fs.readFile(filePath, "utf8");
	return JSON.parse(text);
}

function extractVersionSection(changelogText, version) {
	const lines = changelogText.split(/\r?\n/);
	const heading = `## ${version}`;
	const startIndex = lines.findIndex((line) => line.trim() === heading);
	if (startIndex === -1) return null;

	let endIndex = lines.length;
	for (let i = startIndex + 1; i < lines.length; i += 1) {
		if (lines[i].startsWith("## ")) {
			endIndex = i;
			break;
		}
	}

	const sectionLines = lines.slice(startIndex, endIndex);
	while (sectionLines.length > 0 && sectionLines[sectionLines.length - 1] === "") {
		sectionLines.pop();
	}

	return sectionLines.join("\n");
}

function upsertRootChangelog(rootText, sectionText, version) {
	const hasVersion = new RegExp(`(^|\\n)##\\s+${version.replaceAll(".", "\\.")}(\\s|$)`).test(
		rootText,
	);
	if (hasVersion) return rootText;

	const normalizedRoot = rootText.trim().length === 0 ? "# Changelog\n" : rootText;
	const lines = normalizedRoot.split(/\r?\n/);
	if (!lines[0].startsWith("#")) {
		lines.unshift("# Changelog");
	}

	const insertAt = (() => {
		const firstSection = lines.findIndex((line, idx) => idx > 0 && line.startsWith("## "));
		if (firstSection === -1) return lines.length;
		return firstSection;
	})();

	const sectionLines = sectionText.split(/\r?\n/);
	const before = lines.slice(0, insertAt);
	const after = lines.slice(insertAt);

	const merged = [...before];
	if (merged.length > 0 && merged[merged.length - 1] !== "") merged.push("");
	merged.push(...sectionLines);
	if (merged[merged.length - 1] !== "") merged.push("");
	if (after.length > 0 && after[0] !== "") merged.push("");
	merged.push(...after);

	return merged.join("\n").replace(/\n{4,}/g, "\n\n\n");
}

async function main() {
	const pkg = await readJson(corePackageJsonPath);
	const version = pkg.version;
	if (!version) {
		throw new Error(`Missing version in ${corePackageJsonPath}`);
	}

	const coreChangelog = await fs.readFile(coreChangelogPath, "utf8");
	const section = extractVersionSection(coreChangelog, version);
	if (!section) {
		throw new Error(
			`Cannot find section '## ${version}' in ${path.relative(repoRoot, coreChangelogPath)}`,
		);
	}

	const releaseNotes = `# @jiujue/react-canvas-fiber v${version}\n\n${section}\n`;
	await fs.writeFile(releaseNotesPath, releaseNotes, "utf8");

	let rootChangelog = "";
	try {
		rootChangelog = await fs.readFile(rootChangelogPath, "utf8");
	} catch (e) {
		if (e?.code !== "ENOENT") throw e;
	}

	const updatedRootChangelog = upsertRootChangelog(rootChangelog, section, version);
	await fs.writeFile(rootChangelogPath, updatedRootChangelog, "utf8");

	process.stdout.write(
		`Wrote ${path.relative(repoRoot, releaseNotesPath)} and updated ${path.relative(
			repoRoot,
			rootChangelogPath,
		)} for v${version}\n`,
	);
}

main().catch((err) => {
	process.stderr.write(`${err?.stack || err}\n`);
	process.exit(1);
});
