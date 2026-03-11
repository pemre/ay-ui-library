import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
    stories: ["../src/blocks/**/*.stories.tsx", "../src/blocks/**/*.mdx"],
    addons: ["@storybook/addon-essentials"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    typescript: {
        reactDocgen: "react-docgen-typescript",
    },
};

export default config;
