import { createContext, useContext } from 'react';

export type Plan = 'paid' | 'free';
export const PlanContext = createContext<Plan>('paid');
export const usePlan = () => useContext(PlanContext);
