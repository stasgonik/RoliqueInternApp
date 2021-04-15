const path = require('path');
const fs = require('fs-extra').promises;
const uuid = require('uuid').v1;

async function _uploadFile(file, staticSubfolderName, itemId, itemType) {
    const relativePath = path.join(staticSubfolderName, itemId.toString(), itemType);
    const absolutePath = path.join(process.cwd(), 'core', 'static', relativePath);

    const fileExtension = path.extname(file.name);
    const fileName = uuid() + fileExtension;

    const filePath = path.join(absolutePath, fileName);
    const fullRelativePath = path.join(relativePath, fileName);

    await fs.mkdir(absolutePath, { recursive: true });
    await file.mv(filePath);

    return fullRelativePath;
}

module.exports = {
    uploadFile: (file, staticSubfolderName, itemId, itemType) => _uploadFile(file, staticSubfolderName, itemId, itemType)
};
