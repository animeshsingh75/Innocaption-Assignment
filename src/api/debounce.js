export function debounce(func, wait, immediate) {
  let timeout;

  const debouncedFunction = function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) func.apply(this, args);
  };

  debouncedFunction.cancel = function cancel() {
    clearTimeout(timeout);
  };

  return debouncedFunction;
}
