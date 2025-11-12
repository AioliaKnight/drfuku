import FtpDeploy from 'ftp-deploy';
import path from 'path';
import fs from 'fs';
import archiver from 'archiver';
import { config as loadEnv } from 'dotenv';
import { fileURLToPath } from 'url';

loadEnv(); // 載入 .env 檔案

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ftpDeploy = new FtpDeploy();

// 部署配置
const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT || 21,
  localRoot: path.join(__dirname, 'out'),
  remoteRoot: process.env.FTP_REMOTE_ROOT || '/public_html',
  include: ['*', '**/*'],
  exclude: [
    'dist/**/*.map',
    'node_modules/**',
    'node_modules/**/.*',
    '.git/**',
    '.env*',
    '*.log'
  ],
  deleteRemote: false,
  forcePasv: true,
  sftp: false
};

async function deploy() {
  console.log('🚀 開始部署到 Bluehost...');

  // 檢查環境變數
  if (!config.user || !config.password || !config.host) {
    console.error('❌ 錯誤：請設置必要的 FTP 環境變數');
    console.log('需要在 .env 檔案中設置：');
    console.log('FTP_USER=你的FTP用戶名');
    console.log('FTP_PASSWORD=你的FTP密碼');
    console.log('FTP_HOST=你的FTP主機');
    console.log('FTP_REMOTE_ROOT=/public_html （或你的網站根目錄）');
    process.exit(1);
  }

  // 檢查 out 目錄是否存在
  if (!fs.existsSync('out')) {
    console.error('❌ 錯誤：找不到 out 目錄。請先執行 npm run build');
    process.exit(1);
  }

  const maxRetries = 3;
  let currentTry = 0;

  while (currentTry < maxRetries) {
    try {
      currentTry++;
      console.log(`📁 準備上傳檔案... (嘗試 ${currentTry}/${maxRetries})`);
      console.log(`本地目錄: ${config.localRoot}`);
      console.log(`遠程目錄: ${config.remoteRoot}`);
      console.log(`FTP 主機: ${config.host}`);

      // 為每次嘗試創建新的 FtpDeploy 實例
      const ftpDeploy = new FtpDeploy();

      ftpDeploy.on('uploading', function(data) {
        console.log(`📤 上傳中: ${data.filename} (${data.transferredFileCount}/${data.totalFilesCount})`);
      });

      ftpDeploy.on('uploaded', function(data) {
        console.log(`✅ 已上傳: ${data.filename}`);
      });

      ftpDeploy.on('log', function(data) {
        console.log('📝', data);
      });

      ftpDeploy.on('upload-error', function(data) {
        console.error(`❌ 上傳錯誤: ${data.filename}`, data.err);
      });

      const res = await ftpDeploy.deploy(config);

      console.log('🎉 部署完成！');
      console.log(`✅ 成功上傳 ${res.length} 個檔案`);
      console.log('🌐 您的網站應該在幾分鐘內可以訪問');
      return; // 成功後退出

    } catch (err) {
      console.error(`❌ 部署失敗 (嘗試 ${currentTry}/${maxRetries}):`, err.message);

      if (currentTry < maxRetries) {
        console.log(`⏰ 等待 5 秒後重試...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        console.error('❌ 所有重試都失敗了，部署中止');
        process.exit(1);
      }
    }
  }
}

// 創建備份檔案的函數
async function createBackup() {
  const date = new Date().toISOString().split('T')[0];
  const backupPath = `backup-${date}.zip`;

  console.log('📦 創建備份檔案...');

  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(backupPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    output.on('close', () => {
      console.log(`✅ 備份完成: ${backupPath} (${archive.pointer()} bytes)`);
      resolve(backupPath);
    });

    archive.on('error', (err) => {
      reject(err);
    });

    archive.pipe(output);
    archive.directory('out/', false);
    archive.finalize();
  });
}

// 主執行函數
async function main() {
  console.log('🔧 部署腳本啟動...');
  const args = process.argv.slice(2);
  console.log('📋 命令參數:', args);

  if (args.includes('--backup')) {
    await createBackup();
    return;
  }

  if (args.includes('--help') || args.includes('-h')) {
    console.log('使用方法:');
    console.log('  npm run deploy        - 部署到 Bluehost');
    console.log('  npm run deploy:prod   - 生產環境部署');
    console.log('  node deploy.mjs --backup - 只創建備份檔案');
    console.log('  node deploy.mjs --help   - 顯示幫助');
    return;
  }

  console.log('🚀 開始執行部署...');
  await deploy();
}

// 執行主函數
main().catch(console.error);

export { deploy, createBackup };
