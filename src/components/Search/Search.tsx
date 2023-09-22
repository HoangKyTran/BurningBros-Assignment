import React, { useState } from "react";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
	IconButton,
	InputAdornment,
	FormControl,
	OutlinedInput,
	Button,
} from "@mui/material";
import { SearchIcon, Times } from "../../icons/Icons";
import useSearchStore from "../../zustand/searchStore";

const MySearch = (): JSX.Element => {
	const [value, setValue] = useState<string>("");
	const { search, setSearch } = useSearchStore();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setValue(event.target.value);
	};

	const handleDelete = (): void => {
		setValue("");
	};

	const handleCancel = (): void => {
		setSearch("");
	};

	const handleSearch = (
		e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
	): void => {
		if (e.key === "Enter") {
			setSearch(value);
		}
	};

	return (
		<Grid2 container gap={2} alignItems="center">
			<Grid2>
				<FormControl
					sx={{
						width: 280,
						backgroundColor: "#F8F8F9",
						"&:hover": { backgroundColor: "#FFFFFF" },
						"&.MuiFilledInput-root.Mui-focused": { backgroundColor: "#FFFFFF" },
					}}
					fullWidth
					variant="standard"
				>
					<OutlinedInput
						id="outlined-adornment-amount"
						sx={{
							borderRadius: 50,
						}}
						value={value}
						placeholder="Search"
						onChange={handleChange}
						onKeyDown={handleSearch}
						startAdornment={
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						}
						endAdornment={
							<InputAdornment position="start">
								{value && (
									<IconButton size="small" onClick={handleDelete}>
										<Times />
									</IconButton>
								)}
							</InputAdornment>
						}
						size="small"
					/>
				</FormControl>
			</Grid2>
			{!!search && (
				<Grid2 xs={2}>
					<Button
						sx={{ color: "black", textTransform: "capitalize", fontSize: 14 }}
						onClick={handleCancel}
					>
						Cancel
					</Button>
				</Grid2>
			)}
		</Grid2>
	);
};

export default MySearch;
