export const DashBoardPaperAnimation = {
  hidden: {
      opacity: 0,
      x: -30,
      transition: {
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
    exit: { opacity: 0 },
}

export const FormAnimation = {
  hidden: {
    opacity: 0,
    x: -50,
    transition: {
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: { opacity: 0 },
}