"use client";

import { motion } from "framer-motion";

interface ClientWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function ClientWrapper({ children, className }: ClientWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}
