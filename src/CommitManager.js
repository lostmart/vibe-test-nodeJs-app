const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

class CommitManager {
	constructor(config) {
		this.config = config.commits
	}

	async smartCommit(mode = "auto") {
		const changes = this.getStagedChanges()
		const diff = this.getDiff()

		if (changes.length === 0) {
			console.log("No changes to commit")
			return
		}

		if (this.config.autoAdd && changes.length === 0) {
			this.addChanges()
		}

		const commitMessage = this.generateCommitMessage(diff, mode)

		if (this.config.requireTests) {
			this.validateTests()
		}

		this.createCommit(commitMessage)

		if (this.config.autoPush) {
			this.pushChanges()
		}

		console.log(`✅ Commit created: ${commitMessage}`)
	}

	getStagedChanges() {
		try {
			const result = execSync("git diff --cached --name-only", {
				encoding: "utf8",
			})
			return result
				.trim()
				.split("\n")
				.filter((file) => file.length > 0)
		} catch (error) {
			return []
		}
	}

	getDiff() {
		try {
			const result = execSync("git diff --cached --stat", { encoding: "utf8" })
			return result
		} catch (error) {
			return ""
		}
	}

	addChanges() {
		try {
			execSync("git add .", { encoding: "utf8" })
			console.log("Added all changes to staging")
		} catch (error) {
			throw new Error("Failed to add changes: " + error.message)
		}
	}

	generateCommitMessage(diff, mode) {
		if (!this.config.conventionalCommits) {
			return mode === "auto" ? this.autoGenerateMessage(diff) : mode
		}

		return this.generateConventionalCommit(diff, mode)
	}

	autoGenerateMessage(diff) {
		const files = this.getStagedChanges()
		const fileTypes = files.map((file) => path.extname(file))
		const mainType = this.getMostCommonType(fileTypes)

		const changes = this.analyzeChanges(diff)
		return `${mainType}: ${changes}`
	}

	generateConventionalCommit(diff, mode) {
		const type = this.detectCommitType(diff)
		const scope = this.detectScope()
		const description = mode === "auto" ? this.generateDescription(diff) : mode
		const body = this.generateBody(diff)

		let message = `${type}`
		if (scope) message += `(${scope})`
		message += `: ${description}`
		if (body) message += `\n\n${body}`

		if (message.length > this.config.maxCommitMessageLength) {
			const bodyStart = message.indexOf("\n\n")
			if (bodyStart > -1) {
				const header = message.substring(0, bodyStart)
				const body = message.substring(bodyStart + 2)
				return header.length <= this.config.maxCommitMessageLength
					? message
					: `${header.substring(0, this.config.maxCommitMessageLength - 3)}...`
			}
			return (
				message.substring(0, this.config.maxCommitMessageLength - 3) + "..."
			)
		}

		return message
	}

	detectCommitType(diff) {
		const content = diff.toLowerCase()

		if (content.includes("breaking") || content.includes("major")) return "feat"
		if (content.includes("fix") || content.includes("bug")) return "fix"
		if (content.includes("test")) return "test"
		if (content.includes("doc")) return "docs"
		if (content.includes("style") || content.includes("format")) return "style"
		if (content.includes("refactor")) return "refactor"
		if (content.includes("perf")) return "perf"
		if (content.includes("build") || content.includes("deps")) return "build"
		if (content.includes("ci") || content.includes("github")) return "ci"

		return "feat"
	}

	detectScope() {
		const files = this.getStagedChanges()
		const dirs = files.map((file) => path.dirname(file).split("/")[0])
		const mostCommon = this.getMostCommonType(dirs)
		return mostCommon && mostCommon !== "." ? mostCommon : null
	}

	generateDescription(diff) {
		const lines = diff.split("\n").filter((line) => line.includes("|"))
		if (lines.length === 0) return "Update files"

		const changes = lines
			.map((line) => {
				const parts = line.split("|")
				if (parts.length >= 3) {
					const file = parts[0].trim()
					const insertions = parseInt(parts[1]) || 0
					const deletions = parseInt(parts[2]) || 0

					if (insertions > 0 && deletions > 0)
						return `update ${path.basename(file)}`
					if (insertions > 0) return `add ${path.basename(file)}`
					if (deletions > 0) return `remove ${path.basename(file)}`
				}
				return null
			})
			.filter(Boolean)

		return changes.length > 0 ? changes[0] : "Update files"
	}

	generateBody(diff) {
		const files = this.getStagedChanges()
		if (files.length > 1) {
			return `Files changed: ${files.join(", ")}`
		}
		return null
	}

	analyzeChanges(diff) {
		const lines = diff.split("\n").filter((line) => line.includes("|"))
		let totalChanges = 0
		let insertions = 0
		let deletions = 0

		lines.forEach((line) => {
			const parts = line.split("|")
			if (parts.length >= 3) {
				const insert = parseInt(parts[1]) || 0
				const deletion = parseInt(parts[2]) || 0
				insertions += insert
				deletions += deletion
				totalChanges += insert + deletion
			}
		})

		return `${totalChanges} changes`
	}

	getMostCommonType(arr) {
		const counts = {}
		arr.forEach((item) => {
			counts[item] = (counts[item] || 0) + 1
		})

		const keys = Object.keys(counts)
		if (keys.length === 0) return null

		return keys.reduce((a, b) => (counts[a] > counts[b] ? a : b))
	}

	validateTests() {
		try {
			execSync("npm test", { encoding: "utf8", stdio: "pipe" })
		} catch (error) {
			throw new Error("Tests failed. Commit aborted.")
		}
	}

	createCommit(message) {
		try {
			execSync(`git commit -m "${message}"`, { encoding: "utf8" })
		} catch (error) {
			throw new Error("Failed to create commit: " + error.message)
		}
	}

	pushChanges() {
		try {
			execSync("git push", { encoding: "utf8" })
			console.log("Changes pushed to remote")
		} catch (error) {
			console.warn("Failed to push changes: " + error.message)
		}
	}
}

module.exports = CommitManager
