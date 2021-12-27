import { useReducer } from "react";

type AnyObject = Record<string, unknown>;

type StateAction<S> =
  | Partial<Record<keyof S, S[keyof S]>>
  | import("react").ReducerWithoutAction<S>;

export const useRecordState = <T extends AnyObject>(initialState: T) =>
  useReducer((prevState: T, action: StateAction<T>) => {
    if (typeof action === "function") {
      return {
        ...prevState,
        ...action(prevState),
      };
    }

    const hasUpdate = Object.entries(action).some(
      ([key, value]) => prevState[key] !== value
    );

    return hasUpdate ? { ...prevState, ...action } : prevState;
  }, initialState);

/**
 * setState nas classes é feito para objetos
 *
 * state = {name: 'Davi', age: 36}
 * setState = {name: 'Maria'}
 * state = {name: 'Maria'} // perde a propriedade age
 *
 *
 * setState nos hooks é optimizado para primitivos
 *
 * state = {name: 'Davi', age: 36}
 * setState = {name: 'Maria'}
 * state = {name: 'Maria',age: 36} // modifica apenas a propriedade alterada
 */
