import { create } from "zustand";
interface State {
    currentSong: MusicTrack | null;
    isPlaying: boolean;
}
interface Action {
    setCurrentSong: (currentSong: State["currentSong"]) => void;
    setIsPlaying: (currentSong: State["isPlaying"]) => void;
}
export const useStore = create<State & Action>((set) => ({
    currentSong: null,
    setCurrentSong: (song: MusicTrack | null) => set(() => ({ currentSong: song })),
    isPlaying: false,
    setIsPlaying: (isPlaying: boolean) => set(() => ({ isPlaying })),
}));
