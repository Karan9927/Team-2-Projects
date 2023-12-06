# YouTube TimeStamp Bookmarker

YT Bookmarker is a Chrome extension that enhances the experience of watching YouTube videos by allowing users to create and manage bookmarks with custom notes at specific timestamps in YouTube videos.

## Youtube Bookmarker - without bookmark

![without bookmark](https://github.com/Karan9927/Team-2-Projects/assets/124122714/0b6f5573-bae8-403f-8c90-c6063bc4cceb)

## Youtube Bookmarker - With bookmark

![with bookmark](https://github.com/Karan9927/Team-2-Projects/assets/124122714/a95f136e-e525-4d98-87d8-cf17dd58e47e)

## Youtube Bookmarker - Non youtube page

![Non Youtube Page](https://github.com/Karan9927/Team-2-Projects/assets/124122714/3bc9933e-7207-4b74-86d5-fc5350999a34)


## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Understanding the Code](#understanding-the-code)
- [Resources](#resources)

## Features

1. Create video timestamp bookmarks
2. View saved bookmarks
3. Easy navigation to specific timestamps on that perticular video
4. Delete bookmarks

## Prerequisites

- Google Chrome Browser

## Installation

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) and then clone this repository:

```
git clone https://github.com/<your username>/video-bookmarker.git
```

2. Open Google Chrome.
3. Go to `chrome://extensions/`.
4. Enable "Developer mode" in the top-right corner.
5. Click "Load unpacked extension" and choose the folder where you saved the cloned repository.

The extension should now appear in your Chrome toolbar.

## Usage

1. Open a YouTube video.
2. Click on the YT Bookmarker icon below the video to create a bookmark.
3. Click on the YT Bookmarker icon in your Chrome toolbar to access your saved bookmarks.
4. Navigate to specific timestamps, and delete bookmark.

## Understanding the Code

In this section, the main logic of the extension in the `popup.js` script is explained.

- `addNewBookmark`: Adds a new bookmark element to the list of bookmarks.
- `viewBookmarks`: Displays all saved bookmarks for the current video.
- `onPlay`: Jumps to the timestamp of the clicked bookmark.
- `onDelete`: Deletes the clicked bookmark.

## Resources

- [Chrome Developer Documentation](https://developer.chrome.com/docs/extensions/mv3/)
