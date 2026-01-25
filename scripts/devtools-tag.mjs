import { execSync } from 'node:child_process'

const DEFAULT_PREFIX = 'devtools-extension-v'
const DEFAULT_REMOTE = 'origin'

const isSemver = (s) => /^\d+\.\d+\.\d+([.-][0-9A-Za-z.-]+)?$/.test(String(s))

const parseCoreSemver = (v) => {
	const m = String(v).match(/^(\d+)\.(\d+)\.(\d+)/)
	if (!m) return null
	return { major: Number(m[1]), minor: Number(m[2]), patch: Number(m[3]) }
}

const compareCore = (a, b) => (a.major - b.major) || (a.minor - b.minor) || (a.patch - b.patch)

const run = (cmd, opts = {}) => execSync(cmd, { stdio: 'inherit', ...opts })
const runText = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim()

const parseArgs = (argv) => {
	const args = [...argv]
	const flags = {
		prefix: DEFAULT_PREFIX,
		remote: DEFAULT_REMOTE,
		fetch: true,
		push: true,
		dryRun: false,
		inc: null,
		version: null,
	}

	const takeValue = (i) => {
		const v = args[i + 1]
		if (v == null) throw new Error(`Missing value for ${args[i]}`)
		args.splice(i, 2)
		return v
	}

	for (let i = 0; i < args.length; i++) {
		const a = args[i]
		if (a === '--help' || a === '-h') {
			flags.help = true
			args.splice(i, 1)
			i--
			continue
		}
		if (a === '--dry-run') {
			flags.dryRun = true
			args.splice(i, 1)
			i--
			continue
		}
		if (a === '--no-fetch') {
			flags.fetch = false
			args.splice(i, 1)
			i--
			continue
		}
		if (a === '--fetch') {
			flags.fetch = true
			args.splice(i, 1)
			i--
			continue
		}
		if (a === '--no-push') {
			flags.push = false
			args.splice(i, 1)
			i--
			continue
		}
		if (a === '--push') {
			flags.push = true
			args.splice(i, 1)
			i--
			continue
		}
		if (a === '--prefix') {
			flags.prefix = takeValue(i)
			i--
			continue
		}
		if (a === '--remote') {
			flags.remote = takeValue(i)
			i--
			continue
		}
		if (a === '--inc') {
			flags.inc = takeValue(i)
			i--
			continue
		}
		if (a === '--version') {
			flags.version = takeValue(i)
			i--
			continue
		}
	}

	if (args.length === 1 && !flags.inc && !flags.version) {
		const single = args[0]
		if (single === 'major' || single === 'minor' || single === 'patch') flags.inc = single
		else if (isSemver(single)) flags.version = single
		else throw new Error(`Unknown argument: ${single}`)
	}

	if (args.length > 0) {
		throw new Error(`Too many arguments: ${args.join(' ')}`)
	}

	return flags
}

const usage = () => {
	const cmd = 'pnpm devtools:tag'
	return [
		'Create and push a release tag for devtools extension (triggers GitHub Actions).',
		'',
		`Usage:`,
		`  ${cmd}`,
		`  ${cmd} -- minor`,
		`  ${cmd} -- major`,
		`  ${cmd} -- 0.0.8`,
		'',
		'Options:',
		'  --dry-run         Print next tag without creating/pushing',
		'  --no-fetch        Skip git fetch --tags',
		'  --no-push         Skip git push (create tag only)',
		'  --remote <name>   Git remote to push to (default: origin)',
		'  --prefix <text>   Tag prefix (default: devtools-extension-v)',
	].join('\n')
}

const listTags = (prefix) => {
	try {
		const out = runText(`git tag --list "${prefix}*"`)
		if (!out) return []
		return out
			.split(/\r?\n/)
			.map((t) => t.trim())
			.filter(Boolean)
	} catch {
		return []
	}
}

const computeNextVersion = (prefix, inc) => {
	const tags = listTags(prefix)
	const cores = tags
		.map((t) => (t.startsWith(prefix) ? t.slice(prefix.length) : null))
		.filter(Boolean)
		.map(parseCoreSemver)
		.filter(Boolean)
		.sort(compareCore)

	const latest = cores.length ? cores[cores.length - 1] : null

	if (!latest) {
		if (inc === 'major') return '1.0.0'
		if (inc === 'minor') return '0.1.0'
		return '0.0.1'
	}

	if (inc === 'major') return `${latest.major + 1}.0.0`
	if (inc === 'minor') return `${latest.major}.${latest.minor + 1}.0`
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
	const flags = parseArgs(process.argv.slice(2))

	if (flags.help) {
		console.log(usage())
		return
	}

	if (flags.fetch) {
		run(`git fetch --tags ${flags.remote}`, { stdio: 'inherit' })
	}

	const inc = flags.inc ?? 'patch'
	const version = flags.version ?? computeNextVersion(flags.prefix, inc)

	if (!isSemver(version)) throw new Error(`Invalid version: ${version}`)

	const tag = `${flags.prefix}${version}`

	if (tagExists(tag)) throw new Error(`Tag already exists: ${tag}`)

	if (flags.dryRun) {
		console.log(tag)
		return
	}

	run(`git tag -a ${tag} -m "release: ${tag}"`)

	if (flags.push) {
		run(`git push ${flags.remote} ${tag}`)
	}

	console.log(tag)
}

try {
	main()
} catch (err) {
	console.error(err?.message ?? String(err))
	process.exit(1)
}
