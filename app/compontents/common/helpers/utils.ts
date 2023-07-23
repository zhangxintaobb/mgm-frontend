/* eslint-disable @typescript-eslint/no-explicit-any */
export function classNames(...args: any[]) {
  const classes = [];
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg) {
      if (typeof arg === "string") {
        classes.push(arg);
      } else if (typeof arg === "object") {
        const keys = Object.keys(arg);
        for (let j = 0; j < keys.length; j += 1) {
          const key = keys[j];
          if (arg[key]) {
            classes.push(arg[key]);
          }
        }
      }
    }
  }
  return classes.join(" ");
}

export default {};
