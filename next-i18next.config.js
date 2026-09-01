// next-i18next configuration
// https://github.com/i18next/next-i18next
const path = require("path");

/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "en",
  },
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
