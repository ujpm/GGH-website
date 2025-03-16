import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { FundingCall, FundingFilters, FundingResponse } from '../types/grants';
import { getFundingCalls } from '../services/fundingService';
import { toast } from 'react-toastify';

interface FundingState {
  calls: FundingCall[];
  filters: FundingFilters;
  loading: boolean;
  error: string | null;
  pagination?: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

type FundingAction =
  | { type: 'SET_FUNDING_DATA'; payload: { calls: FundingCall[]; pagination?: FundingState['pagination'] } }
  | { type: 'ADD_CALL'; payload: FundingCall }
  | { type: 'UPDATE_CALL'; payload: FundingCall }
  | { type: 'DELETE_CALL'; payload: string }
  | { type: 'SET_FILTERS'; payload: FundingFilters }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: FundingState = {
  calls: [],
  filters: {},
  loading: true,
  error: null,
};

const FundingContext = createContext<{
  state: FundingState;
  dispatch: React.Dispatch<FundingAction>;
  refetchCalls: () => Promise<void>;
} | null>(null);

function fundingReducer(state: FundingState, action: FundingAction): FundingState {
  switch (action.type) {
    case 'SET_FUNDING_DATA':
      return { 
        ...state, 
        calls: action.payload.calls,
        pagination: action.payload.pagination,
        error: null 
      };
    case 'ADD_CALL':
      return { ...state, calls: [...state.calls, action.payload], error: null };
    case 'UPDATE_CALL':
      return {
        ...state,
        calls: state.calls.map(call =>
          call._id === action.payload._id ? action.payload : call
        ),
        error: null,
      };
    case 'DELETE_CALL':
      return {
        ...state,
        calls: state.calls.filter(call => call._id !== action.payload),
        error: null,
      };
    case 'SET_FILTERS':
      return { ...state, filters: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}

export function FundingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(fundingReducer, initialState);

  const fetchFundingCalls = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const response = await getFundingCalls(state.filters);
      
      // Extract calls and pagination from response
      const { calls = [], pagination } = response as FundingResponse;
      
      // Validate each funding call has required fields
      const validCalls = calls.filter((call: FundingCall) => {
        if (!call?._id || !call?.title || !call?.organization || !call?.fundingInfo?.amount) {
          console.warn('Invalid funding call data:', call);
          return false;
        }
        return true;
      });

      dispatch({ 
        type: 'SET_FUNDING_DATA', 
        payload: { 
          calls: validCalls,
          pagination 
        } 
      });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Failed to fetch funding calls';
      console.error('Failed to fetch funding calls:', error);
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast.error(errorMessage);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Fetch initial funding calls
  useEffect(() => {
    fetchFundingCalls();
  }, []);

  // Auto-update funding status based on deadlines
  useEffect(() => {
    const updateStatus = () => {
      if (state.loading || state.error) return;

      const now = new Date();
      const updatedCalls = state.calls.map(call => {
        const deadline = new Date(call.deadline);
        if (deadline <= now && call.status !== 'closed') {
          return { ...call, status: 'closed' as const };
        }
        return call;
      });

      if (JSON.stringify(updatedCalls) !== JSON.stringify(state.calls)) {
        dispatch({ 
          type: 'SET_FUNDING_DATA', 
          payload: { 
            calls: updatedCalls,
            pagination: state.pagination 
          } 
        });
      }
    };

    updateStatus();
    const interval = setInterval(updateStatus, 1000 * 60 * 60); // Update every hour
    return () => clearInterval(interval);
  }, [state.calls, state.loading, state.error]);

  // Filter calls based on current filters
  const filteredCalls = state.calls.filter(call => {
    if (!call) return false;
    
    const { type, status, featured } = state.filters;
    
    const typeMatches = !type || call.type === type;
    const statusMatches = !status || call.status === status;
    const featuredMatches = featured === undefined || call.featured === featured;
    
    return typeMatches && statusMatches && featuredMatches;
  });

  return (
    <FundingContext.Provider value={{ 
      state: { ...state, calls: filteredCalls },
      dispatch,
      refetchCalls: fetchFundingCalls
    }}>
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
