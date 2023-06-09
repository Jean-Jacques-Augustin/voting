import multer, { FileFilterCallback } from 'multer';
import { Express, Request } from 'express';
import fs from 'fs';

export const fileStorage = multer.diskStorage({
	destination: (request: Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void): void => {
		const destinationFolder = 'public/images';

		fs.access(destinationFolder, error => {
			if (error) {
				// Le dossier de destination n'existe pas, le créer
				fs.mkdir(destinationFolder, { recursive: true }, error => {
					if (error) {
						callback(error, '');
					} else {
						callback(null, destinationFolder);
					}
				});
			} else {
				callback(null, destinationFolder);
			}
		});
	},

	filename: (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void): void => {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
		callback(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
	},
});

export const fileFilter = (request: Request, file: Express.Multer.File, callback: FileFilterCallback): void => {
	if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
		callback(null, true);
	} else {
		callback(null, false);
	}
};
