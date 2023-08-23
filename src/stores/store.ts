import { create } from "zustand";

import { Action, State } from "./type";

const initialValues = {
    currentSong: null,
    isPlaying: false,
    songs: [],
    isDialogOpen: false,
    songDetails: null,
};

export const useStore = create<State & Action>((set) => ({
    ...initialValues,
    setCurrentSong: (song: MusicTrack | null) => set(() => ({ currentSong: song })),
    setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
    setSongs: (newSongs: MusicTrack[]) => set(() => ({ songs: newSongs })),
    setIsDialogOpen: (isDialogOpen: boolean) => set(() => ({ isDialogOpen })),
    setSongDetails: (song: MusicTrack | null) => set(() => ({ songDetails: song })),
    reset: () => {
        set(initialValues);
    },
}));
