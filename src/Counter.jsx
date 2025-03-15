import { useEffect, useState } from "react";

/**
 * AnimatedCounter - A component that animates counting from 0 to a target number
 * 
 * @param {number} end - The final number to count to
 * @param {number} duration - Duration of the animation in milliseconds (default: 2000)
 * @param {number} decimals - Number of decimal places to show (default: 0)
 * @param {string} suffix - Text to append after the number (default: "")
 * @returns {JSX.Element} - The rendered counter
 */
const AnimatedCounter = ({ end, duration = 2000, decimals = 0, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Start from 0 when component mounts or end changes
    setCount(0);
    
    // Calculate increment per frame for smooth animation
    const totalFrames = duration / 16; // ~60fps
    const increment = end / totalFrames;
    
    let currentCount = 0;
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      
      // Use an easing function for smoother animation
      const progress = frame / totalFrames;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      
      currentCount = easedProgress * end;
      
      // Update count
      setCount(currentCount);
      
      // Stop when we reach the end
      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(counter);
      }
    }, 16); // ~60fps
    
    return () => clearInterval(counter);
  }, [end, duration]);
  
  // Format the number based on decimals
  const formattedCount = decimals > 0 
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString();
    
  return <>{formattedCount}{suffix}</>;
};

export default AnimatedCounter;