// type Subscriber<T> = (value: T) => void;

// class WritableStore<T> {
//   private value: T;
//   private subscribers: Subscriber<T>[] = [];

//   constructor(initialValue: T) {
//     this.value = initialValue;
//   }

//   subscribe(callback: Subscriber<T>) {
//     this.subscribers.push(callback);
//     callback(this.value); // immediately send current value

//     return () => {
//       this.subscribers = this.subscribers.filter((sub) => sub !== callback);
//     };
//   }

//   set(newValue: T) {
//     this.value = newValue;
//     this.subscribers.forEach((sub) => sub(this.value));
//   }

//   update(fn: (value: T) => T) {
//     this.set(fn(this.value));
//   }
// }

// // ✅ same as Svelte writable("en")
// export const currentLang = new WritableStore<string>("en");
