import { create } from "zustand";

interface searchStore {
	search: string;
	setSearch: (search: string) => void;
}

const useSearchStore = create<searchStore>((set) => ({
	search: "",
	setSearch: (search) =>
		set((state) => ({
			...state,
			search,
		})),
}));

export default useSearchStore;
