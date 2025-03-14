import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const animation = {
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hidden: { opacity: 0, y: 50 }
  };

  return { ref, animation, inView };
};
