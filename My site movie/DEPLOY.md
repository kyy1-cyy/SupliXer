# How to Deploy SupliXer

The easiest way to deploy your Next.js application is to use **Vercel** (the creators of Next.js). It's free for hobby projects and requires zero configuration.

## Prerequisites

1.  **GitHub Account**: You need a GitHub account to host your code.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.

---

## Step 1: Push Your Code to GitHub

If you haven't already, you need to push this project to a GitHub repository.

1.  **Initialize Git** (if not already done):
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```

2.  **Create a New Repository** on GitHub:
    *   Go to [github.com/new](https://github.com/new).
    *   Name it `suplixer` (or whatever you want).
    *   Make it **Public** or **Private**.
    *   Click **Create repository**.

3.  **Push the Code**:
    *   Copy the commands under query **"…or push an existing repository from the command line"**.
    *   Run them in your terminal ( VS Code terminal). It usually looks like this:
        ```bash
        git remote add origin https://github.com/YOUR_USERNAME/suplixer.git
        git branch -M main
        git push -u origin main
        ```

---

## Step 2: Deploy on Vercel

1.  Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  You should see your `suplixer` repository in the list. Click **Import**.
4.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./` (default).
    *   **Environment Variables**: **IMPORTANT!** You must add your API keys here.
        *   Open your local `.env` file.
        *   Copy `TMDB_API_KEY` and paste it into Vercel (Name: `TMDB_API_KEY`, Value: `your_key_here`).
        *   Copy `TMDB_API_READ_ACCESS_TOKEN` and paste it (Name: `TMDB_API_READ_ACCESS_TOKEN`, Value: `your_token_here`).
        *   Click **Add** for each one.

5.  Click **Deploy**.

---

## Step 3: Done!

Vercel will build your site. Once finished (usually 1-2 minutes), you will get a live URL (e.g., `https://suplixer.vercel.app`).

**Note on Updates:**
Whenever you want to update the site, just make changes in VS Code, commit them (`git commit -am "update"`), and push (`git push`). Vercel will automatically detect the change and redeploy the site for you!
