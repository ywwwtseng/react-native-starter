import { useEffect, useRef } from 'react';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // 保存最新的回調函式
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (typeof delay !== 'number' || !delay) return;

    let timeoutId;

    // 每次調用 callback 後重新設定 setTimeout
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
      timeoutId = setTimeout(tick, delay);
    };

    // 初次執行
    timeoutId = setTimeout(tick, delay);

    // 清理 timeout
    return () => clearTimeout(timeoutId);
  }, [delay]);
}

export { useInterval };
