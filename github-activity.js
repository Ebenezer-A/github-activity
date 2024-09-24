#!/usr/bin/env node

import chalk from "chalk";

const username = process.argv[2];
if (!username) {
    console.error(chalk.red('Please provide a GitHub username.'));
    process.exit(1);
}

const url = `https://api.github.com/users/${username}/events`;

(async () => {
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'github-activity-cli' }
        });

        if (!res.ok) {
            throw new Error(`Error: ${res.statusText}`);
        }

        const events = await res.json();

        events.slice(0, 10).forEach(event => {
            const { type, repo, payload, created_at } = event;
            const eventTime = new Date(created_at).toLocaleString();

            switch (type) {
                case 'PushEvent':
                    console.log(chalk.green(`[${eventTime}] Pushed ${payload.commits.length} commit(s) to ${repo.name}`));
                    break;
                case 'PullRequestEvent':
                    console.log(chalk.green(`[${eventTime}] ${payload.action} a pull request in ${repo.name}`));
                    break;
                case 'IssuesEvent':
                    console.log(chalk.yellow(`[${eventTime}] ${payload.action} an issue in ${repo.name}`));
                    break;
                case 'ForkEvent':
                    console.log(chalk.magenta(`[${eventTime}] Forked ${repo.name} to ${payload.forkee.full_name}`));
                    break;
                case 'WatchEvent':
                    console.log(chalk.cyan(`[${eventTime}] Starred ${repo.name}`));
                    break;
                case 'CreateEvent':
                    console.log(chalk.blue(`[${eventTime}] Created ${payload.ref_type} in ${repo.name}`));
                    break;
                case 'DeleteEvent':
                    console.log(chalk.red(`[${eventTime}] Deleted ${payload.ref_type} in ${repo.name}`));
                    break;
                case 'ReleaseEvent':
                    console.log(chalk.blue(`[${eventTime}] Released ${payload.release.tag_name} in ${repo.name}`));
                    break;
                case 'PublicEvent':
                    console.log(chalk.green(`[${eventTime}] Made ${repo.name} public`));
                    break;
                case 'PullRequestReviewEvent':
                    console.log(chalk.yellow(`[${eventTime}] Reviewed a pull request in ${repo.name}`));
                    break;
                default:
                    console.log(chalk.gray(`[${eventTime}] ${type.replace('Event', '')} on ${repo.name}`));
            }
        });
    } catch (error) {
        console.error(chalk.red(`Error fetching data: ${error.message}`));
    }
})();
