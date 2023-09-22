export function generateGroupedProduct(productList: Product[]) {
	const groupedProduct: { [id: string]: Product[] } = {};

	productList.forEach((prd) => {
		const category = prd.category;
		if (!groupedProduct[category]) {
			groupedProduct[category] = [prd];
		} else {
			groupedProduct[category].push(prd);
		}
	});

	const groupCounts = Object.values(groupedProduct).map((prd) => prd.length);
	const groups = Object.keys(groupedProduct);

	return { groupCounts, groups, productList, groupedProduct };
}

export const parseCategoryName = (name: string) => {
	const [firstName, ...rest] = name;

	return firstName.toUpperCase() + rest.join("");
};

export const formatPrice = (price: number): string => {
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
