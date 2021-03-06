module.exports = {
  plugins: {
    autoprefixer: {},
    "@njleonzhang/postcss-px-to-rem": {
      unitToConvert: "px",
      widthOfDesignLayout: 1920, // (Number) The width of the viewport.
      unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
      selectorBlackList: [
        ".ignore",
        ".hairlines",
        ".el-form",
        ".el-button",
        ".el-checkbox",
        ".el-message",
        ".com",
        "__bar",
        "pswp"
      ], // (Array) The selectors to ignore and leave as px.
      minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
      mediaQuery: false // (Boolean) Allow px to be converted in media queries.
    }
  }
};
