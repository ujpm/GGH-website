import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FundingCall, FundingFilters, FundingType, FundingStatus } from '../types/grants';

interface FundingState {
  calls: FundingCall[];
  filters: FundingFilters;
  loading: boolean;
  error: string | null;
}

type FundingAction =
  | { type: 'SET_CALLS'; payload: FundingCall[] }
  | { type: 'ADD_CALL'; payload: FundingCall }
  | { type: 'UPDATE_CALL'; payload: FundingCall }
  | { type: 'DELETE_CALL'; payload: string }
  | { type: 'SET_FILTERS'; payload: FundingFilters }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const initialState: FundingState = {
  calls: [],
  filters: {},
  loading: false,
  error: null,
};

const FundingContext = createContext<{
  state: FundingState;
  dispatch: React.Dispatch<FundingAction>;
} | null>(null);

function fundingReducer(state: FundingState, action: FundingAction): FundingState {
  switch (action.type) {
    case 'SET_CALLS':
      return { ...state, calls: action.payload };
    case 'ADD_CALL':
      return { ...state, calls: [...state.calls, action.payload] };
    case 'UPDATE_CALL':
      return {
        ...state,
        calls: state.calls.map(call =>
          call.id === action.payload.id ? action.payload : call
        ),
      };
    case 'DELETE_CALL':
      return {
        ...state,
        calls: state.calls.filter(call => call.id !== action.payload),
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function FundingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(fundingReducer, initialState);

  // Auto-update funding status based on deadlines
  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const updatedCalls = state.calls.map(call => {
        const deadline = new Date(call.deadline);
        const daysUntilDeadline = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        
        let status: FundingStatus = call.status;
        if (daysUntilDeadline <= 0) {
          status = 'closed';
        } else if (daysUntilDeadline <= 7) {
          status = 'closing_soon';
        } else {
          status = 'open';
        }

        if (status !== call.status) {
          return { ...call, status };
        }
        return call;
      });

      if (JSON.stringify(updatedCalls) !== JSON.stringify(state.calls)) {
        dispatch({ type: 'SET_CALLS', payload: updatedCalls });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval);
  }, [state.calls]);

  return (
    <FundingContext.Provider value={{ state, dispatch }}>
      {children}
    </FundingContext.Provider>
  );
}

export function useFunding() {
  const context = useContext(FundingContext);
  if (!context) {
    throw new Error('useFunding must be used within a FundingProvider');
  }
  return context;
}
