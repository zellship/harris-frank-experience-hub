const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ??
  "harris-frank-experience-hub";
const basePath = isGitHubPages ? `/${repositoryName}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isGitHubPages ? { output: "export" } : {}),
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: {
    tsconfigPath: isGitHubPages
      ? "./tsconfig.pages.json"
      : "./tsconfig.json",
  },
};

export default nextConfig;
