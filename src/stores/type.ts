export interface State {
    currentSong: MusicTrack | null;
    isPlaying: boolean;
    songs: MusicTrack[];
    isDialogOpen: boolean;
    songDetails: MusicTrack | null;
}

export interface Action {
    setCurrentSong: (currentSong: State["currentSong"]) => void;
    setIsPlaying: (currentSong: State["isPlaying"]) => void;
    setSongs: (currentSong: State["songs"]) => void;
    setIsDialogOpen: (currentSong: State["isDialogOpen"]) => void;
    setSongDetails: (currentSong: State["songDetails"]) => void;
    reset: () => void;
}
