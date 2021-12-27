import {
  DependencyList,
  EffectCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

type Destructor = ReturnType<EffectCallback>;

type UseAsyncEffectHook = {
  (
    effect: () => Promise<void>,
    destructor?: Destructor,
    deps?: DependencyList
  ): void;
  (effect: () => Promise<void>, deps?: DependencyList): void;
};

export const useAsyncEffect: UseAsyncEffectHook = (
  effect: () => Promise<void>,
  destructor?: Destructor | DependencyList,
  deps?: DependencyList
) => {
  const wilDestroy = typeof destructor === "function";

  const dependencyList = wilDestroy ? deps : (destructor as DependencyList);

  const handler = useRef(effect);

  useLayoutEffect(() => {
    handler.current = effect;
  });

  useEffect(() => {
    handler.current();

    return () => {
      if (wilDestroy) {
        destructor();
      }
    };
  }, [dependencyList]);
};
