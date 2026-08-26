# 中烟国际集团网站 — 环境与部署指南

> 本文件包含生产/演示两套环境的全部凭据与部署方法。仓库为 **私有仓库**，仅供项目维护者与协作 AI 使用。换电脑/换 AI 工具时，拉取本仓库后直接读本文件即可完成部署，无需再向人确认。

---

## 一、仓库与分支策略

- **远程仓库**：`https://gitee.com/yang-shuangyi/zhongyanzuixinban.git`（Gitee 私有仓库）
- **push 凭据**：账号 `onewade` / 密码 `Shuangyi1988`
- **关键分支**：
  | 分支 | 用途 | 部署到 |
  |---|---|---|
  | `release` | 开发/演示分支，日常改动先合到这里 | 演示环境 |
  | `main` | 生产分支，由 `release` 合并而来 | 生产环境 |
  | `develop` / `master` | 历史分支，一般不动 | — |

- **核心规则**：演示环境拉 `release`，生产环境拉 `main`。所以从演示发布到生产，必须先把 `release` 合并到 `main` 并 push。

---

## 二、环境信息一览（含明文凭据）

| 项 | 生产环境 | 演示环境 |
|---|---|---|
| **访问地址** | https://www.cti-group.com.hk | http://180.76.235.116:5177/ |
| **服务器 IP** | 103.107.88.249 | 180.76.235.116 |
| **SSH 端口** | 22 | 22 |
| **SSH 账号** | sunhuijun | root |
| **SSH 密码** | Welcome1# | Shuangyi1988 |
| **源码目录** | /home/sunhuijun/sourcecode/tobacco | /home/demo/sourcecode/tobacco |
| **部署目录** | /usr/share/nginx/html/tobacco | /usr/share/nginx/html/tobacco |
| **备份目录** | /usr/share/nginx/html/backups | /usr/share/nginx/html/backups |
| **部署脚本目录** | /home/sunhuijun/tobacco/publish_script/ | /home/demo/tobacco/publish_script/ |
| **部署脚本** | full_deploy.sh + publish.sh | full_deploy.sh + publish.sh |
| **拉取分支** | main | release |
| **Nginx 配置** | /etc/nginx/nginx.conf + /etc/nginx/conf.d/default.conf | /etc/nginx/nginx.conf |
| **Nginx listen** | 80 + 443 ssl | 5177 |
| **SSL 证书** | /etc/nginx/conf.d/www.cti-group.com.hk.pem / .key | 无（HTTP） |
| **备份命名** | tobacco_\<时间戳\> | tobacco_demo_\<时间戳\> |
| **部署日志** | /home/sunhuijun/tobacco/publish_script/deploy_\<日期\>.log | /home/demo/tobacco/publish_script/deploy_\<日期\>.log |

### SSH 连接注意事项
- 本机若走 FlClash/代理，SSH 握手慢，**必须设置 60 秒以上超时**。paramiko 示例：`c.connect(host, 22, user, pwd, timeout=60, banner_timeout=60, auth_timeout=60)`。系统 `ssh` 命令不受影响。
- 生产 SSL 证书 `*.key` / `*.pem` 仅 root 可读，sunhuijun 账号读不到（正常，证书不入仓库）。

---

## 三、本目录（deploy/）结构

```
deploy/
├── README.md                      # 本文件
├── prod/                          # 生产环境脚本与配置（从服务器原样拉取）
│   ├── publish_script/
│   │   ├── full_deploy.sh         # 一键部署脚本：fetch→install→build→备份→替换
│   │   └── publish.sh             # 拉取脚本：git fetch + reset --hard main
│   └── nginx/
│       ├── nginx.conf             # Nginx 主配置
│       └── default.conf           # 站点配置（80+443 ssl，证书路径）
└── demo/                          # 演示环境脚本与配置（从服务器原样拉取）
    ├── publish_script/
    │   ├── full_deploy.sh         # 演示一键部署（备份名带 _demo_ 后缀）
    │   └── publish.sh             # 拉取脚本：git fetch + reset --hard release
    └── nginx/
        └── nginx.conf             # 演示 Nginx（listen 5177，含 project-tracker 反代）
```

> 服务器上的脚本路径是硬编码的（`/home/sunhuijun/...` 或 `/home/demo/...`）。本目录里的脚本**仅作版本化归档与参考**，实际部署时**直接在服务器上执行原路径脚本**，不要把本地脚本拷回服务器覆盖（避免路径/分支不一致）。

---

## 四、本地开发环境

- **技术栈**：Vue 3 + Vite + Element Plus + i18n（简/繁/英）
- **Node.js**：需安装（生产/演示均已装）
- **安装依赖**：`npm install --legacy-peer-deps`（必须带 `--legacy-peer-deps`）
- **本地开发**：`npm run dev`（Vite dev server）
- **打包**：`npm run build` → 产物输出到 `tobacco/` 目录
- **打包产物不入仓库**：`.gitignore` 已忽略 `tobacco/`

---

## 五、部署流程

### 方式 A：演示环境部署（拉 release）

**场景**：在 release 上改完代码，要先在演示环境验证。

1. 本地 push 代码到 Gitee 的 release 分支：
   ```bash
   git checkout release
   git push origin release
   ```
2. SSH 登录演示服务器并执行部署脚本：
   ```bash
   ssh root@180.76.235.116          # 密码 Shuangyi1988
   bash /home/demo/tobacco/publish_script/full_deploy.sh
   ```
3. 脚本自动完成：`git fetch+reset release → npm install → npm run build → 备份旧版本到 tobacco_demo_<时间戳> → 清空部署目录 → 拷贝新产物 → chmod 755 → 清理超过 10 个的旧备份`
4. 浏览器验证 http://180.76.235.116:5177/

