import { useContext, useState } from 'react';
import { Branch, Category } from '../types/constants';
import { GithubDataContext } from '../context/github-context';

export const useMoveBranchesLogic = () => {
	const { branches } = useContext(GithubDataContext);

	// Mock data for all updated branches
	const [updatedBranches, setUpdatedBranches] = useState<Category[]>([
		{ name: 'In progress', branches: [...branches] },
		{ name: 'Review', branches: [] },
		{ name: 'Ready to Merge', branches: [] },
	]);

	const handleMoveBranch = (branch: any, from: string, to: string) => {
		if (updatedBranches) {
			const fromCategory = updatedBranches.find((category) => category.name === from);
			const toCategory = updatedBranches.find((category) => category.name === to);
			if (fromCategory && toCategory) {
				const newFromCategory = {
					...fromCategory,
					branches: fromCategory && fromCategory.branches.filter((b: any) => b.name !== branch.name),
				};
				const newToCategory = {
					...toCategory,
					branches: [...toCategory.branches, branch],
				};
				const newUpdatedBranches = updatedBranches.map((category) => {
					console.log(category);
					if (category.name === from) return newFromCategory;
					if (category.name === to) return newToCategory;
					return category;
				});
				setUpdatedBranches(newUpdatedBranches);
			} else {
				console.log('Please provider the fromCategory and toCategory');
			}
		} else {
			console.log('Please provide the updatedBranches');
		}

	};


	const moveForward = (branch: Branch) => {
		if (updatedBranches) {
			const fromCategory = updatedBranches.find((category: Category) => category.branches.includes(branch));
			let toCategory: Category
			if (fromCategory) {
				if (fromCategory.name === 'Ready to Merge') return;
				toCategory = updatedBranches[updatedBranches.indexOf(fromCategory) + 1];
				handleMoveBranch(branch, fromCategory.name, toCategory.name);
			}
		}
	};

	const moveBack = (branch: Branch) => {
		if (updatedBranches) {
			const fromCategory = updatedBranches.find((category: Category) => category.branches.includes(branch));
			let toCategory: Category
			if (fromCategory) {
				if (fromCategory.name === 'In progress') return;
				toCategory = updatedBranches[updatedBranches.indexOf(fromCategory) - 1];
				handleMoveBranch(branch, fromCategory.name, toCategory.name);
			} else {
				console.log('Please provider the fromCategory');
			}
		} else {
			console.log('Please provide the updatedBranches');
		}
	};

	return { handleMoveBranch, moveForward, moveBack, updatedBranches }
}
