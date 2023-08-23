import { create } from "zustand";
interface State {
    currentSong: MusicTrack | null;
    isPlaying: boolean;
    songs: MusicTrack[];
}
interface Action {
    setCurrentSong: (currentSong: State["currentSong"]) => void;
    setIsPlaying: (currentSong: State["isPlaying"]) => void;
    setSongs: (currentSong: State["songs"]) => void;
}

export const useStore = create<State & Action>((set) => ({
    currentSong: null,
    setCurrentSong: (song: MusicTrack | null) => set(() => ({ currentSong: song })),
    isPlaying: false,
    setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
    songs: [],
    setSongs: (newSongs: MusicTrack[]) => set(() => ({ songs: newSongs })),
}));
