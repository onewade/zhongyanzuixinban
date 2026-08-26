#!/bin/bash
set -euo pipefail  # 严格模式：报错即退出，未定义变量报错，管道错误传递

##############################################################################
# 配置参数（根据实际环境调整）
##############################################################################
# 脚本相关路径
PUBLISH_SCRIPT="/home/sunhuijun/tobacco/publish_script/publish.sh"  # 已有的拉取脚本路径
SOURCE_DIR="/home/sunhuijun/sourcecode/tobacco"                     # 源码目录
BUILD_DIR="${SOURCE_DIR}/tobacco"                             # 前端打包输出目录（根据项目实际调整，如build/dist）
DEPLOY_DIR="/usr/share/nginx/html/tobacco"                 # 部署目录
BACKUP_DIR="/usr/share/nginx/html/backups"                 # 备份存放根目录
LOG_FILE="/home/sunhuijun/tobacco/publish_script/deploy_$(date +%Y%m%d).log"  # 日志文件

# 时间戳（备份文件名用）
TIMESTAMP=$(date +%Y%m%d%H%M%S)
BACKUP_TARGET="${BACKUP_DIR}/tobacco_${TIMESTAMP}"         # 备份文件路径

##############################################################################
# 工具函数：日志输出
##############################################################################
log() {
    local level="$1"
    local message="$2"
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] [${level}] ${message}" | tee -a "${LOG_FILE}"
}

##############################################################################
# 1. 前置校验（确保依赖和目录存在）
##############################################################################
log "INFO" "开始执行前端项目自动部署流程..."
log "INFO" "部署版本备份名：tobacco_${TIMESTAMP}"

# 校验拉取脚本存在
if [ ! -f "${PUBLISH_SCRIPT}" ]; then
    log "ERROR" "拉取脚本不存在：${PUBLISH_SCRIPT}"
    exit 1
fi

# 校验源码目录存在
if [ ! -d "${SOURCE_DIR}" ]; then
    log "ERROR" "源码目录不存在：${SOURCE_DIR}"
    exit 1
fi

# 校验部署目录存在
if [ ! -d "${DEPLOY_DIR}" ]; then
    log "WARN" "部署目录不存在，自动创建：${DEPLOY_DIR}"
    mkdir -p "${DEPLOY_DIR}" || { log "ERROR" "创建部署目录失败"; exit 1; }
fi

# 校验备份目录存在
if [ ! -d "${BACKUP_DIR}" ]; then
    log "INFO" "备份目录不存在，自动创建：${BACKUP_DIR}"
    mkdir -p "${BACKUP_DIR}" || { log "ERROR" "创建备份目录失败"; exit 1; }
fi

# 校验 npm 环境（必须安装 Node.js）
if ! command -v npm &> /dev/null; then
    log "ERROR" "未找到 npm，请先安装 Node.js 环境"
    exit 1
fi

##############################################################################
# 2. 执行拉取脚本（更新最新代码）
##############################################################################
log "INFO" "开始拉取 main 分支最新代码..."
cd "${SOURCE_DIR}" || { log "ERROR" "进入源码目录失败"; exit 1; }

# 执行已有的拉取脚本（如果脚本内已包含cd源码目录，可去掉上面的cd）
if ! bash "${PUBLISH_SCRIPT}"; then
    log "ERROR" "拉取代码失败，请检查 git 仓库连接或分支权限"
    exit 1
fi
log "INFO" "代码拉取完成"

##############################################################################
# 3. 前端打包构建（明确使用 npm run build）
##############################################################################
log "INFO" "开始执行前端打包（使用 npm run build）..."

# 安装项目依赖（首次部署/依赖更新时必须执行，依赖不变可注释加速）
log "INFO" "安装项目依赖（npm install）..."
npm install --production --legacy-peer-deps 2>&1 | tee -a "${LOG_FILE}"
npm i

# 执行打包命令（固定为 npm run build）
log "INFO" "执行打包命令（npm run build）..."
npm run build 2>&1 | tee -a "${LOG_FILE}"

# 校验打包结果（确保打包目录存在且非空）
if [ ! -d "${BUILD_DIR}" ] || [ -z "$(ls -A "${BUILD_DIR}")" ]; then
    log "ERROR" "打包失败！打包目录 ${BUILD_DIR} 不存在或为空"
    exit 1
fi
log "INFO" "前端打包完成，打包目录：${BUILD_DIR}"

##############################################################################
# 4. 备份旧版本（按时间戳命名）
##############################################################################
log "INFO" "开始备份旧版本部署文件..."

# 如果部署目录有内容，才备份（首次部署无旧文件可跳过）
if [ -n "$(ls -A "${DEPLOY_DIR}")" ]; then
    # 使用 rsync 备份（保留目录结构，比 cp 更高效）
    rsync -a --delete "${DEPLOY_DIR}/" "${BACKUP_TARGET}/" 2>&1 | tee -a "${LOG_FILE}"
    if [ $? -ne 0 ]; then
        log "ERROR" "备份旧版本失败"
        exit 1
    fi
    log "INFO" "旧版本备份完成，备份路径：${BACKUP_TARGET}"
else
    log "WARN" "部署目录为空，无需备份"
fi

##############################################################################
# 5. 部署新版本（覆盖旧文件）
##############################################################################
log "INFO" "开始部署新版本..."

# 清空部署目录（避免旧文件残留）
rm -rf "${DEPLOY_DIR}"/* 2>&1 | tee -a "${LOG_FILE}"

# 复制新打包的文件到部署目录
cp -rf "${BUILD_DIR}/"* "${DEPLOY_DIR}/" 2>&1 | tee -a "${LOG_FILE}"

# 设置权限（核心修改）
log "INFO" "设置部署目录权限..."
chmod -R 755 "${DEPLOY_DIR}" 2>&1 | tee -a "${LOG_FILE}" || {
    log "ERROR" "权限设置失败，请手动执行: chmod -R 755 ${DEPLOY_DIR}"
    exit 1
}

##############################################################################
# 6. 清理旧备份（保留最近10个，可选，可注释关闭）
##############################################################################
log "INFO" "开始清理旧备份（保留最近10个）..."
cd "${BACKUP_DIR}" || { log "WARN" "进入备份目录失败，跳过清理"; exit 0; }
backup_count=$(ls -d tobacco_* 2>/dev/null | wc -l)
if [ "${backup_count}" -gt 10 ]; then
    # 删除最旧的 $((backup_count - 10)) 个备份
    ls -d tobacco_* 2>/dev/null | sort | head -n $((backup_count - 10)) | xargs rm -rf
    log "INFO" "清理完成，保留最新10个备份"
else
    log "INFO" "备份数量未超过10个，无需清理"
fi

log "INFO" "新版本部署完成！"
log "INFO" "部署目录：${DEPLOY_DIR}"
log "INFO" "备份目录：${BACKUP_TARGET}"
log "INFO" "部署日志：${LOG_FILE}"
