const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directories = [
    'public/images/hero',
    'public/images/products'
];

async function optimize() {
    for (const dir of directories) {
        const fullDir = path.join(__dirname, '..', dir);
        if (!fs.existsSync(fullDir)) {
            console.log(`Directory not found: ${fullDir}`);
            continue;
        }

        const files = fs.readdirSync(fullDir);
        for (const file of files) {
            // Only process original images
            if (file.match(/\.(png|jpg|jpeg)$/i)) {
                const inputPath = path.join(fullDir, file);
                const fileName = path.parse(file).name;
                const outputPath = path.join(fullDir, `${fileName}.webp`);

                console.log(`Optimizing: ${file}...`);

                try {
                    await sharp(inputPath)
                        .webp({ quality: 75, lossless: false, effort: 6 })
                        .toFile(outputPath);

                    const statsOld = fs.statSync(inputPath);
                    const statsNew = fs.statSync(outputPath);

                    console.log(`✅ ${file} SUCCESS: ${(statsOld.size / 1024).toFixed(1)}KB -> ${(statsNew.size / 1024).toFixed(1)}KB`);
                } catch (err) {
                    console.error(`❌ Failed to optimize ${file}:`, err);
                }
            }
        }
    }
}

optimize();
