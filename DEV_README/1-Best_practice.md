# Best Practices

Here are the practices we will follow, to avoid chaos. Some of this is opinionated, so please let me know if you'd like to change things up.

## Git Usage

### 1. Commits

1. **ALWAYS** have informative and professional commit message.
   ```
   Good:
       - Added textbox to gui
       - Fixed issue with server timing out
   Bad:
       - fahefoauewhfavnevnekrjn
       - bruh
       - idk what;s going on LOL
   ```
2. **NEVER** commit code that crashes - each committed node should be working.
3. In general, commit once you made a meaningful step towards completing a feature.

### 2. Branching & Pull Request

Never push code directly to `main` (there are ruleset protecting it, but you shouldn't do so regardless). Even if you're changing a comment, a minor patch, or a quick bug fix, always branch out and throw a pull request.

1. When branching, name the branch based on its feature and separate words with hiphen `-`. For example, `algo-impl`.
2. A pull request are required to be reviewed by a teammate before merging. Add reviewers on the top right of github gui.
3. Send the pr link to the discord `pull-requests` channel. Changes that will affect other branches should be mentioned in the group chat.
4. In general, one branch = one feature. However, if a feature is too large which makes reviewing changes not feasible, the team should discuss to break up the feature into smaller chunks.
5. Once a branch is pulled in to main, it should be deleted. (Unless it is a demo branch or major version branch).

### Merging and Rebasing

It is a good practice to merge the latest changes from `main` into your branch before submitting a pull request. This ensures your changes are built on top of the most up-to-date code, reducing the chances of conflicts during the final merge. There are two main techniques for integrating changes: **merging** and **rebasing**.

#### Rebasing (Recommended)

Rebasing applies your commits on top of the latest `main` branch as if they were developed from the newest version. This creates a **linear commit history**, making it easier to track changes and understand the project's progression. If you don't understand what rebasing do, read this [article](https://git-scm.com/docs/git-rebase).

**Steps to rebase:**

```sh
git checkout your-branch
git fetch origin
git rebase origin/main
```

If there are conflicts, Git will pause and prompt you to resolve them. Once resolved, continue with:

```sh
git add <resolved-files>
git rebase --continue
```

If you want to cancel the rebase at any point, run:

```sh
git rebase --abort
```

After a successful rebase, force-push your changes to update your branch:

```sh
git push --force
```

When **NOT** to use rebase:

- If your branch is already shared with others—rewriting history can cause issues.
- When the commit history is deeply intertwined, making rebase complex.

If you find youself with the 2 cases above, use `git merge` instead.

## Folder, File, and Variable Naming

Follow them for consistency.

### Folder

In general, snake_case is used.

**Exceptions**

- Frontend component folder. A component folder contains its `.tsx` file, `.scss` file, and possibly local files specifically for a component. The convention is to name the folder exactly the same as the `.tsx` file.

### File

**Frontend (gui/)**
Components & Features (Global state slices) - UpperCamelCase `NavBar.tsx`
Other files - lowerCamelCase `utils.ts`

**Backend (server/)**
Class (OOP style code) - UpperCamelCase `MusicSheet.py`
Other files - lowerCamelCase `main.py`

**playground**
This folder is meant for experimentation and proof of concept. You don't have to worry about convention and style as long as the code achieves its goal.

### Variables

The frontend uses mainly camelCase to follow the javaScript convention, whereas the backend uses snake_case for Python convention. This choice is made to have a sense of separation in frontend and backend.
