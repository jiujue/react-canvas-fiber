import { execSync } from 'node:child_process'

const PREFIX = 'deploy-gh-pages-tag-'
const REMOTE = 'origin'

const parseCoreSemver = (v) => {
	const m = String(v).match(/^(\d+)\.(\d+)\.(\d+)/)
	if (!m) return null
	return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) }
}

const compareCore = (a, b) => a.major - b.major || a.minor - b.minor || a.patch - b.patch

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts })
const runText = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim()

const listTags = () => {
	try {
		const out = runText(`git tag --list "${PREFIX}*"`)
		if (!out) return []
		return out
			.split(/\r?\n/)
			.map((t) => t.trim())
			.filter(Boolean)
	} catch {
		return []
	}
}

const computeNextVersion = () => {
	const tags = listTags()
	const cores = tags
		.map((t) => (t.startsWith(PREFIX) ? t.slice(PREFIX.length) : null))
		.filter(Boolean)
		.map(parseCoreSemver)
		.filter(Boolean)
		.sort(compareCore)

	const latest = cores.length ? cores[cores.length - 1] : null

	if (!latest) return '0.0.1'

	// 默认自动增加 patch 版本
	return `${latest.major}.${latest.minor}.${latest.patch + 1}`
}

const tagExists = (tag) => {
	try {
		execSync(`git rev-parse -q --verify refs/tags/${tag}`, { stdio: 'ignore' })
		return true
	} catch {
		return false
	}
}

const main = () => {
	const args = process.argv.slice(2)
	const isDryRun = args.includes('--dry-run')

	console.log(`Fetching tags from ${REMOTE}...`)
	try {
		run(`git fetch --tags ${REMOTE}`)
	} catch {
		console.warn('Warning: Failed to fetch tags, using local tags only.')
	}

	const version = computeNextVersion()
	const tag = `${PREFIX}${version}`

	if (tagExists(tag)) {
		console.error(`Error: Tag already exists: ${tag}`)
		process.exit(1)
	}

	if (isDryRun) {
		console.log(`[Dry Run] Would create and push tag: ${tag}`)
		return
	}

	console.log(`Creating tag: ${tag}`)
	run(`git tag -a ${tag} -m "deploy: ${tag}"`)

	console.log(`Pushing tag to ${REMOTE}...`)
	run(`git push ${REMOTE} ${tag}`)

	console.log(`Successfully created and pushed ${tag}`)
}

try {
	main()
} catch (err) {
	console.error(err?.message ?? String(err))
	process.exit(1)
}
