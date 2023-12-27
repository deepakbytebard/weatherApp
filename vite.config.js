import { defineConfig } from 'vite';
import path from "path";
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
        "@app": path.resolve(__dirname, "./src/App"),
        "@presentational":path.resolve(__dirname, "./src/Presentational"),
        "@container":path.resolve(__dirname, "./src/Container"),
        "@weatherAssets":path.resolve(__dirname, "./src/assets/WeatherAssets"),
    }

}
})
