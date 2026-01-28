# GitHub Agent

A comprehensive automation tool for GitHub repository management, including smart commits, comment management, and versioning automation.

## Features

### 🚀 Smart Commits
- Automatic conventional commit message generation
- Git staging and commit automation
- Test validation before commits
- Auto-push functionality

### 💬 Comment Management
- Automated replies to issues and pull requests
- Template-based comment responses
- Comment creation, deletion, and listing
- Keyword-based response routing

### 📋 Version Management
- Semantic versioning support
- Calendar-based versioning
- Automatic tag creation
- Release generation with changelogs
- GitHub releases creation

## Installation

```bash
npm install
```

## Configuration

Set up environment variables in your `.env` file:

```env
GITHUB_TOKEN=your_github_token
GITHUB_USER=your_github_username
GITHUB_REPO=your_repository_name
SLACK_WEBHOOK_URL=your_slack_webhook_url (optional)
DISCORD_WEBHOOK_URL=your_discord_webhook_url (optional)
NOTIFICATION_EMAIL=your_notification_email (optional)
```

## Usage

### Command Line Interface

```bash
# Smart commits
npm run commit
node github-agent.js commit

# Version management
npm run version-bump
npm run release
node github-agent.js version bump

# Comment management
node github-agent.js comment auto-reply
node github-agent.js comment list issue#123

# Repository status
node github-agent.js status

# Workflow presets
node github-agent.js commit        # Standard workflow
node github-agent.js release       # Full release workflow
node github-agent.js maintenance   # Maintenance tasks
```

### Global Installation

```bash
npm install -g .
github-agent commit
github-agent version bump
github-agent status
```

## Configuration Options

The agent behavior can be customized in `config/agentConfig.js`:

- **Commit Settings**: Auto-add, conventional commits, test requirements
- **Comment Templates**: Custom response templates for different issue types
- **Versioning Strategy**: Semantic, calendar, or custom versioning
- **Notifications**: Slack, Discord, email integration

## Examples

### Automated Workflow

```bash
# Add changes and create smart commit
git add .
npm run commit

# Bump version and create release
npm run release

# Auto-reply to recent issues
node github-agent.js comment auto-reply
```

### Custom Configuration

```javascript
// Update commit settings
agent.configure('commits.autoPush', true);
agent.configure('commits.requireTests', true);

// Update versioning strategy
agent.configure('versioning.strategy', 'calendar');

// Add custom comment template
agent.configure('comments.templates.custom', 'Custom response message');
```

## API Reference

### GitHubAgent Class

Main agent controller that orchestrates all functionality.

```javascript
const GitHubAgent = require('./src/GitHubAgent');
const agent = new GitHubAgent(config);

await agent.smartCommit('auto');
await agent.manageComments('auto-reply');
await agent.manageVersion('bump');
await agent.getStatus();
```

### Individual Managers

#### CommitManager
- `smartCommit(mode)` - Create commits with smart message generation
- `getStagedChanges()` - Get list of staged files
- `generateCommitMessage(diff, mode)` - Generate conventional commit messages

#### CommentManager
- `manageComments(action, target)` - Handle comment operations
- `setupAutoReply()` - Configure automated responses
- `createComment(target, message)` - Create new comments

#### VersionManager
- `manageVersion(action)` - Handle version operations
- `bumpVersion()` - Increment version based on commits
- `createRelease()` - Create GitHub release
- `generateChangelog()` - Generate changelog content

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes with conventional commit messages
4. Push to the branch
5. Create a pull request

## License

ISC