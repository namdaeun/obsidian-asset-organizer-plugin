import { Notice, Plugin, TAbstractFile, TFile } from "obsidian";

interface AssetOrganizer {
	folder: string;
}

const DEFAULT_SETTINGS: AssetOrganizer = {
	folder: "images",
};

export default class AssetOrganizerPlugin extends Plugin {
	settings: AssetOrganizer;

	async onload() {
		await this.loadSettings();

		this.registerEvent(
			this.app.vault.on("create", (file) => {
				this.handleFileCreate(file);
			})
		);
	}

	IMAGE_EXTENSIONS = /\.(png|jpg|jpeg|gif|webp)$/i;

	async handleFileCreate(file: TAbstractFile) {
		if (!(file instanceof TFile)) return;

		const isImage = this.IMAGE_EXTENSIONS.test(file.name);
		if (!isImage) return;

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
