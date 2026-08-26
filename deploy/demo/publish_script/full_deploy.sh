#!/bin/bash
set -euo pipefail

PUBLISH_SCRIPT="/home/demo/tobacco/publish_script/publish.sh"
SOURCE_DIR="/home/demo/sourcecode/tobacco"
BUILD_DIR="${SOURCE_DIR}/tobacco"
DEPLOY_DIR="/usr/share/nginx/html/tobacco"
BACKUP_DIR="/usr/share/nginx/html/backups"
LOG_FILE="/home/demo/tobacco/publish_script/deploy_$(date +%Y%m%d).log"
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_TARGET="${BACKUP_DIR}/tobacco_demo_${TIMESTAMP}"

log() {
  local level="$1"
  local message="$2"
  echo "[$(date +'%Y-%m-%d %H:%M:%S')] [${level}] ${message}" | tee -a "${LOG_FILE}"
}

log "INFO" "开始执行演示环境前端自动部署流程..."
log "INFO" "部署版本备份名：tobacco_demo_${TIMESTAMP}"

[ -f "${PUBLISH_SCRIPT}" ] || { log "ERROR" "拉取脚本不存在：${PUBLISH_SCRIPT}"; exit 1; }
[ -d "${SOURCE_DIR}" ] || { log "ERROR" "源码目录不存在：${SOURCE_DIR}"; exit 1; }
mkdir -p "${DEPLOY_DIR}" "${BACKUP_DIR}"

if ! command -v npm >/dev/null 2>&1; then
  log "ERROR" "未找到 npm，请先安装 Node.js"
  exit 1
fi

log "INFO" "开始拉取 release 分支最新代码..."
cd "${SOURCE_DIR}"
bash "${PUBLISH_SCRIPT}"
log "INFO" "代码拉取完成"

log "INFO" "开始安装依赖..."
npm install --legacy-peer-deps 2>&1 | tee -a "${LOG_FILE}"

log "INFO" "开始执行 npm run build..."
npm run build 2>&1 | tee -a "${LOG_FILE}"

if [ ! -d "${BUILD_DIR}" ] || [ -z "$(ls -A "${BUILD_DIR}")" ]; then
  log "ERROR" "打包失败，打包目录 ${BUILD_DIR} 不存在或为空"
  exit 1
fi
log "INFO" "前端打包完成，打包目录：${BUILD_DIR}"

if [ -n "$(ls -A "${DEPLOY_DIR}" 2>/dev/null)" ]; then
  rsync -a --delete "${DEPLOY_DIR}/" "${BACKUP_TARGET}/" 2>&1 | tee -a "${LOG_FILE}"
  log "INFO" "旧版本备份完成，备份路径：${BACKUP_TARGET}"
else
  log "WARN" "部署目录为空，跳过备份"
fi

rm -rf "${DEPLOY_DIR:?}/"*
cp -rf "${BUILD_DIR}/"* "${DEPLOY_DIR}/"
chmod -R 755 "${DEPLOY_DIR}"

cd "${BACKUP_DIR}"
backup_count=$(find . -maxdepth 1 -type d -name "tobacco_demo_*" | wc -l)
if [ "${backup_count}" -gt 10 ]; then
  find . -maxdepth 1 -type d -name "tobacco_demo_*" | sort | head -n $((backup_count - 10)) | xargs -r rm -rf
fi

log "INFO" "演示环境新版本部署完成！"
log "INFO" "部署目录：${DEPLOY_DIR}"
log "INFO" "备份目录：${BACKUP_TARGET}"
log "INFO" "部署日志：${LOG_FILE}"
