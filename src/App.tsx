// import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";
import HomePage from "./pages/HomePage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const queryClient = new QueryClient();

const theme = createTheme({
	palette: {
		primary: {
			main: "#6713EF",
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<HomePage />;
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
