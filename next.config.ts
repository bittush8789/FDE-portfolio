import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { webpack }) {
    // @splinetool/runtime references a handful of optional Draco / boolean-op
    // wasm helpers via `new URL(..., import.meta.url)` that aren't published
    // in this version of the package. They're only needed for scenes that use
    // Draco-compressed meshes or boolean geometry ops; ignoring them here lets
    // the bundle build instead of failing on a module that doesn't exist.
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /libs\/draco\/|boolean_wasm_bg\.wasm$/,
      })
    );
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
