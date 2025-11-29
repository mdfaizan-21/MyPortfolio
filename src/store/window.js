import { create } from 'zustand';
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "#constants/index.js";

const useWindowStore = create((set, get) => ({
    windows: (() => {
        // Create a deep copy of WINDOW_CONFIG to avoid direct mutation
        const config = {};
        Object.keys(WINDOW_CONFIG).forEach(key => {
            config[key] = { ...WINDOW_CONFIG[key] };
        });
        return config;
    })(),
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
        set((state) => ({
            windows: {
                ...state.windows,
                [windowKey]: {
                    ...state.windows[windowKey],
                    isOpen: true,
                    zIndex: state.nextZIndex,
                    data: data ?? state.windows[windowKey].data
                }
            },
            nextZIndex: state.nextZIndex + 1
        })),

    closeWindow: (windowKey) =>
        set((state) => ({
            windows: {
                ...state.windows,
                [windowKey]: {
                    ...state.windows[windowKey],
                    isOpen: false,
                    zIndex: INITIAL_Z_INDEX,
                    data: null
                }
            }
        })),

    focusWindow: (windowKey) =>
        set((state) => ({
            windows: {
                ...state.windows,
                [windowKey]: {
                    ...state.windows[windowKey],
                    zIndex: state.nextZIndex
                }
            },
            nextZIndex: state.nextZIndex + 1
        }))
}));

export default useWindowStore;