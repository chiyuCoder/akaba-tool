export function delay(delayTime: number = 16): Promise<void> {
    return new Promise((resolve) => {
       setTimeout(() => {
           resolve();
       }, delayTime);
    });
}

export {
  debounce,
} from "./debounce";
