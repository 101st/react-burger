import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch, AppThunk } from '../services/store';

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// @ts-ignore
export const useAppDispatch = () => useDispatch<AppThunk | AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;