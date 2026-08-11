import { domAnimation } from "framer-motion";

/**
 * Loaded lazily by <MotionProvider>. Keeps the ~20kb animation feature bundle
 * out of the initial JS payload — it is fetched after hydration.
 */
export default domAnimation;
