import { Notice, Plugin, TAbstractFile, TFile } from "obsidian";

interface AssetOrganizer {
	folder: string;
}

const DEFAULT_SETTINGS: AssetOrganizer = {
	folder: "_images",
};

export default class AssetOrganizerPlugin extends Plugin {
	settings: AssetOrganizer;

	async onload() {
		await this.loadSettings();

		this.organizeExistingAssets();

		this.registerEvent(
			this.app.vault.on("create", (file) => {
				this.handleFileCreate(file);
			})
		);
	}

	isImage(file: TFile) {
		const IMAGE_EXTENSIONS = /\.(png|jpg|jpeg|gif|webp)$/i;
		return IMAGE_EXTENSIONS.test(file.name);
	}

	async organizeExistingAssets() {
		const files = this.app.vault.getFiles();

		for (const file of files) {
			if (!this.isImage(file)) continue;

			await this.moveFileToAssetsFolder(file);
		}
		new Notice("Existing assets organized");
	}

	async handleFileCreate(file: TAbstractFile) {
		if (!(file instanceof TFile)) return;

		if (!this.isImage(file)) return;

		await this.moveFileToAssetsFolder(file);
	}

	async moveFileToAssetsFolder(file: TFile) {
		const assetsFolder = this.settings.folder;
		if (!assetsFolder) return;

		await this.app.vault.createFolder(assetsFolder).catch(() => {});

		const newPath = `${assetsFolder}/${file.name}`;

		await this.app.fileManager.renameFile(file, newPath);
		new Notice(`Image moved to ${newPath}`);
	}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
