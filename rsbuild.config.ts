import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSass } from '@rsbuild/plugin-sass';


export default defineConfig({
  plugins: [
    pluginReact(), 
    pluginSass()
  ],
  server: {
    port: 3400,
  },
  html: {
    tags: [
      {
        tag: "link",
        attrs: {
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
          rel: "stylesheet",
        },
      },
    ],
  },
});
