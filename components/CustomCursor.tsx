/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 350, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference flex items-center justify-center hidden md:flex"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="relative rounded-full bg-[#F4E028] flex items-center justify-center opacity-80"
        style={{ width: 40, height: 40 }}
        animate={{
          scale: isHovering ? 2.5 : 1, 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;