### 方式 B：生产环境部署（拉 main）

**场景**：演示验证通过，发布到正式线上站点。

1. 本地把 release 合并到 main 并 push Gitee：
   ```bash
   git checkout main
   git pull origin main
   git merge release                 # 如有冲突，保留 release 内容
   git push origin main
   git checkout release              # 切回 release 继续 working
   ```
2. SSH 登录生产服务器并执行部署脚本：
   ```bash
   ssh sunhuijun@103.107.88.249     # 密码 Welcome1#
   bash /home/sunhuijun/tobacco/publish_script/full_deploy.sh
   ```
3. 脚本自动完成：`git fetch+reset main → npm install → npm run build → 备份旧版本到 tobacco_<时间戳> → 清空部署目录 → 拷贝新产物 → chmod 755 → 清理超过 10 个的旧备份`
4. 浏览器验证 https://www.cti-group.com.hk

> **生产是真实线上站点**，建议选择访问低峰时段部署。部署期间有极短的静态资源替换窗口，但无需停服。

---

## 六、回滚流程

部署脚本每次都会把旧版本备份到 `/usr/share/nginx/html/backups/`（生产 `tobacco_<时间戳>`，演示 `tobacco_demo_<时间戳>`）。回滚用备份替换当前版本：

**生产回滚**：
```bash
ssh sunhuijun@103.107.88.249
cd /usr/share/nginx/html
ls -lt backups/ | head                 # 选目标备份
rm -rf tobacco/*
cp -r backups/tobacco_<目标时间戳>/* tobacco/
chmod -R 755 tobacco
nginx -s reload                        # 如有必要
```

**演示回滚**：同上，账号 `root@180.76.235.116`，备份名 `tobacco_demo_<时间戳>`。

**Git 层面回滚**（生产源码）：
```bash
ssh sunhuijun@103.107.88.249
cd /home/sunhuijun/sourcecode/tobacco
git log --oneline -5                   # 找到回滚目标 commit
git reset --hard <旧commit>
bash /home/sunhuijun/tobacco/publish_script/full_deploy.sh
```

---

## 七、部署脚本说明

### full_deploy.sh（一键部署）
路径见上表。流程：
1. 前置校验（拉取脚本/源码目录/部署目录/npm 是否就绪）
2. 调用 `publish.sh` 拉取最新代码
3. `npm install` + `npm run build`
4. 校验打包目录 `tobacco/` 非空
5. `rsync -a --delete` 备份旧版本到 `backups/tobacco[_demo]_<时间戳>`
6. `rm -rf 部署目录/*` + `cp -rf 打包目录/* 部署目录/` + `chmod -R 755`
7. 清理超过 10 个的旧备份
8. 全程写日志到 `deploy_<日期>.log`

### publish.sh（拉取脚本）
- 生产：`cd /home/sunhuijun/sourcecode/tobacco` → `git fetch origin main` → `git reset --hard main` → `git clean -fd`
- 演示：`cd /home/demo/sourcecode/tobacco` → `git fetch origin release` → `git reset --hard release` → `git clean -fd`

---

## 八、Nginx 配置要点

### 生产（prod/nginx/）
- `nginx.conf`：主配置，`include /etc/nginx/conf.d/*.conf`，限制并发连接 5、限速 100k，隐藏版本号
- `default.conf`：`listen 80 + 443 ssl`，证书 `/etc/nginx/conf.d/www.cti-group.com.hk.pem/.key`，root `/usr/share/nginx/html/tobacco/`，`try_files $uri $uri/ /index.html`（SPA history 路由），静态资源缓存 1 年，HTML 禁缓存

### 演示（demo/nginx/）
- `nginx.conf`：`listen 5177`，root `/usr/share/nginx/html/tobacco`，含 `/project-tracker/` 反代到 `127.0.0.1:5178`（另一个子项目，部署在 `/opt/project-tracker/`，非本项目维护范围）

---

## 九、注意事项与常见问题

1. **不要在生产源码目录手动改文件**。所有改动必须经 Gitee → `full_deploy.sh` 拉取，保证可追溯、可回滚。
2. **生产部署前先把 release 合并到 main**。生产只认 main，直接改 release 不会上生产。
3. **`npm install` 必须带 `--legacy-peer-deps`**，否则依赖解析会失败。
4. **本机走 FlClash 代理时**，paramiko SSH 默认 30 秒超时会失败，需设 60 秒；系统 `ssh` 命令不受影响。
5. **`.gitignore` 已忽略** `tobacco/`（打包产物）、`.codex-temp/` `.codex-backups/` `.codex/`（AI 临时目录）、`node_modules`，提交前确认 `git status` 不含这些。
6. **每次改动需登记** `年度更新记录.md`（项目根目录），记录日期/类别/内容/commit hash/生产状态。
7. **新增新闻**参考 `docs/新增新闻标准流程.md`。
8. **SSL 证书续期**：证书在 `/etc/nginx/conf.d/www.cti-group.com.hk.pem/.key`，续期后 `nginx -s reload`。证书文件不入仓库。

---

## 十、快速验证清单（部署后）

- [ ] `curl -I https://www.cti-group.com.hk` 返回 200（生产）/ `curl -I http://180.76.235.116:5177/` 返回 200（演示）
- [ ] index.html 引用的 js/css hash 与本次 build 产物一致
- [ ] 首页 Tab 第一个焦点是"跳至内容"按钮，Enter 后进入右侧第一条新闻
- [ ] 切换简/繁/英三语正常
- [ ] 新闻列表/详情、集团概况、主营业务、联系我们、加入我们 各页面正常
- [ ] 浏览器控制台无新报错

---

## 十一、历史维护记录

每次代码改动与部署的详细记录见项目根目录的 [`年度更新记录.md`](../年度更新记录.md)。
