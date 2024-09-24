# GitHub Activity CLI

A simple command-line tool to fetch and display the recent activity of a GitHub user. It provides a summary of the latest events, including pushes, pull requests, issues, and more, with timestamp and color-coded output for better readability.

## Features

- Fetches the latest events for a specified GitHub user.
- Displays up to 10 recent events.
- Supports multiple event types including:
  - Pushes
  - Pull requests
  - Issues
  - Forks
  - Stars (Watches)
  - Releases
  - And more!
- Outputs event timestamps in a readable format.
- Color-coded terminal output for easy distinction of event types.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 12 or later)
- A GitHub account to access user activity.

## Installation

1. Clone the repository or download the source code:

   ```bash
   git clone https://github.com/yourusername/github-activity-cli.git
   cd github-activity-cli
   npm install
   node index.js <username>