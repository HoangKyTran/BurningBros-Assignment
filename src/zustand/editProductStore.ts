import { create } from "zustand";

interface EditProductStore {
	product: Product | null;
	setProduct: (productID: Product | null) => void;
}

const useEditProductStore = create<EditProductStore>((set) => ({
	product: null,
	setProduct: (product) =>
		set((state) => ({
			...state,
			product,
		})),
}));

export default useEditProductStore;
