import React, { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, Collapse, Typography } from "@mui/material";
import { ArrowDown, ArrowRight } from "../../icons/Icons";
import Product from "./Product";
import { parseCategoryName } from "../../utils/product";
import useProductStore from "../../zustand/editProductStore";
import { useClickAway } from "../../hooks/useClickAway";
import { useQueryClient } from "react-query";
import useSearchStore from "../../zustand/searchStore";

type groupedProduct = {
	[id: string]: Product[];
};

interface Props {
	groupedProduct: groupedProduct;
}

const ProductList = ({ groupedProduct }: Props): JSX.Element => {
	const [categoryCollapse, setCategoryCollapse] = useState<string | null>(null);
	const queryClient = useQueryClient();
	const { search } = useSearchStore();
	const { product, setProduct } = useProductStore();
	const productRef = useClickAway(() => {
		queryClient.setQueryData(
			["products", { search }],
			(data?: GetProductsApiResponse): GetProductsApiResponse => {
				const products: Product[] | undefined = data?.products?.map((prd) => {
					if (prd.id === product?.id) {
						return product;
					}
					return prd;
				});
				const result: GetProductsApiResponse = {
					products: products || [],
					total: data?.total || 0,
					skip: data?.skip || 0,
					limit: data?.limit || 0,
				};
				return result;
			},
		);
		setProduct(null);
	});

	const handleOpenCategory =
		(cat: string) => (e: React.MouseEvent<HTMLDivElement>) => {
			if (cat === categoryCollapse) {
				setCategoryCollapse(null);
			} else {
				setCategoryCollapse(cat);
			}
			setProduct(null);
		};

	if (!Object.keys(groupedProduct).length) {
		return <Box>Empty data</Box>;
	}

	return (
		<Box
			sx={{
				height: 720,
				width: "100%",
				overflowY: "scroll",
				"&::-webkit-scrollbar": {
					width: 4,
					borderRadius: 4,
				},
				"&::-webkit-scrollbar-track": {
					backgroundColor: "#F8F8F9",
				},
				"&::-webkit-scrollbar-thumb": {
					borderRadius: 4,
					backgroundColor: "#D9E0E8",
				},
			}}
		>
			{Object.entries(groupedProduct).map(([key, value]) => {
				return (
					<Grid2 key={`container-${key}`} gap={1} container direction="column">
						<Grid2
							style={{
								borderRadius: 8,
								padding: "12px 16px",
								backgroundColor: categoryCollapse === key ? "#F2F4F6" : "#fff",
								cursor: "pointer",
							}}
							sx={{
								"&:hover": {
									backgroundColor: "#F8F8F9 !important",
								},
							}}
							container
							gap={1}
							onClick={handleOpenCategory(key)}
						>
							<Grid2>
								{categoryCollapse === key ? <ArrowDown /> : <ArrowRight />}
							</Grid2>
							<Grid2>
								<Typography sx={{ fontSize: 18, fontWeight: 600 }}>
									{parseCategoryName(key)}
								</Typography>
							</Grid2>
						</Grid2>
						<Grid2 container direction="column">
							{value.map((item) => (
								<Grid2 key={item.id}>
									<Collapse in={categoryCollapse === item.category}>
										<Product ref={productRef} product={item} />
									</Collapse>
								</Grid2>
							))}
						</Grid2>
					</Grid2>
				);
			})}
		</Box>
	);
};

export default ProductList;
