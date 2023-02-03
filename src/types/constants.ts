import { PaletteMode } from "@mui/material";

export type ThemeColors = {
	type: PaletteMode;
	background: {
		default: string;
	},
	primary: {
		main: string;
	},
	secondary: {
		main: string;
	},
	text: {
		primary: string;
		secondary: string;
		error: string;
	}
}

export type Typography = {
	fontFamily: string;
	h1: {
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
		letterSpacing: string;
	},
	h3: {
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
		letterSpacing: string;
	},
	h4: {
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
		letterSpacing: string;
	},
	h5: {
		fontSize: string;
		fontWeight: number;
		lineHeight: number;
		letterSpacing: string;
	}
}

export const typography: Typography = {
	fontFamily: 'Inter, sans-serif',
	h1: {
		fontSize: '48px',
		fontWeight: 600,
		lineHeight: 1.2,
		letterSpacing: '-0.05em',
	},
	h3: {
		fontSize: '16px',
		fontWeight: 400,
		lineHeight: 1.4,
		letterSpacing: '-0.0125em',
	},
	h4: {
		fontSize: '12px',
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: '-0.0125em',
	},
	h5: {
		fontSize: '12px',
		fontWeight: 400,
		lineHeight: 1.5,
		letterSpacing: '-0.0125em',
	}
}

export const darkPalette: ThemeColors = {
	type: "dark",
	background: {
		default: "#151515",
	},
	primary: {
		main: "#222222"
	},
	secondary: {
		main: "#383838"
	},
	text: {
		primary: "#F2F2F2",
		secondary: "#B0B0B0",
		error: "#E75B4F"
	}
}

export const lightPallety: ThemeColors = {
	type: "dark",
	background: {
		default: "#FFFFFF",
	},
	primary: {
		main: "#EEEEEE"
	},
	secondary: {
		main: "#D1D1D1"
	},
	text: {
		primary: "#151515",
		secondary: "#515151",
		error: "#D62617"
	}
}

export type MoveProps = {
	updatedBranches: any;
	setUpdatedBranches: (branches: Branch[]) => void;
}

export type Category = {
	name: 'In progress' | 'Review' | 'Ready to Merge';
	branches: Branch[];
}

export type Branch = {
	name: string;
	commit: {
		sha: string;
		url: string;
	};
	protected: boolean;
}

export const branchModel: Category[] = [
	{ name: "In progress", branches:[] },
	{ name: "Review", branches: [] },
	{ name: "Ready to Merge", branches: [] }
]