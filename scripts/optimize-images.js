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
        if (!fs.existsSync(fullDir)) continue;

        const files = fs.readdirSync(fullDir);
        for (const file of files) {
            if (file.match(/\.(png|jpg|jpeg)$/i)) {
                const inputPath = path.join(fullDir, file);
                const fileName = path.parse(file).name;
                const outputPath = path.join(fullDir, `${fileName}.webp`);

                console.log(`Optimizing: ${file}...`);

                try {
                    await sharp(inputPath)
                        .webp({ quality: 80 })
                        .toFile(outputPath);

                    const statsOld = fs.statSync(inputPath);
                    const statsNew = fs.statSync(outputPath);

                    console.log(`✅ ${file}: ${(statsOld.size / 1024).toFixed(1)}KB -> ${(statsNew.size / 1024).toFixed(1)}KB`);

                    // After conversion, we should update the code to use .webp
                    // and eventually delete the old ones or just keep them as fallbacks.
                    // For now, let's just convert.
                } catch (err) {
                    console.error(`❌ Failed to optimize ${file}:`, err);
                }
            }
        }
    }
}

optimize();
