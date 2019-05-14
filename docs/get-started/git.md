---
id: gitguide
title: How to use Git
sidebar_label: Git Guide
---

**Git** is the most widely used modern version control system in the world today. Git is a mature, actively maintained open source project originally developed in 2005 by Linus Torvalds, the famous creator of the Linux operating system kernel.

## Usage

### Cloning a project

To clone a project use this command:

    git clone <git-repository>

It will download all the resources from provided repository.

### Pushing an update

To push your update to the repository so that your teammate can pull it. Use this command:

Add the files that you want to push.

    git add <path of the file> - to add specific file 

    or

    git add . - to add all modified files

Commit the added files.

    git commit -m "Your comment here"

Push the update

    git push origin <branch_name>

### Pulling an update

Before you can pull updates, you have to commit first all your modified files. To pull updates to your local computer, use this command:

    git pull origin <branch_name>

> __*Warning:*__ A conflict may occur when merging the update to your codes, just ask your team whether to accept the current change or the incoming change.

It is also advisable to push after you pull an update so that your teammate can also pull your update. For more details about git, visit this [link](https://www.atlassian.com/git/tutorials/atlassian-git-cheatsheet)
