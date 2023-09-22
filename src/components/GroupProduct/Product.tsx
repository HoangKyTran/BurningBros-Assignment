import React, { forwardRef } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Box, TextField } from "@mui/material";
import { formatPrice } from "../../utils/product";
import useEditProductStore from "../../zustand/editProductStore";

interface ProductProps {
	product: Product;
}

const Product = forwardRef(({ product }: ProductProps, ref): JSX.Element => {
	const { product: zProduct, setProduct } = useEditProductStore();
	const isClicking = zProduct?.id === product.id;

	const handleClickProduct = (e: React.MouseEvent<HTMLDivElement>): void => {
		if (!isClicking) {
			setProduct(product);
		}
	};

	const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		setProduct({
			...product,
			title: e.target.value.trim(),
		});
	};

	const handleOnClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.bubbles = false;
	};

	return (
		<Box
			ref={ref}
			key={`${product.id}-${product.category}${product.title}`}
			sx={{
				marginX: "24px",
				padding: "12px 16px",
				cursor: "pointer",
				border: isClicking ? "1px solid #D1B8FA" : "0px",
				borderRadius: isClicking ? "8px" : "0px",
			}}
			onClick={handleClickProduct}
		>
			<Grid2 container justifyContent="space-between" alignItems="center">
				<Grid2 xs={2}>
					<img
						style={{
							objectFit: "cover",
							height: 72,
							width: 72,
							borderRadius: 8,
						}}
						src={product.thumbnail}
						alt={product.title}
					/>
				</Grid2>
				<Grid2 xs={9.3} container gap={2} direction="column">
					<Grid2>
						{isClicking ? (
							<TextField
								key={`textfield-${product.id}`}
								InputProps={{
									sx: {
										width: "140%",
										height: "32px",
										borderRadius: "8px",
										fontSize: "16px",
										fontWeight: 600,
										marginRight: "2px",
									},
								}}
								autoFocus
								onClick={handleOnClick}
								onChange={handleOnchange}
								defaultValue={product.title}
								size="small"
							/>
						) : (
							<Box
								key={`title-${product.id}`}
								sx={{ fontSize: "16px", fontWeight: 600 }}
							>
								{product.title}
							</Box>
						)}
					</Grid2>
					<Grid2>
						<Box sx={{ fontSize: "14px", fontWeight: 400, color: "#676E7B" }}>
							$ {formatPrice(product.price)}
						</Box>
					</Grid2>
				</Grid2>
			</Grid2>
		</Box>
	);
});

export default Product;
